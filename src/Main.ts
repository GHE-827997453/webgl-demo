/// <reference path="./Util.ts" />
class WebGLDemo {
    public static draw(): void {
        const canvas = document.getElementById('webgl') as HTMLCanvasElement;
        canvas.width = 400;//window.innerWidth;
        canvas.height = 400;//window.innerHeight;

        const gl: WebGLRenderingContext = canvas.getContext('webgl');
        if (!gl) {
            alert('您的浏览器不支持webgl');
            return;
        }

        //前缀 a_ 表示变量类型 attribute
        const pos_Key = 'a_Position';
        const sinB_Key = 'u_SinB';
        const cosB_Key = 'u_CosB';
        //顶点着色器
        const vshader = `
            attribute vec4 ${pos_Key};
            uniform float ${sinB_Key};
            uniform float ${cosB_Key};
            void main() {
                gl_Position.x = ${pos_Key}.x * ${cosB_Key} - ${pos_Key}.y * ${sinB_Key};
                gl_Position.y = ${pos_Key}.x * ${sinB_Key} + ${pos_Key}.y * ${cosB_Key};
                gl_Position.z = 0.0;
                gl_Position.w = 1.0;
            }
        `;
        //片元着色器
        const color_Key = 'u_FragColor';
        const fshader = `
            precision mediump float;
            uniform vec4 ${color_Key};
            void main() {
                gl_FragColor = ${color_Key};
            }
        `;
        const program = Utils.i.initShader(gl, vshader, fshader);
        const a_Position = gl.getAttribLocation(program, pos_Key);
        const u_CosB = gl.getUniformLocation(program, cosB_Key);
        const u_SinB = gl.getUniformLocation(program, sinB_Key);
        const u_FragColor = gl.getUniformLocation(program, color_Key);

        if (a_Position < 0 || !u_FragColor) {
            return;
        }

        //使用缓冲区对象绘制点
        const vertex_Buffer = gl.createBuffer();
        if (!vertex_Buffer) {
            return;
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_Buffer);
        const bufData = new Float32Array([0.0, 0.8, -0.8, 0.0, 0.0, -0.8]);
        gl.bufferData(gl.ARRAY_BUFFER, bufData, gl.STATIC_DRAW);
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, true, 0, 0);
        gl.enableVertexAttribArray(a_Position);

        //旋转前的初始值
        gl.uniform1f(u_CosB, 1.0);
        gl.uniform1f(u_SinB, 1.0);

        //设置点的RGBA
        gl.uniform4f(u_FragColor, Math.random(), Math.random(), Math.random(), Math.random() * 0.5 + 0.5);

        //设置清除颜色
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        //点击进行绘图的旋转
        canvas.onclick = ev => {
            const angle = Math.floor(Math.random() * 360 + 1);
            console.log('旋转角度: ', angle);
            gl.uniform1f(u_CosB, parseFloat(Math.cos(Math.PI / 180 * angle).toFixed(2)));
            gl.uniform1f(u_SinB, parseFloat(Math.sin(Math.PI / 180 * angle).toFixed(2)));
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        }
    }
}
WebGLDemo.draw();
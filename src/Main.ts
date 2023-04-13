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
        const point_Key = 'a_Point';
        //顶点着色器
        const vshader = `
            attribute vec4 ${pos_Key};
            attribute float ${point_Key};
            void main() {
                gl_Position = ${pos_Key};
                gl_PointSize = ${point_Key};
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
        const a_Point = gl.getAttribLocation(program, point_Key);
        const u_FragColor = gl.getUniformLocation(program, color_Key);

        if (a_Position < 0 || a_Point < 0 || !u_FragColor) {
            return;
        }

        //使用缓冲区对象绘制点
        const vertex_Buffer = gl.createBuffer();
        if (!vertex_Buffer) {
            return;
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_Buffer);
        const bufData = new Float32Array([0.0, 0.8, -0.8, 0.0, 0.8, 0.0]);
        gl.bufferData(gl.ARRAY_BUFFER, bufData, gl.STATIC_DRAW);
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, true, 0, 0);
        gl.enableVertexAttribArray(a_Position);

        //设置点的RGBA
        gl.uniform4f(u_FragColor, Math.random(), Math.random(), Math.random(), Math.random() * 0.5 + 0.5);
        gl.vertexAttrib1f(a_Point, 20.0);
        
        //设置清除颜色
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.drawArrays(gl.POINTS, 0, 3);
    }
}
WebGLDemo.draw();

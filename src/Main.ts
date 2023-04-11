/// <reference path="./Util.ts" />
class WebGLDemo {
    public static draw(): void {
        const canvas = document.getElementById('webgl') as HTMLCanvasElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const gl: WebGLRenderingContext = canvas.getContext('webgl');
        if (!gl) {
            alert('您的浏览器不支持webgl');
            return;
        }

        //前缀 a_ 表示变量类型 attribute
        const posKey = 'a_Position';
        const pointKey = 'a_Point';
        //顶点着色器
        const vshader = `
            attribute vec4 ${posKey};
            attribute float ${pointKey};
            void main() {
                gl_Position = ${posKey};
                gl_PointSize = ${pointKey};
            }
        `;
        //片元着色器
        const fshader = `
            void main() {
                gl_FragColor = vec4(0.0, 1.0, 1.0, 0.5);
            }
        `;
        const program = Utils.i.initShader(gl, vshader, fshader);
        const a_Position = gl.getAttribLocation(program, posKey);
        const a_Point = gl.getAttribLocation(program, pointKey);

        if (a_Position < 0 || a_Point < 0) {
            console.warn('position or point not found');
            return;
        }
        gl.vertexAttrib3f(a_Position, 0.0, 0.5, 0.5);
        gl.vertexAttrib1f(a_Point, 50.0);

        //设置清除颜色
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.drawArrays(gl.POINTS, 0, 1);
    }
}
WebGLDemo.draw();

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

        //顶点着色器
        const vshader = `
            void main() {
                gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
                gl_PointSize = 100.0;
            }
        `;
        //片元着色器
        const fshader = `
            void main() {
                gl_FragColor = vec4(0.0, 1.0, 1.0, 0.5);
            }
        `;
        Utils.i.initShader(gl, vshader, fshader);
        //设置清除颜色
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.drawArrays(gl.POINTS, 0, 1);
    }
}
WebGLDemo.draw();

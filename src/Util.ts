class Utils {
    private static inst: Utils;
    public static get i(): Utils {
        if (!this.inst) {
            this.inst = new Utils();
        }
        return this.inst;
    }

    public initShader(gl: WebGLRenderingContext, vshader: string, fshader: string): WebGLProgram {
        const program = this.createProgram(gl, vshader, fshader);
        gl.useProgram(program);
        return program;
    }

    private createProgram(gl: WebGLRenderingContext, vshader: string, fshader: string): WebGLProgram {
        const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vshader);
        const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fshader);
    
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
    
        gl.linkProgram(program);
    
        const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        return program;
    }

    private loadShader(gl: WebGLRenderingContext, type: GLenum, source: string): WebGLShader {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        return shader;
    }
}
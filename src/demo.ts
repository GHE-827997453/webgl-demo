function main() {
    const canvas = document.getElementById('gl_canvas') as HTMLCanvasElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const webgl = canvas.getContext('webgl');
    if (!webgl) {
        alert('您的浏览器不支持webgl');
        return;
    }

    //create shader
    const vertexSha = createShader(webgl, webgl.VERTEX_SHADER, vertexSharder);
    const fragmentSha = createShader(webgl, webgl.FRAGMENT_SHADER, fragmentSharder);
    //create program
    const program = createProgram(vertexSha, fragmentSha, webgl);
    //create buffer
    const vertexBuffer = webgl.createBuffer();
    webgl.bindBuffer(webgl.ARRAY_BUFFER, vertexBuffer);
    const positons = [
        0, 0,
        0, 1.0,
        1.0, 0
    ]
    webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(positons), webgl.STATIC_DRAW);
    
    webgl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
    
    webgl.clearColor(0, 0, 0, 0);
    webgl.clear(webgl.COLOR_BUFFER_BIT);
    const a_position = webgl.getAttribLocation(program, 'a_position');
    webgl.enableVertexAttribArray(webgl.getAttribLocation(program, 'a_position'));
    webgl.vertexAttribPointer(a_position, 2, webgl.FLOAT, false, 0, 0);
    webgl.drawArrays(webgl.TRIANGLES, 0, 3);
}

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
    const sharder = gl.createShader(type);
    gl.shaderSource(sharder, source);
    gl.compileShader(sharder);
    const success = gl.getShaderParameter(sharder, gl.COMPILE_STATUS);
    if (success) {
        return sharder;
    } else {
        console.log(gl.getShaderInfoLog(sharder));
        gl.deleteShader(sharder);
    }
}

function createProgram(vertex: WebGLShader, fragment: WebGLShader, gl: WebGLRenderingContext) {
    const program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.useProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    } else {
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    }
}

const vertexSharder = `
    attribute vec4 a_position;

    void main() {
        gl_Position = a_position;
    }
`

const fragmentSharder = `
    precision mediump float;

    void main() {
        gl_FragColor = vec4(0, 0, 0, 1);
    }
`
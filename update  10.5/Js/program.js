function Program(gl, vertexShader, fragmentShader) {
    this.createShader = function (type, source){
    this.shader =  this.gl.createShader(type);
    this.gl.shaderSource(this.shader, source);
    this.gl.compileShader(this.shader);
    if ( this.gl.getShaderParameter(this.shader,  this.gl.COMPILE_STATUS)) {return this.shader;}
    this.gl.deleteShader(this.shader);}

    this.gl = gl;
    this.program =  this.gl.createProgram();
    this.gl.attachShader(this.program, this.createShader( this.gl.VERTEX_SHADER, vertexShader));
    this.gl.attachShader(this.program, this.createShader( this.gl.FRAGMENT_SHADER, fragmentShader));
    this.gl.linkProgram(this.program);
    // Sets the WebGL context to use current program
    this.useProgram = function () { this.gl.useProgram(this.program);}
    // Load up the given attributes and uniforms from the given values
    this.load = function (attributes, uniforms) { this.setAttributeLocations(attributes);this.setUniformLocations(uniforms);}
    // Set references to attributes onto the program instance
    this.setAttributeLocations = function (a) { a.forEach(a => {this[a] = this.gl.getAttribLocation(this.program,a);});}
    // Set references to uniforms onto the program instance
    this.setUniformLocations = function (u) { u.forEach(u => {this[u] = this.gl.getUniformLocation(this.program,u);});}
    // Get the uniform location from the program
    this.getUniform = function (uniformLocation) { return this.gl.getUniform(this.program, uniformLocation);}
   }

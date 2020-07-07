  buffer = function(target,size,usage=gl.STATIC_DRAW) {
  gl.bindBuffer(target,gl.createBuffer());
  gl.bufferData(target,size,usage);}

  enable = function(index, size) {// enable is use for atribute to use them
  gl.enableVertexAttribArray(index);//enable position
  gl.vertexAttribPointer(index, size, gl.FLOAT, false, 0, 0); }

function bind(object,texture=false) {
    object.vao = gl.createVertexArray();
    gl.bindVertexArray(object.vao);
    //IBO && VBO settings
    this.buffer(gl.ARRAY_BUFFER,new Float32Array(object.vertices))//VBO vetrices coord
    this.buffer(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(object.indices))//IBO index coord
    this.enable(program.Position,3);//get x,y,z Configure VAO instructions
    if (texture) {
      object.texture = texture;
      this.buffer(gl.ARRAY_BUFFER,new Float32Array(object.coord))//get texture coord
      this.enable(program.TexCoord,2);//get x,y Configure VAO instructions
    }
    //clean buffer
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    return object;
}

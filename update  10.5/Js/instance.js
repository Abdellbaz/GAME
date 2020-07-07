function Instance(geometry,texture,list) {//get geometry/texture/list from main.js

  this.object= {...bind(geometry,texture)};//get cube from geometry.js bind from bind.js
  this.matrixData = new Float32Array([...list]);//all object stored here
  numInstances=list.length/3;//number of  instance / 3 because  one object has x,y,z
  gl.bindVertexArray(this.object.vao);//bind Vertex array Object

  gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER,this.matrixData.byteLength,gl.STATIC_DRAW);
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.matrixData);
  gl.enableVertexAttribArray(program.Offset);//enable position
  gl.vertexAttribPointer(program.Offset, 3, gl.FLOAT, false, 0, 0);//take every time 3 value x,y,z

  gl.vertexAttribDivisor(program.Offset, 1);//every object wil draw 1 time witgh given x,y,z
  //clean everything
  gl.bindVertexArray(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
  gl.vertexAttribDivisor(program.Offset, 0);

 this.update =function(){
  gl.bindTexture(gl.TEXTURE_2D, this.object.texture);//bind texture
  gl.bindVertexArray(this.object.vao);//bind vertex array object
  gl.uniformMatrix4fv(program.Matrix, false, m4.ProjectionViewMatrix);//send matrix where to draw
  gl.drawElementsInstanced(gl.TRIANGLES, this.object.indices.length, gl.UNSIGNED_SHORT, 0, numInstances);//draws objects
  //clean everything
  gl.bindVertexArray(null);
  gl.bindTexture(gl.TEXTURE_2D, null);}
}

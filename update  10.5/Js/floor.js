
function Floor(texture,x=20,z=20,w=1) {
  this.object={
    vertices : [-x,0,z, x,0,z, x,0,-z, -x,0,-z],
    indices :[0,1,2,2,3,0,],
    coord:[w,w,0,w,0,0,w,0,]}
    this.object = bind(this.object,texture);//function from script bind.js

this.update=()=>{
  gl.bindTexture(gl.TEXTURE_2D, this.object.texture);//bind texture
  gl.bindVertexArray(this.object.vao);//bind vertex array object
  gl.uniformMatrix4fv(program.Matrix, false, m4.ProjectionViewMatrix);//send where to draw
  gl.drawElements( gl.TRIANGLES, this.object.indices.length, gl.UNSIGNED_SHORT, 0);//draw
}
}

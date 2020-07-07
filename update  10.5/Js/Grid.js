function Grid(xPos=1,yPos=1,zPos=1,xCell=1,yCell=1,zCell=1,cellSize=1) {//update en create in main.js
    transform = { position:{x:xPos,y:yPos,z:zPos},rotation:{x:0,y:0,z:0},scale:{x:1,y:1,z:1}}
    cell={x:xCell,y:yCell,z:zCell,size:cellSize}

   this.setup= function() {//calulate matrix based on transform
     this.Matrix = m4.translate(m4.identity, transform.position);//disabled rotate and scale because im not using it
     // this.Matrix = m4.rotateX(this.Matrix, transform.rotation.x);
     // this.Matrix = m4.rotateY(this.Matrix, transform.rotation.y);
     // this.Matrix = m4.rotateZ(this.Matrix, transform.rotation.z);
     // this.Matrix = m4.scale( this.Matrix, transform.scale);
     this.Matrix = m4.translate( this.Matrix, {x:-(cell.x)*cell.size/2,y:-0.1,z:-(cell.z)*cell.size/2});//set to orgin
   }
   this.update = function() {
     gl.bindVertexArray(this.object.vao);//bind vertex array object
     gl.uniformMatrix4fv(program.Matrix, false, m4.multiply(m4.ProjectionViewMatrix,this.Matrix));//send where to draw
     gl.drawElements( 1, this.object.indices.length, gl.UNSIGNED_SHORT, 0);//draw
     gl.bindVertexArray(null);//clean
   }

  this.createIndices = function() {// algoritme to creat indices
      indices=[];
      j=(cell.x+1)*2+(cell.y+1)*2;
      z=j*cell.z;
      n=cell.x*2;

      for (var i = 0; i < j; i+=2) {  indices.push(i,i+1);}//front
      for (var i = z; i < z+j; i+=2) {  indices.push(i,i+1);}//back
      for (var i = 0; i < j; i++) {indices.push(i,z+i);}//lines betweeen front/back
      for (var i = 1; i < cell.z; i++) {//planes
          indices.push(i*j,i*j+1 );//left
          indices.push(i*j,i*j+n );//down
          indices.push(i*j+n,i*j+n+1 );//right
          indices.push(i*j+j-1,i*j+1 );//up
        }
        return indices;
      }

  this.createVertices= function() {// createVertices
    vertices=[];
    for (var d = 0; d < cell.z+1; d++) {  z=d*cell.size;
    for (var i = 0,y=(cell.y)*cell.size; i < cell.x+1; i++) { vertices.push(i*cell.size,0,z,i*cell.size,y,z)}
    for (var i = 0,x=(cell.x)*cell.size; i < cell.y+1; i++) { vertices.push(0,i*cell.size,z,x,i*cell.size,z)}}
    return vertices;}

  this.object = {};
  this.object.vertices = this.createVertices();//return vertices
  this.object.indices = this.createIndices();//return indices
  this.object = bind(this.object);//function from script bind.js

  this.setup();//predefined matrix

}

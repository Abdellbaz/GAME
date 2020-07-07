function Player(geometry,texture) {//get texture and geometry from main

  this.PL= {...bind(geometry,texture)};//get cube from geometry.js bind from bind.js
  this.PL.scale ={x:1,y:2,z:1};//seting scale
  this.PL.position ={x:0,y:0,z:20}//setting position
  this.PL.CP=0;//set to  {first person = 0,third person =2.5}
  this.obstacles =[];//obstacles list
  this.update =function(){
    this.control();//check on input
    this.collision();//check on collision
    this.calulateViewMatrix(); //caluate camera based on transform
    this.calulateModelMatrix()//caluate player  based on camera
    gl.bindTexture(gl.TEXTURE_2D, this.PL.texture);//bind the texture to show
    gl.bindVertexArray(this.PL.vao);//bind vao for all setings
    gl.uniformMatrix4fv(program.Matrix, false, this.PL.matrix);//send result information where  to draw
    gl.drawElements(gl.TRIANGLES, this.PL.indices.length, gl.UNSIGNED_SHORT,0);//draw the object
    //clean everything
    gl.bindVertexArray(null);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  this.control = function() {
     this.PL.oldposition={...this.PL.position}//save previous position for collision
     //move to given direction
    if (Input['w']) { this.moveTo(-Math.sin(Mouse.y),-Math.cos(Mouse.y))}
    if (Input['s']) { this.moveTo( Math.sin(Mouse.y), Math.cos(Mouse.y))}
    if (Input['a']) { this.moveTo(-Math.cos(Mouse.y), Math.sin(Mouse.y))}
    if (Input['d']) { this.moveTo( Math.cos(Mouse.y),-Math.sin(Mouse.y))}
    if (Input['q']) { this.PL.position.y-= this.speed;}//fly up
    if (Input['e']) { this.PL.position.y+= this.speed*2;}//fly down
    if (Input[' '] ) { this.PL.position.y+=2.5*this.speed;}  //jump
    if(this.PL.position.y>0){this.PL.position.y-= this.speed;}//fall
    if (Input['1']) {this.PL.CP=0;}//change to first person
    if (Input['3']) { this.PL.CP=2.5;}//change to third person
    if (Input['+']){this.setScale(0,0.01,0);}//scale object up x,y,z
    if (Input['-']){this.setScale(0,-0.01,0)}//scale object down x,y,z

  }
  this.moveTo=function(x,z){//add speed to direction
    this.PL.position.x += x * this.speed;
    this.PL.position.z += z * this.speed;}

  this.addObstacleList = function (x){this.obstacles=[...x];}

  this.collision=  function () {
       this.PL.newposition={...this.PL.position}//save current position
       this.PL.position={...this.PL.oldposition}//set previous position

        //set current postion if (true) restore previous postion
      this.PL.position.x = this.PL.newposition.x;
      if (this.intersect()) {this.PL.position.x=this.PL.oldposition.x;}
      this.PL.position.z = this.PL.newposition.z;
      if (this.intersect()) {this.PL.position.z=this.PL.oldposition.z;}
      this.PL.position.y = this.PL.newposition.y;
      if (this.intersect()) {this.PL.position.y=this.PL.oldposition.y;}
  }

    this.intersect = function () {this.calculateBound();//get bounding box before checking
      for (var i = 0; i < this.obstacles.length; i+=3) {//check collsion every object x,y,z
      if ((this.PL.bound.min.x <= this.obstacles[i]+this.PL.size && this.PL.bound.max.x >= this.obstacles[i]-this.PL.size) &&
         (this.PL.bound.min.y <= this.obstacles[i+1]+0.95 && this.PL.bound.max.y >= this.obstacles[i+1]) &&
         (this.PL.bound.min.z <= this.obstacles[i+2]+this.PL.size && this.PL.bound.max.z >= this.obstacles[i+2]-this.PL.size)){return true;}}}


  this.calulateViewMatrix = function () {//projection * view { camera means everthing opposite (up:down,left:Right) vica versa
    this.matrix = m4.rotateX(  m4.ProjectionMatrix,-Mouse.x);
    this.matrix = m4.rotateY(  this.matrix,-Mouse.y);
    //setting put camera on object and at cp(change person to (first or third person))
    m4.ProjectionViewMatrix =  m4.translate(this.matrix,{x:-this.PL.position.x-this.PL.CP*Math.sin(Mouse.y)*2,y:-this.PL.position.y+0.11-this.PL.scale.y-this.PL.CP*1,z:-this.PL.position.z-this.PL.CP*Math.cos(Mouse.y)*2});
  }

  this.calulateModelMatrix = function() {//projectionView * model
    this.PL.matrix= m4.translate(m4.ProjectionViewMatrix, this.PL.position);
    this.PL.matrix = m4.scale( this.PL.matrix,this.PL.scale);
    this.PL.matrix = m4.rotateY(this.PL.matrix,Mouse.y);}

    //scale object by given value
   this.setScale = function(x,y,z) {this.PL.scale.x+=x;this.PL.scale.y+=y;this.PL.scale.z+=z;}

   this.calculateBound =function() {//caluate bounding box
     this.PL.bound ={
       min:{x:this.PL.position.x-this.PL.size*this.PL.scale.x,y:this.PL.position.y,z:this.PL.position.z-this.PL.size*this.PL.scale.z},
       max:{x:this.PL.position.x+this.PL.size*this.PL.scale.x,y:this.PL.position.y+this.PL.size*2*this.PL.scale.y,z:this.PL.position.z+this.PL.size*this.PL.scale.z},
     }
   }
}

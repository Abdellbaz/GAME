if (typeof window.orientation !== 'undefined') {//check if mobile and rune this whole script
  Control.mobile=true;// anable mouse so the mainjs wil be update
  //create Elements stick and rotatetouch wil get eventlisner
  const changeView = document.createElement("INPUT");  changeView.type='checkbox';
  const jump = document.createElement("jump");
  const stick = document.createElement("stick");
  const base = document.createElement("base");// just for ui
  const rotateTouch = document.createElement("rotateTouch");
// append to element show  (if window onlcik show wil be fullscreen) everything in show wil be seen
  show.appendChild(changeView);
  show.appendChild(rotateTouch);
  show.appendChild(jump);
  show.appendChild(base);
  show.appendChild(stick);
  // style joystick
  style='position:absolute;bottom:15%;left:10%;width:40px;height:40px;border:3px solid gray;;'
  stick.style.cssText=style +'border-radius:50%;background-color:lightgray;';
  base.style.cssText=style
  //style for changeView
  changeView.style.cssText='position:absolute;top:5%;left:5%;'
  // style for jump
  jump.style.cssText=style+'left:80%;background-color:lightgray;'
  //border range rotation style UI where you can touch to rotate
  rotateTouch.style.cssText='bottom:0;left:50%;position:absolute;width:'+ screen.width/2+'px;height:'+screen.height+'px;';
//_____________________________________________________________________________________________
//change camera view
changeView.onclick =()=>{Input['1']=false;Input['3']=false; (changeView.checked)?Input['3']=true:Input['1']=true;}
//_____________________________________________________________________________________________
//player jump
jump.ontouchstart =()=>{Input[' ']=true;}
jump.ontouchend =()=>{Input[' ']=false}

//_____________________________________________________________________________________________

stick.ontouchstart =(e)=>{ dragStart = {x:e.targetTouches[0].clientX,y:e.targetTouches[0].clientY}}//get x,y on first touch
stick.ontouchmove =(e)=>{
  e.preventDefault();
  if (e.targetTouches.length==1) {//only 1 finger allowt
    touchmove = e.targetTouches[0];
    xDiff = touchmove.clientX - dragStart.x;
    yDiff = touchmove.clientY - dragStart.y;
    angle = Math.atan2(yDiff, xDiff);
   	distance = Math.min(30, Math.hypot(xDiff, yDiff));
    xNew = distance * Math.cos(angle);
    yNew = distance * Math.sin(angle);
    playerMove(xNew,yNew);//enable input on direction
    stick.style.transform = `translate3d(${xNew}px, ${yNew}px, 0px)`;}}

stick.ontouchend =(e)=>{setFalse();stick.style.transform = `translate3d(0px, 0px, 0px)`;}//reset stick UI to center
setFalse = ()=>{Input.a=false;Input.d=false;Input.w=false;Input.s=false;}//set all input false
playerMove = (x,y)=> { setFalse();
  if (x<-15) {Input.a=true;}
  if (x>15) {Input.d=true;}
  if (y<-15) {Input.w=true;}
  if (y>15) {Input.s=true;}}
//_____________________________________________________________________________________________
  //reset border for rotateTouch
window.onorientationchange = function() {rotateTouch.style.cssText='bottom:0;left:50%;position:absolute;width:'+ screen.width/2+'px;height:'+screen.height+'px;';};
window.onclick=()=>{show.requestFullscreen();}//set to fullscreen
//_____________________________________________________________________________________________

rotateTouch.ontouchstart =(e)=>{previous = {x:e.targetTouches[0].clientX,y:e.targetTouches[0].clientY}}//get x,y on first touch
rotateTouch.ontouchmove =(e)=>{
  e.preventDefault();
  if (e.targetTouches.length==1) {//only 1 finger allowt
  const touchrotate =  e.targetTouches[0];//first elemt of target=(rotateTouch)
  // to create movement based on previous
  const movementX = touchrotate.clientX - previous.x;
  const movementY = touchrotate.clientY - previous.y;
  Mouse.y -= movementX * Math.PI / 180 * 0.4;//set movementx to mouse y in radian
  Mouse.x -= movementY * Math.PI / 180 * 0.4;//set movementy to mouse x in radian
  Mouse.x = Math.max( -  Math.PI / 2, Math.min(  Math.PI / 2, Mouse.x ) );
  previous.x=touchrotate.clientX;
  previous.y=touchrotate.clientY;}}
  //_____________________________________________________________________________________________

}

const Input = {
  'w':false,'a':false,'s':false,'d':false,'q':false,'e':false,
  '+':false,'-':false,'1':false,'3':false,' ':false};
const Control ={input:false,mouse:false}// show wether input/mouse is false or true
window.onkeydown = (e)=>{preventKey(e); checkInput(e.key.toLowerCase(),true)};//pressed input to true
window.onkeyup = (e)=>{preventKey(e); checkInput(e.key.toLowerCase(),false)};//released input to faslse
//prevent some keys to be pressed
const preventKey = (e)=>{ if(e.altKey||e.ctrlKey||e.shiftKey||e.key == 'Tab' || e.key=='Escape'){e.preventDefault();}}
//check if key exsit in Input if(true) set to value(true,false)
const checkInput = (e,bool)=> {if(e in Input){Input[e]=bool;Control.input=bool;}}


const Mouse = {x:0,y:0,z:0}
window.onmousemove = (e)=>{
  Control.mouse= (canvas === document.pointerLockElement) || (canvas ===  document.mozPointerLockElement);
  if (Control.mouse) {//check if mouse is locked
  const movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
  const movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;
  Mouse.y -= movementX * Math.PI / 180 * 0.2;//set movementx to mouse y in radian
  Mouse.x -= movementY * Math.PI / 180 * 0.2;//set movementy to mouse x in radian
  Mouse.x = Math.max( -  Math.PI / 2, Math.min(  Math.PI / 2, Mouse.x ) );}};//set max of x 180 degreas limit

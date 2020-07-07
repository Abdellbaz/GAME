

Time=0;
function update() {
  requestAnimationFrame(update);
      if (Control.mouse || Control.mobile) {
     if(performance.now() >  Time  ){
       gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
       player.speed=(performance.now()-Time)/225;//set speed base on performance
       scene.update()//update everything thats been add by scene
       Time = performance.now();
     }
    }
    else{Time = performance.now();}//reset time when mouse isnt locked
}




function setup() {
  reload();// grid xPos,yPos,zPos,xCell,yCell,zCell,cellSize
  grid3d = new Grid(0,0,0,50,40,50,1);// in grid.js
  scene= new Scene();//scene script inside setup.js
  player = new Player(cube,texture.cap)// in player.js
  objectList = createMap(texture);//create map from texture
  building =new Instance(cube2,texture.muur,objectList);// instance coordinate from createMap
  player.addObstacleList(objectList);// obstacles coordinate from createMap
  //add to scene
  scene.add(player);
  scene.add(grid3d);
  scene.add(building);
  scene.add(new Floor(texture.floor,30,30,60))

  update();

}
window.onload = setup;

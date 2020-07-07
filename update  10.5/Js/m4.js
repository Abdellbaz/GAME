var m4 = {// math matrix to transform object
  perspective: function(fov, aspect, near, far) {
    var f = Math.tan(Math.PI * 0.5 - 0.5 * fov);
    var rangeInv = 1.0 / (near - far);
    return [
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (near + far) * rangeInv, -1,
      0, 0, near * far * rangeInv * 2, 0,
    ];
  },
  identity :[ 1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1],// this represent default value similar to 1;1*1=1
  projection:(w,h,d) => {
    return [ 2/w,0,0,0, 0,-2/h,0,0,  0,0,2/d,0, -1,1,0,1];
  },
  ProjectionMatrix:[ 1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1],//this wil be update when reload or load the page
  ProjectionViewMatrix:[ 1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1],// this wil be changed when camera moves
  translate:(m, t) => {
    return m4.multiply(m, [ 1,0,0,0, 0,1,0,0, 0,0,1,0, t.x,t.y,t.z,1]);
  },
  rotateX:(m, radian) =>  {
    var c = Math.cos(radian),s = Math.sin(radian);
    return m4.multiply(m, [ 1,0,0,0, 0,c,s,0, 0,-s,c,0, 0,0,0,1]);
  },
  rotateY:(m, radian) =>  {
    var c = Math.cos(radian),s = Math.sin(radian);
    return m4.multiply(m, [ c,0,-s,0, 0,1,0,0, s,0,c,0, 0,0,0,1]);
  },
  rotateZ:(m, radian) =>  {
    var c = Math.cos(radian),s = Math.sin(radian);
    return m4.multiply(m, [ c,s,0,0, -s,c,0,0, 0,0,1,0, 0,0,0,1]);
  },
  scale:(m, s) => {
    return m4.multiply(m, [ s.x,0,0,0, 0,s.y,0,0, 0,0,s.z,0, 0,0,0,1]);
  },
  multiply:(mA, mB) => {//this can be modifed to matrix(2,3,4,5,6 etc )
    var mAB = [ 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];//matrix 4 by 4
    x=Math.sqrt(mAB.length);
    for(i = 0; i < mAB.length; i++) {
    col=x*Math.floor(i/x);// output 0 1 2
    row=i%x;//output 0 3 6
    for(z = 0; z < x; z++) { mAB[i] += mA[row+x*z]*mB[col+z];}}
    return mAB;// ( mA*mB=MAB | mB*mA=MBA ) (MAB!=MBA)
  },
};

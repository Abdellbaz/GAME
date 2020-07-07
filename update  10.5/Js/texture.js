    function Texture(src) {
      this.imgList=[];this.preload=0;

      this.createTexture = function() {
        for (name in this.imgList) {
          t=gl.createTexture();//create texture
          gl.bindTexture(gl.TEXTURE_2D, t);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,this.imgList[name]);//add img
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
          gl.generateMipmap(gl.TEXTURE_2D);this[name]=t;}}//this[name] = t (means texture add to this class)

      for (key in src) {
        img = new Image();
        img.src = 'Image/'+src[key]+'.png';//src[key] is img name
        this.imgList[key]=img;//object name of img (x = img name is x)
        img.onload =()=>{ this.preload++;// preload all img before calling createTexture
          if (this.preload==Object.keys(src).length){this.createTexture();}}}

}
texture=new Texture({brick:'brick',muur:'muur',wall:'wall',floor:'floor',ribbon:'nop',cap:'nop2',box:'box',blackWhite:'bw',blackWhite2:'bw2',window:'window'});//pre laod img

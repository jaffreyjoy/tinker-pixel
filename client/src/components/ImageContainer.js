import '../styles/ImageContainer.css'
import { TbUpload } from "react-icons/tb";
import React, { useState, useEffect } from 'react';


function ImageContainer() {
  // const [newsArticles, set_newsArticles] = useState([]);

  var canvas;
  var ctx;
  var img;

  useEffect(() => {
    canvas = document.getElementById("c");
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    canvas.setAttribute('width', `${0.5*vw}`);
    canvas.setAttribute('height', `${0.6*vh}`);
    ctx = canvas.getContext('2d');
    img = new Image();
    // var aspectRatio = this.width/this.height;
    img.addEventListener('load', function() {
      ctx.imageSmoothingQuality = "high";
      console.log("image load");
      console.log(ctx);
      console.log(img);
      console.log(this.width, this.height);
      console.log(ctx.canvas.clientWidth, ctx.canvas.clientHeight);
      console.log(canvas.width, canvas.height);
      var scalingFactor;
      if( (this.width-ctx.canvas.clientWidth) > (this.height-ctx.canvas.clientHeight) )
      scalingFactor = ctx.canvas.clientWidth/this.width;
      else
        scalingFactor = ctx.canvas.clientHeight/this.height;
      console.log((this.width-ctx.canvas.clientWidth) > (this.height-ctx.canvas.clientHeight));
      console.log(scalingFactor);
      var imgWidth  = scalingFactor*this.width;
      var imgHeight = scalingFactor*this.height;
      console.log(imgWidth, imgHeight);
      ctx.filter = 'none';
      var xOffset = (ctx.canvas.clientWidth-imgWidth)/2;
      var yOffset = (ctx.canvas.clientHeight-imgHeight)/2;
      ctx.drawImage(img, xOffset, yOffset, imgWidth, imgHeight);
      window.URL.revokeObjectURL(this.src);
    }, false);
  }, []);

  function uploadButtonClick(){
    document.getElementById('getFile').click();
  }

  function uploadImage(e){
    var imageFile = e.target.files[0];
    console.log(imageFile);
    if (imageFile) {
      img.src = window.URL.createObjectURL(imageFile);
    }
  }

  return(
      <div className="ImageContainer">
        <div className="imageCanvasCont"> <canvas id="c"></canvas> </div>
        <div className="uploadButtonCont">
          <button className="uploadButton" onClick={uploadButtonClick}><TbUpload/> Upload</button>
          <input id="getFile" type="file" style={{display:"none"}} onChange={uploadImage} accept="image/png, image/jpeg, image/jpg"/>
        </div>
      </div>
    );
}

export default ImageContainer;

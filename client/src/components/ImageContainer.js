import '../styles/ImageContainer.css'
import { TbUpload } from "react-icons/tb";
import React, { useEffect } from 'react';
// import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { setDims } from '../sharedObjects/dimsSlice';

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

function ImageContainer() {
  // const [newsArticles, set_newsArticles] = useState([]);
  const dispatch = useDispatch();

  var canvas;
  var ctx;
  var img;

  useEffect(() => {
    canvas = document.getElementById("c");
    canvas.setAttribute('width', `${0.5*vw}`);
    canvas.setAttribute('height', `${0.6*vh}`);
    ctx = canvas.getContext('2d');
    // set state variable of img dims to canvas dims
    dispatch(setDims({w: ctx.canvas.clientWidth, h: ctx.canvas.clientHeight}));
    img = new Image();
    // var aspectRatio = this.width/this.height;
    img.addEventListener('load', function() {
      ctx.imageSmoothingQuality = "high";
      console.log("image load");
      var scalingFactor;
      if( (this.width-ctx.canvas.clientWidth) > (this.height-ctx.canvas.clientHeight) )
      scalingFactor = ctx.canvas.clientWidth/this.width;
      else
      scalingFactor = ctx.canvas.clientHeight/this.height;
      console.log((this.width-ctx.canvas.clientWidth) > (this.height-ctx.canvas.clientHeight));
      console.log(scalingFactor);
      var imgWidth  = Math.floor(scalingFactor*this.width);
      var imgHeight = Math.floor(scalingFactor*this.height);
      // update state variable of img dims to actual img dims
      dispatch(setDims({w: imgWidth, h: imgHeight}));
      console.log(imgWidth, imgHeight);
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

import '../styles/ImageContainer.css'
import { TbUpload, TbDownload } from "react-icons/tb";
import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setDims } from '../sharedObjects/dimsSlice';
// import { setCanvasContext } from '../sharedObjects/canvasContextSlice';
import { setImg } from '../sharedObjects/imgSlice';

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

function ImageContainer() {
  const [uploadDownloadToggle, set_uploadDownloadToggle] = useState(true);
  const [canvasState, set_canvasState] = useState({});
  const dispatch = useDispatch();

  var canvas;
  var ctx;
  var img;

  useEffect(() => {
    canvas = document.getElementById("c");
    canvas.setAttribute('width', `${0.5*vw}`);
    canvas.setAttribute('height', `${0.6*vh}`);
    ctx = canvas.getContext('2d');
    // dispatch(setCanvasContext({canvasCtx: ctx}));
    // dispatch(setCanvasContext({canvasEl: canvas, canvasCtx: ctx}));
    // set state variable of img dims to canvas dims
    dispatch(setDims({w: ctx.canvas.clientWidth, h: ctx.canvas.clientHeight}));
    img = new Image();
    // var aspectRatio = this.width/this.height;
    img.addEventListener('load', function() {
      console.log("image load");
      // dispatch(setImg(img));
      ctx.imageSmoothingQuality = "high";

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
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, xOffset, yOffset, imgWidth, imgHeight);
      set_uploadDownloadToggle(false);
      set_canvasState(canvas);
      // window.URL.revokeObjectURL(this.src);
    }, false);
  }, []);

  function uploadButtonClick(){
    document.getElementById('getFile').click();
  }

  function downloadButtonClick(){
    var download = document.createElement('a');
    download.href = canvasState.toDataURL();
    download.download = 'img.png';
    download.click();
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
        {(uploadDownloadToggle)?
        <div className="uploadButtonCont">
          <button className="uploadButton" onClick={uploadButtonClick}><TbUpload/> Upload</button>
          <input id="getFile" type="file" style={{display:"none"}} onChange={uploadImage} accept="image/png, image/jpeg, image/jpg"/>
        </div>
        :
        <div className="uploadButtonCont">
          <button className="uploadButton" onClick={downloadButtonClick}><TbDownload/> Download</button>
        </div>}
      </div>
    );
}

export default ImageContainer;

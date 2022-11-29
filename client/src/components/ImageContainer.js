import '../styles/ImageContainer.css'
import { TbUpload, TbDownload } from "react-icons/tb";
import { toolsMetaData } from '../assests/toolsMeta';
import React, { useState, useEffect } from 'react';

import store  from '../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { setDims } from '../sharedObjects/dimsSlice';
// import { setCanvasContext } from '../sharedObjects/canvasContextSlice';
import { setImg } from '../sharedObjects/imgSlice';
import { selectImg } from '../sharedObjects/imgSlice';
import { selectFilterProps } from '../sharedObjects/filterPropsSlice';
// import { setFilterProps } from '../sharedObjects/filterPropsSlice';

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

function ImageContainer() {
  const [uploadDownloadToggle, set_uploadDownloadToggle] = useState(true);
  const [canvasState, set_canvasState] = useState({});
  const [srcImg, setSrcImg] = useState({});
  const [srcImgWidth, setSrcImgWidth] = useState(0);
  const [srcImgHeight, setSrcImgHeight] = useState(0);
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
      setSrcImg(img);
      setSrcImgWidth(this.width);
      setSrcImgHeight(this.height);
      console.log("image load");
      ctx.imageSmoothingQuality = "high";

      var hscalingFactor;
      // if( Math.abs(this.width-ctx.canvas.clientWidth) > Math.abs(this.height-ctx.canvas.clientHeight) )
      // scalingFactor = ctx.canvas.clientWidth/this.width;
      // else
      hscalingFactor = ctx.canvas.clientHeight/this.height;

      // console.log((this.width-canvas.clientWidth) > (this.height-ctx.canvas.clientHeight));
      console.log(ctx.canvas.clientWidth, ctx.canvas.clientHeight);
      console.log(canvas.width, canvas.height);
      console.log(hscalingFactor);
      var imgWidth  = Math.floor(hscalingFactor*this.width);
      var imgHeight = Math.floor(hscalingFactor*this.height);

      if(imgWidth>ctx.canvas.clientWidth){
        var wscalingFactor = ctx.canvas.clientWidth/this.width;

        imgWidth  = Math.floor(wscalingFactor*this.width);
        imgHeight = Math.floor(wscalingFactor*this.height);

        console.log(wscalingFactor);
      }

      // update state variable of img dims to actual img dims
      dispatch(setDims({w: imgWidth, h: imgHeight}));
      console.log(imgWidth, imgHeight);

      var xOffset = (ctx.canvas.clientWidth-imgWidth)/2;
      var yOffset = (ctx.canvas.clientHeight-imgHeight)/2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, xOffset, yOffset, imgWidth, imgHeight);
      set_uploadDownloadToggle(false);
      set_canvasState(canvas);


      var gcanvas = document.createElement('canvas');
      gcanvas.id = "g";
      var gimg = srcImg;
      var gctx = gcanvas.getContext('2d');
      gctx.imageSmoothingQuality = "high";
      gcanvas.setAttribute('width', `${srcImgWidth}px`);
      gcanvas.setAttribute('height', `${srcImgHeight}px`);
      console.log( srcImgWidth, srcImgHeight);
      console.log(gcanvas.width, gcanvas.height);
      // gctx.clearRect(0, 0, gcanvas.width, gcanvas.height);
      gctx.drawImage(gimg, 0, 0, srcImgWidth, srcImgHeight);


      console.log(store.getState());
      // window.URL.revokeObjectURL(this.src);
    }, false);
  }, []);

  function uploadButtonClick(){
    document.getElementById('getFile').click();
  }

  function createFilterString(){
    // const filters = useSelector(selectFilterProps);
    const filters = store.getState().filterProps.value;
    var filterString = "";
    // console.log(toolsMetaData);
    for (const [key, value] of Object.entries(toolsMetaData)) {
      filterString += `${key}(${value.default}${value.unit}) `
    }
    return filterString.trimEnd();
  }

  function prepareImageForServerOrDownload(){
    return document.getElementById("g").toDataURL("image/png");
  }

  function downloadButtonClick(){
    var download = document.createElement('a');
    // download.href = canvasState.toDataURL();
    download.href = prepareImageForServerOrDownload();
    download.download = 'img.png';
    download.click();
  }

  function uploadImage(e){
    var imageFile = e.target.files[0];
    console.log(imageFile);
    if (imageFile) {
      img.src = window.URL.createObjectURL(imageFile);
      dispatch(setImg({srcUrl: img.src}));
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

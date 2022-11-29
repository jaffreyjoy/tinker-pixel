import '../styles/Slider.css'
import React, { useState, useEffect } from 'react';
import store  from '../app/store';
// import { useSelector } from 'react-redux';
import { toolsMetaData } from '../assests/toolsMeta';
import { setTools } from '../sharedObjects/toolsSlice';
import { setFilterProps } from '../sharedObjects/filterPropsSlice';

function Slider(props) {
  // const dims = useSelector(selectDims);
  // console.log(dims);

  // const [sliderVal, setSliderVal] = useState(`toolsMetaData[props.toolName].default`);
  // const [sliderMinVal, setSliderMinVal] = useState("0");
  // const [sliderMaxVal, setSliderMaxVal] = useState("200");
  // const [sliderDefaultVal, setSliderDefaultVal] = useState("100");


  function createFilterString(filtersObject){
    var filterString = "";
    console.log('filtersObject', filtersObject);
    for (const [key, value] of Object.entries(filtersObject)) {
      filterString += `${key}(${value}${toolsMetaData[key].unit}) `
    }
    return filterString.trimEnd();
  }

  function handleSliderChange(e){
    console.log("----------------", props.toolName, ': ', e.target.value, "----------------");
    // setSliderVal(e.target.value);
    store.dispatch(setTools({ activeTool: props.toolName, toolValue: e.target.value}));
    // var newFilterProps = {...store.getState().filterProps.value};
    var newFilterProps = JSON.parse(JSON.stringify(store.getState().filterProps.value));
    newFilterProps[props.toolName] = e.target.value;
    store.dispatch(setFilterProps(newFilterProps));

    // get original image as url
    var origImgAsUrl = document.getElementById("g").toDataURL("image/png");

    var imgx = new Image();
    imgx.filterString = createFilterString(newFilterProps);
    // var aspectRatio = this.width/this.height;
    imgx.addEventListener('load', function() {
      var mainCanvas = document.getElementById("c");
      var mainCtx = mainCanvas.getContext('2d');
      console.log("image load");
      mainCtx.imageSmoothingQuality = "high";

      var hscalingFactor;
      hscalingFactor = mainCtx.canvas.clientHeight/this.height;

      console.log(mainCtx.canvas.clientWidth, mainCtx.canvas.clientHeight);
      console.log(mainCanvas.width, mainCanvas.height);
      console.log(hscalingFactor);

      var imgWidth  = Math.floor(hscalingFactor*this.width);
      var imgHeight = Math.floor(hscalingFactor*this.height);

      if(imgWidth>mainCtx.canvas.clientWidth){
        var wscalingFactor = mainCtx.canvas.clientWidth/this.width;

        imgWidth  = Math.floor(wscalingFactor*this.width);
        imgHeight = Math.floor(wscalingFactor*this.height);

        console.log(wscalingFactor);
      }

      var xOffset = (mainCtx.canvas.clientWidth-imgWidth)/2;
      var yOffset = (mainCtx.canvas.clientHeight-imgHeight)/2;
      mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      mainCtx.filter = this.filterString;
      mainCtx.drawImage(this, xOffset, yOffset, imgWidth, imgHeight);


      var gcanvasx = document.getElementById("g");
      var gctx = gcanvasx.getContext('2d');
      gctx.imageSmoothingQuality = "high";
      gcanvasx.width=this.width;
      gcanvasx.height=this.height;
      console.log(this.width, this.height);
      console.log(gcanvasx.width, gcanvasx.height);
      gctx.clearRect(0, 0, gcanvasx.width, gcanvasx.height);
      console.log(this.filterString);
      gctx.filter = this.filterString;
      gctx.drawImage(this, 0, 0, this.width, this.height);
      console.log(document.getElementById("g"));
      console.log(document.getElementById("c"));


      // window.URL.revokeObjectURL(this.src);
    }, false);

    imgx.src = origImgAsUrl;

  }

  // useEffect(() => {
  //   setSliderVal(document.getElementById("rangeId").value==toolsMetaData[props.toolName].default?
  //           `${toolsMetaData[props.toolName].default}`:document.getElementById("rangeId").value);
  // },[]);

  // setSliderMinVal(`${toolsMetaData[props.toolName].min}`);
  // setSliderMaxVal(`${toolsMetaData[props.toolName].max}`);
  // setSliderDefaultVal(`${toolsMetaData[props.toolName].default}`);
  console.log('toolName props: ', props.toolName);
  console.log('toolLabel props: ', props.toolLabel);
  console.log(props.toolName, ':: min: '
  , `${toolsMetaData[props.toolName].min}`
  , 'max: ', `${toolsMetaData[props.toolName].max}`
  ,'default: ',`${toolsMetaData[props.toolName].default}`);

  return (
    <div className="Slider">
      <div className="titleContainer"><span>{props.toolLabel} Value:</span></div>
      <div
        className="sliderContainer"
        key={`${props.toolName}${store.getState().filterProps.value[props.toolName]}`}
      >
        <input type="range" list="labelList" className="rangeSlider" id="rangeId"
          min={`${toolsMetaData[props.toolName].min}`}
          max={`${toolsMetaData[props.toolName].max}`}
          defaultValue={
              (store.getState().filterProps.value[props.toolName]==toolsMetaData[props.toolName].default)
              ?`${toolsMetaData[props.toolName].default}`
              :`${store.getState().filterProps.value[props.toolName]}`
          }
          // value={sliderVal}
          onChange={handleSliderChange}
        />
      </div>
      {/* <div className="sliderLabelsContainer">
        <div>
          <datalist id="labelList">
            <option value="0" label={props.minVal}></option>
            <option value="50" label={props.maxVal/2}></option>
            <option value="100" label={props.maxVal}></option>
          </datalist>
        </div>
      </div> */}
    </div>
  );
}

Slider.defaultProps = {
  toolLabel: "Brightness"
  , toolName: "brightness"
}

export default Slider;

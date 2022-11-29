import '../styles/Slider.css'
import React, { useState, useEffect } from 'react';
import store  from '../app/store';
// import { useSelector } from 'react-redux';
import { toolsMetaData } from '../assests/toolsMeta';
import { setTools } from '../sharedObjects/toolsSlice';

function Slider(props) {
  // const dims = useSelector(selectDims);
  // console.log(dims);

  // const [sliderVal, setSliderVal] = useState(`toolsMetaData[props.toolName].default`);
  // const [sliderMinVal, setSliderMinVal] = useState("0");
  // const [sliderMaxVal, setSliderMaxVal] = useState("200");
  // const [sliderDefaultVal, setSliderDefaultVal] = useState("100");

  function handleSliderChange(e){
    console.log("----------------",props.toolName, ': ', e.target.value,"----------------");
    // setSliderVal(e.target.value);
    store.dispatch(setTools({ activeTool: props.toolName, toolValue: e.target.value}));
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
  console.log(props.toolName, ':: min: ', `${toolsMetaData[props.toolName].min}`, 'max: ', `${toolsMetaData[props.toolName].max}`,'default: ',`${toolsMetaData[props.toolName].default}`);

  return (
    <div className="Slider">
      <div className="titleContainer"><span>{props.toolLabel} Value:</span></div>
      <div className="sliderContainer" key={`${toolsMetaData[props.toolName].default}`}>
        <input type="range" list="labelList" className="rangeSlider" id="rangeId"
          min={`${toolsMetaData[props.toolName].min}`}
          max={`${toolsMetaData[props.toolName].max}`}
          defaultValue={`${toolsMetaData[props.toolName].default}`}
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

import '../styles/ToolExpand.css';
import ImageDetails from './ImageDetails';
import Slider from './Slider';
import store  from '../app/store';
import { toolsMetaData } from '../assests/toolsMeta';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTools } from '../sharedObjects/toolsSlice';

function ToolExpand() {

  // const [activeTool, setActiveTool] = useState("brightness");
  // const [activeToolLabel, setActiveToolLabel] = useState("Brightness");
  // setActiveTool(useSelector(selectTools).activeTool);
  // setActiveToolLabel(toolsMetaData[useSelector(selectTools).activeTool].label);

  // useEffect(() => {
  //   console.log('active tool: ', store.getState().tools.value.activeTool);
    // setActiveTool(useSelector(selectTools).activeTool);
    // setActiveTool(store.getState().tools.value.activeTool);
    // setActiveToolLabel(toolsMetaData[activeTool].label);
    // setActiveToolLabel(toolsMetaData[useSelector(selectTools).activeTool].label);
  // },[]);

  console.log('ToolExpand: active tool::', useSelector(selectTools).activeTool);

  return (
    <div className="ToolExpand">
      <ImageDetails/>
      <Slider toolLabel={toolsMetaData[useSelector(selectTools).activeTool].label} toolName={useSelector(selectTools).activeTool}/>
      {/* <Slider toolLabel={activeToolLabel} toolName={activeTool} minVal="0" maxVal="100" defaultVal="5"/> */}
    </div>
  );
}

export default ToolExpand;

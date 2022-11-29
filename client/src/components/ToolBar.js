import { BiCrop } from "react-icons/bi";
import { BsImage } from "react-icons/bs";
import { GiEyedropper } from "react-icons/gi";
import { IoMdContrast } from "react-icons/io";
import { RiContrast2Line } from "react-icons/ri";
import { TbBrightnessUp, Tb3DRotate } from "react-icons/tb";
import { CgEditContrast, CgDropInvert, CgDropOpacity } from "react-icons/cg";
import { MdBlurOn } from "react-icons/md";
import Tool from './Tool'
import { toolsMetaData } from '../assests/toolsMeta';
import store  from '../app/store';
import { setTools } from '../sharedObjects/toolsSlice';
import '../styles/ToolBar.css'

// import { useSelector } from 'react-redux';
// import { selectCanvasContext } from '../sharedObjects/canvasContextSlice';


function ToolBar() {
  // const canvasContext = useSelector(selectCanvasContext);

  async function serverToolButtonClick(e){
    console.log("cropButtonClick");
    var base64img = document.getElementById("g").toDataURL("image/png").replace('data:image/png;base64,','');
    // let formData = new FormData();
    // formData.append('image', base64img);

    let res = await fetch("http://localhost:8000/upload/lol", {
      mode: 'cors',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image: base64img}),
    });
    let resjson = await res.json();
    console.log(resjson);
  }

  async function localToolButtonClick(e){
    console.log('clicked: ', e.target.id);
    store.dispatch(setTools({ activeTool: e.target.id, toolValue: toolsMetaData[e.target.id].default }));
  }

  return (
    <div className="ToolBar">
      {/* <Tool icon={<BiCrop/>} label={"Crop"} onClickHandler={cropButtonClick}/> */}
      <Tool icon={<TbBrightnessUp/>} label={"Brightness"} toolName="brightness" onClickHandler={localToolButtonClick}/>
      <Tool icon={<RiContrast2Line/>} label={"Contrast"} toolName="contrast" onClickHandler={localToolButtonClick}/>
      <Tool icon={<CgDropOpacity/>} label={"Opacity"} toolName="opacity" onClickHandler={localToolButtonClick}/>
      <Tool icon={<IoMdContrast/>} label={"Grayscale"} toolName="grayscale" onClickHandler={localToolButtonClick}/>
      <Tool icon={<MdBlurOn/>} label={"Blur"} toolName="blur" onClickHandler={localToolButtonClick}/>
      <Tool icon={<CgDropInvert/>} label={"Invert"} toolName="invert" onClickHandler={localToolButtonClick}/>
      <Tool icon={<Tb3DRotate/>} label={"Hue Rotate"} toolName="hue-rotate" onClickHandler={localToolButtonClick}/>
      <Tool icon={<GiEyedropper/>} label={"Saturation"} toolName="saturate" onClickHandler={localToolButtonClick}/>
      <Tool icon={<BsImage/>} label={"Sepia"} toolName="sepia" onClickHandler={localToolButtonClick}/>
    </div>
  );
}

export default ToolBar;

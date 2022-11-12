import { BiCrop } from "react-icons/bi";
import { TbBrightnessUp } from "react-icons/tb";
import { CgEditContrast } from "react-icons/cg";
import { MdBlurOn } from "react-icons/md";
import Tool from './Tool'
import '../styles/ToolBar.css'

import { useSelector } from 'react-redux';
import { selectCanvasContext } from '../sharedObjects/canvasContextSlice';


function ToolBar() {
  const canvasContext = useSelector(selectCanvasContext);

  async function cropButtonClick(){
    console.log("cropButtonClick");
    var base64img = canvasContext.canvas.toDataURL("image/png").replace('data:image/.+;base64,','');
    let formData = new FormData();
    formData.append('image', base64img);

    await fetch('http://localhost:/8000/upload/lol', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
  }

  return (
    <div className="ToolBar">
      <Tool icon={<BiCrop/>} name={"Crop"} onClickHandler={cropButtonClick}/>
      <Tool icon={<TbBrightnessUp/>} name={"Brightness"} onClickHandler={cropButtonClick}/>
      <Tool icon={<CgEditContrast/>} name={"Contrast"} onClickHandler={cropButtonClick}/>
      <Tool icon={<MdBlurOn/>} name={"Blur"} onClickHandler={cropButtonClick}/>
    </div>
  );
}

export default ToolBar;

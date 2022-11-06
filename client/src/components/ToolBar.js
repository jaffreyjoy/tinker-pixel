import { BiCrop } from "react-icons/bi";
import { TbBrightnessUp } from "react-icons/tb";
import { CgEditContrast } from "react-icons/cg";
import { MdBlurOn } from "react-icons/md";
import Tool from './Tool'
import '../styles/ToolBar.css'

function cropButtonClick(){
  console.log("Crop clicked");
}

function ToolBar() {
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

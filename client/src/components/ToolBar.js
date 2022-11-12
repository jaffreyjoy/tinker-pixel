import { BiCrop } from "react-icons/bi";
import { TbBrightnessUp } from "react-icons/tb";
import { CgEditContrast } from "react-icons/cg";
import { MdBlurOn } from "react-icons/md";
import Tool from './Tool'
import '../styles/ToolBar.css'

// import { useSelector } from 'react-redux';
// import { selectCanvasContext } from '../sharedObjects/canvasContextSlice';


function ToolBar() {
  // const canvasContext = useSelector(selectCanvasContext);

  async function cropButtonClick(){
    console.log("cropButtonClick");
    var base64img = document.getElementById("c").toDataURL("image/png").replace('data:image/png;base64,','');
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

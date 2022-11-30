import { AiOutlineSelect } from "react-icons/ai";
import { BiCrop } from "react-icons/bi";
import { ImPencil2 } from "react-icons/im";
import { SiGoogleearth } from "react-icons/si";
import { BsImage, BsPencil } from "react-icons/bs";
import { FaPaintRoller, FaHandSparkles } from "react-icons/fa";
import { GiEyedropper, GiPencilBrush } from "react-icons/gi";
import { IoMdContrast} from "react-icons/io";
import { IoColorPalette, IoGlassesOutline } from "react-icons/io5";
import { RiMickeyLine, RiContrast2Line } from "react-icons/ri";
import { TbBrightnessUp, Tb3DRotate } from "react-icons/tb";
import { CgEditContrast, CgDropInvert, CgDropOpacity } from "react-icons/cg";
import { MdBlurOn, MdBlurLinear } from "react-icons/md";
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
    var base64img = (e.target.id=="spec" || e.target.id=="oilpaint" || e.target.id=="blurredbeauty" || e.target.id=="cartoon" || e.target.id=="colorsoflife")
                    ?document.getElementById("origImgStoreCanvas").toDataURL("image/jpeg").replace('data:image/jpeg;base64,','')
                    :document.getElementById("origImgStoreCanvas").toDataURL("image/png").replace('data:image/png;base64,','');
    // var base64img = (e.target.id=="spec" || e.target.id=="oilpaint" || e.target.id=="blurredbeauty" || e.target.id=="cartoon" || e.target.id=="colorsoflife")
    //                 ?document.getElementById("g").toDataURL("image/jpeg").replace('data:image/jpeg;base64,','')
    //                 :document.getElementById("g").toDataURL("image/png").replace('data:image/png;base64,','');
    // let formData = new FormData();
    // formData.append('image', base64img);

    let res = await fetch(`http://localhost:8000/upload/${e.target.id}`, {
      mode: 'cors',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image: base64img}),
    });
    let resjson = await res.json();
    console.log(resjson);

    // get response image url
    var origImgAsUrl = 'data:image/png;base64,' + resjson.img;

    console.log(origImgAsUrl.substring(0, 100));

    if(origImgAsUrl){
      console.log("response seems good");
      var imgx = new Image();
      // var aspectRatio = this.width/this.height;
      imgx.addEventListener('load', function() {
        console.log("image load");
        var mainCanvas = document.getElementById("c");
        var mainCtx = mainCanvas.getContext('2d');
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
        mainCtx.drawImage(this, xOffset, yOffset, imgWidth, imgHeight);



        var gcanvasx = document.getElementById("g");
        var gctx = gcanvasx.getContext('2d');
        gctx.imageSmoothingQuality = "high";
        gcanvasx.width=this.width;
        gcanvasx.height=this.height;
        console.log(this.width, this.height);
        console.log(gcanvasx.width, gcanvasx.height);
        gctx.clearRect(0, 0, gcanvasx.width, gcanvasx.height);
        gctx.drawImage(this, 0, 0, this.width, this.height);
        console.log(document.getElementById("g"));
        console.log(document.getElementById("c"));


        // window.URL.revokeObjectURL(this.src);
      }, false);
      try {
        imgx.src = origImgAsUrl;
      } catch (error) {
        console.log('fail lol: ', error);
      }
    }

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
      <br/>
      {/* <Tool icon={<RiMickeyLine/>} label={"Cartoonify"} toolName="cartoon" onClickHandler={serverToolButtonClick}/> */}
      <Tool icon={<IoColorPalette/>} label={"Colors of Life"} toolName="colorsoflife" onClickHandler={serverToolButtonClick}/>
      <Tool icon={<MdBlurLinear/>} label={"Blurred Beauty"} toolName="blurredbeauty" onClickHandler={serverToolButtonClick}/>
      <Tool icon={<FaPaintRoller/>} label={"Oil Paint"} toolName="oilpaint" onClickHandler={serverToolButtonClick}/>
      <Tool icon={<IoGlassesOutline/>} label={"Specify"} toolName="spec" onClickHandler={serverToolButtonClick}/>
      <Tool icon={<FaHandSparkles/>} label={"Thanos Effect"} toolName="thanoseffect" onClickHandler={serverToolButtonClick}/>
      <Tool icon={<SiGoogleearth/>} label={"Lost in the World"} toolName="lostintheworld" onClickHandler={serverToolButtonClick}/>
      <Tool icon={<BsPencil/>} label={"Pencil Sketch"} toolName="pencilsketch" onClickHandler={serverToolButtonClick}/>
      <Tool icon={<ImPencil2/>} label={"Experts Pencil"} toolName="expertspencil" onClickHandler={serverToolButtonClick}/>
      <Tool icon={<GiPencilBrush/>} label={"Sketch the Scene"} toolName="sketchthescene" onClickHandler={serverToolButtonClick}/>
    </div>
  );
}

export default ToolBar;

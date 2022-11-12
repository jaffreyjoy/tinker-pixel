import '../styles/ToolExpand.css';
import ImageDetails from './ImageDetails';
import Slider from './Slider';

function ToolExpand() {
    return (
      <div className="ToolExpand">
        <ImageDetails/>
        <Slider toolName="Brightness" minVal="0" maxVal="100" defaultVal="5"/>
      </div>
    );
  }

export default ToolExpand;

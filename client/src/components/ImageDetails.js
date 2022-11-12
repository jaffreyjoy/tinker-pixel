import '../styles/ImageDetails.css';
import { useSelector } from 'react-redux';
import { selectDims } from '../sharedObjects/dimsSlice';

function ImageDetails(props) {
  const dims = useSelector(selectDims);
  // console.log(dims);
    return (
      <div className="ImageDetails">
        <div className="titleContainer"><span>Dimensions:</span></div>
        <div className="widthContainer">
          <div className="widthLabelContainer"><span>Width: </span></div>
          <div className="widthValueContainer">
            <input className="widthValue" type="text" id="width" value={dims.w} disabled/>
            <span> px</span>
          </div>
        </div>
        <div className="heightContainer">
          <div className="heightLabelContainer"><span>Height: </span></div>
          <div className="heightValueContainer">
            <input className="heightValue" type="text" id="height" value={dims.h} disabled/>
            <span> px</span>
          </div>
        </div>
      </div>
    );
  }

export default ImageDetails;

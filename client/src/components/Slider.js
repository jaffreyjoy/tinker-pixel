import '../styles/Slider.css'
// import { useSelector } from 'react-redux';
// import { selectDims } from '../sharedObjects/dimsSlice';

function Slider(props) {
  // const dims = useSelector(selectDims);
  // console.log(dims);
    return (
      <div className="Slider">
        <div className="titleContainer"><span>{props.toolName} Value:</span></div>
        <div className="sliderContainer">
          <input type="range" list="labelList" className="rangeSlider" min={props.minVal} max={props.maxVal} defaultValue={props.defaultVal}/>
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

export default Slider;

import '../styles/TopBar.css'
import appicon from '../assests/img/Icon.png';

function TopBar() {
    return (
      <div className="TopBar">
        {/* <div><span className="heading">Tinker Pixel</span></div> */}
        <div> <img  className="appIcon" src={appicon} alt="Tinker Pixel" /> </div>
      </div>
    );
  }

export default TopBar;

import '../styles/Tool.css';

function Tool(props) {
    return (
      <div className="Tool" id={props.toolName} onClick={props.onClickHandler}>
        <div className="logoContainer"><span>{props.icon}</span></div>
        <div className="labelContainer"><span>{props.label}</span></div>
      </div>
    );
  }

export default Tool;

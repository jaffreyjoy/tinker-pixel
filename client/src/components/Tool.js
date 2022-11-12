import '../styles/Tool.css';

function Tool(props) {
    return (
      <div className="Tool" onClick={props.onClickHandler}>
        <div className="logoContainer"><span>{props.icon}</span></div>
        <div className="nameContainer"><span>{props.name}</span></div>
      </div>
    );
  }

export default Tool;

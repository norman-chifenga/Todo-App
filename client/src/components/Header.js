import {ReactComponent as MenuIcon} from "../icons/menu.svg"
import {ReactComponent as BackIcon} from "../icons/back.svg"

function Header(props) {

    const handleclicked = () => {
        if(props.activetab == "tasks" ){
            props.setActiveTab("list");
        }else{
            props.setActiveTab("tasks");
        }
    };

    return (
        <div className="header-container">
             <BackIcon className="header-btn" style={ props.activetab == "tasks" ? { display: "flex" }  : { display: "none" }  } 
            onClick= {handleclicked}  /> 
            <div id="header-title">
                {props.title}
            </div>
            <MenuIcon onClick={()=>{props.setListMenu()}} className="header-menu-btn"  style={  props.activetab == "tasks" ? { display: "flex" }  : { display: "none" } }/>
        </div>
    );

}
export default Header;



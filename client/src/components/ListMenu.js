
import { useContext } from "react"
import {listMenuContext} from "./Container"
import { ReactComponent as CloseIcon } from "../icons/close.svg"

export default function ListMenu(props){

    const [listMenu,setListMenu] = useContext(listMenuContext)

    return(
        <div className="menuList-container" style={ listMenu ? { display: "flex" }  : { display: "none" }}>
            <div className="menuList-btn-container">
                <CloseIcon className="menuList-close-btn" onClick={()=>{setListMenu(!listMenu)}} />
            </div>
            <button className="menuList-btn" onClick={()=>{props.handleDeleteList()}} >delete list</button>
            <button className="menuList-btn" onClick={()=>{props.handleDeleteAll()}}>empty the list</button>
        </div>
    )
}
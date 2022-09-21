import { useState } from "react";
import {List} from "./List";
import Tasks from "./Tasks"

export default function Content(props) {
    const [listId,setListId] = useState(0);    
    const [loadedList,setLoadedList] = useState(false)

    const getlistItems = (id,title) => {
        setListId(id)   
        props.setTitle(title)
        props.setActiveTab("tasks"); 
    };

    return (
        <>
            <div id="list-container" style={ props.activetab === "list" ? { display: "flex" }  : { display: "none" } }  >
                < List getlistItems = {getlistItems} loadedList={loadedList} setLoadedList={()=>setLoadedList(!loadedList)} />
            </div>

            <div id="listItem-container" style={ props.activetab === "tasks" ? { display: "flex" } : { display: "none" } } >
                <Tasks listMenu = {props.listMenu} getlistItems = {()=>props.setActiveTab("list")} 
                setLoadedList={()=>setLoadedList(!loadedList)} todoListId = {listId}/>
            </div>
        </>
    );
}

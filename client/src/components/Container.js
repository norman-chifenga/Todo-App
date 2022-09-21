import Header from "./Header";
import Content from "./Content";
import { useState, createContext, } from "react";

export const listMenuContext = createContext(null)

export function Container() {
    const [tab, setTab] = useState("list");
    const [title,setTitle] =useState("Todo List")
    const [listMenu,setListMenu] = useState(false)

    const setActiveTab = (newTab) => {
        setTab(newTab);
        if(newTab == "list") setTitle("Todo List")
    };

    return (
        <listMenuContext.Provider value={[listMenu,setListMenu]}>
        <div className="container">
            <Header activetab={tab} title={title} setListMenu={()=>setListMenu(!listMenu)} setActiveTab={setActiveTab} />
            <Content activetab={tab}  setActiveTab={setActiveTab} listMenu={listMenu}  setTitle={setTitle}  />
        </div>
        </listMenuContext.Provider>
    );
}



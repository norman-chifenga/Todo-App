import {useState } from 'react';
import {ReactComponent as AddIcon} from "../icons/add.svg"

function AddItem(props){
    const [inputValue,setInputValue] = useState("")
    const [visible,setVisiblity] = useState(false)

    const handleAdd = async ()=>{
       await props.handleAdd(inputValue).then((res)=>{
        if(res==true){
            setInputValue("")
            setVisiblity(!visible)
        }
       })
    }

    return(
        <div className="addItem-container">
            <div className="addItem-mordal"style={ visible ? { display: "flex" }  : { display: "none" } }>
                <input className="addItem-input" value={inputValue} onChange={(e) => setInputValue(e.target.value)}     />
                <div>
                <button className="addItem-btn" onClick={()=>setVisiblity(!visible)} >Cancel</button>
                <button className="addItem-btn"  onClick={()=>{ handleAdd(inputValue)}} >{props.title}</button>
                </div>
            </div>
            <AddIcon className="addItem-addbtn"  onClick={()=>setVisiblity(!visible)}/>
        </div>
    )
}

export default AddItem;
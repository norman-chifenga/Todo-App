import axios from 'axios';
import { useEffect, useState, useContext} from 'react';
import { ReactComponent as BinIcon} from "../icons/bin.svg"
import ListMenu from "./ListMenu"
import AddItem from "./AddItem"; 
import {listMenuContext} from "./Container"
   
export default function Tasks(props) {
    const [todoItemList,setItemList] = useState("")
    const [loaded,setLoaded] = useState(false)
    const [listMenu,setListMenu] = useContext(listMenuContext)

    const getListitems = ()=>{
      if(props.todoListId!==0){
        axios.get(`http://localhost:5000/tasks/${props.todoListId}`)
        .then(res => {
          if(res.data){
            setItemList(res.data) 
          }
        })
        .catch(err => console.log(err))
    }}

    useEffect(()=>{
        getListitems()
    },[loaded,props.todoListId])

    const handleCheck = (id, checked_value) => {
        axios.put(`http://localhost:5000/tasks/${id}`,null, { params: { checked: checked_value } })
        .then(res => {
          if(res.data){    
            setLoaded(!loaded)     
          }
        })
        .catch(err => console.log(err))
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/tasks/${id}`)
        .then(res => {
          if(res.data){    
            setLoaded(!loaded)       
          }
        })
        .catch(err => console.log(err))
    };

    const handleDeleteAll = ()=>{  
        axios.delete(`http://localhost:5000/tasks/delete/all`)
        .then(res => {
          if(res.data){    
            setLoaded(!loaded)  
            setListMenu(!listMenu)     
          }
        })
        .catch(err => console.log(err))
    }

    const handleAdd = async (item)=>{
       return axios.post("http://localhost:5000/tasks/",null,{params:{title:item, listId: props.todoListId}})
        .then(res => {
          if(res.data){
            setLoaded(!loaded) 
            return true
          }
        })
        .catch(err =>{console.log(err); return false})
      }

    const handleDeleteList = ()=>{
      axios.delete(`http://localhost:5000/list/${props.todoListId}`)
      .then(res => {
        if(res.data){
          props.setLoadedList()
          props.getlistItems()
          setListMenu(!listMenu)
        }
      })
      .catch(err => console.log(err))
    }

    return (
        <div className="item-container">
            {
            todoItemList.length ? (
                <ul className="items-container">
                {todoItemList.map((item) => (
                    <li className="items" key={item._id}>
                        <input
                            type="checkbox"
                            onChange={() => handleCheck(item._id,!item.checked)}
                            checked={item.checked}
                        />
                        <label
                            style={
                                item.checked
                                    ? {
                                          textDecoration: "line-through",
                                      }
                                    : null
                            }
                            onDoubleClick={() => handleCheck(item._id,!item.checked)}
                        >
                            {item.title}
                        </label>
                        <BinIcon className={"bin-st1"}            
                        onClick={()=> handleDelete(item._id)} />
                    </li>
                ))}
            </ul>            
            ):(
                <p className = "empty-list">task list empty</p>
            )
            }

          <AddItem handleAdd={handleAdd} title={"add new list"} />    
          <ListMenu handleDeleteAll={handleDeleteAll} handleDeleteList={handleDeleteList} title={"add new list"} />

        </div>
    );

}


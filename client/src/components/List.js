import axios from 'axios';
import { useEffect, useState, createContext } from 'react';
import AddItem from "./AddItem";

export function List(props){
    const [todoList,setTodoList] = useState([])

    const getList = ()=>{
      axios.get('http://localhost:5000/list/')
      .then(res => {
        if(res.data){
            setTodoList(res.data)                
        }
      })
      .catch(err => console.log(err))
    }

    useEffect(()=>{
      getList()
    },[props.loadedList])

    const handleClick = (id,title)=>{
        props.getlistItems(id,title)
    }    

    const handleAdd = (item)=>{
      return axios.post("http://localhost:5000/list/",null,{params:{title:item}})
      .then(res => {
        if(res.data){
          props.setLoadedList() 
          return true
        }
      })
      .catch(err =>{console.log(err); return false})
    }

    return(
          <div className="item-container">
          { todoList.length > 0 ?
            (<ul className="items-container">
            { todoList.map((item) =>  (
                <li className="items" key={item._id} onClick={()=>{handleClick(item._id,item.title)}} >
                <p>{item.title}</p>
                </li>
            )) }
            </ul>)
          :
          (<p className = "empty-list">list empty</p>)
        }
        < AddItem handleAdd={handleAdd} title={"add new list"} />
        </div>
    )
    
}



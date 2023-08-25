import React, { useState, useEffect } from "react";

import { BsTrash } from "react-icons/bs";

export  const Add =()=>{
    const [currentText, setCurrentText ] =useState("");
    const [currentI, setCurrentI ] =useState(0);
    const [checked, setChecked] = useState(true);
    const [currentHoverId , setCurrentHoverId] = useState('');


    /// initial todo is empty 
    const [todos, setTodo ] =useState([]);

    const [hover, setHover] = useState(false);

    const onHover = (id) => {
    
      setHover(true);
      setCurrentHoverId(id)
    };
  
    const onLeave = () => {
      setHover(false);
      setCurrentHoverId("")
    };


    // persistant storage-  when refresh the page  read from local storage and set todos in state 
    useEffect(() => {
        setTodo(JSON.parse(window.localStorage.getItem('todos')));
      }, []);
    
      // update to local storage whenever todos changed 
      useEffect(() => {
        window.localStorage.setItem('todos', JSON.stringify(todos));
      }, [todos]);



    const handleChange =(e)=>{
        
        setCurrentText(e.target.value)
    }

    const handleKeydown=(e)=>{
        if(e.key === 'Enter') {
            setCurrentText(e.target.value);
            
                addTodo();
            
          }

    }
    const addTodo =()=>{
        if( currentText===""){
            alert("please add a todo")
        }else{
            setTodo( (todos) =>{ setTodo([...todos, {
                id: currentI,
                title: currentText,
                isCompleted: false,
    
            }])  })
            setCurrentI(currentI +1)
            setCurrentText("")

        }

        

    }
    const updateTodo =(id)=>{
        
        let objIndex = todos.findIndex((obj => obj.id == id));
        todos[objIndex]['isCompleted'] = !todos[objIndex]['isCompleted']
        setTodo([...todos])

    }
    const deleteTodo =(id)=>{
        
        let objIndex = todos.findIndex((obj => obj.id == id));
        const filteredTodo= todos.filter((item) => item.id !== id);
        setTodo(filteredTodo)

      

    }


    return (
        <div>
            <div style={{ 
                height: '200px',background: 'linear-gradient(to right,#7d7af6, #8863fa,#719ff0,#60d1e8)', marginTop:'30px'}}>
                    <h3 style={{ color:'white' , textAlign:'center', padding: '50px' }}> Add a Task  </h3>
                </div>
            
            {/* <img src={ require('../images/logo192.png')} /> */}
            <div className="inputdiv">
                <input type="radio"  name="x" value="y" id="y" style={{ margin : 15 }}  />
                <input type='text'  className="input" onChange={handleChange} onKeyDown={handleKeydown} value={currentText} />
            
            </div>
                        

            <div className="todo-list" >
                {
                    todos && todos.map((todo, index)=>{
                        return (
                        <div class="radio" onMouseEnter={ () =>onHover(todo.id)}
                        onMouseLeave={onLeave}  >
                            <input type="checkbox"  name="x" value="y" id="y" style={{ margin : 15 }} defaultChecked={ todo.isCompleted==true ? 'checked' :  ''} onChange={()=> updateTodo(todo.id)} />
                            <label for="y" style={{ padding : 5, textDecoration: todo.isCompleted && 'line-through'  }}> { todo.title  }</label>
                            <p onClick={()=> deleteTodo(todo.id)} style={{ float :'right', marginRight : '100px',
                            
                             }}  >
                                     {
                                         (currentHoverId==todo.id) && (
                                              <BsTrash/>
                                         )
                                     }
                                
                            </p>

                        </div>
                          
                        )
                    })
                }
            </div>

        </div>
    )

}
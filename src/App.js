import "./App.css";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineCheck } from "react-icons/ai";

function App() {
  const [isComplete, setComplete] = useState(false);
  const [Todos, setTodos] = useState([]);
  const [newTitle, setTitle] = useState("");
  const [newDescription, setDescription] = useState("");
  const [completedTodos,setCompletedTodos]=useState([]);


  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let UpdatedTodo = [...Todos];
    UpdatedTodo.push(newTodoItem);
    setTodos(UpdatedTodo);
    localStorage.setItem('todo-list',JSON.stringify(UpdatedTodo))
  };

  useEffect(()=>{
    let savedTodo=JSON.parse(localStorage.getItem('todo-list'))
    let savedCompletedTodo=JSON.parse(localStorage.getItem('completedTodo'))
    if(savedTodo){
      setTodos(savedTodo)
    }
    if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo)
    }
  },[])

  const handleDelete=(index)=>{
    let reducedTodo=[...Todos];
    reducedTodo.splice(index);
    localStorage.setItem('todo-list',JSON.stringify(reducedTodo));
    setTodos(reducedTodo)
  }


  const handleCompleted=(index)=>{
    let now=new Date();
    let dd=now.getDate(); 
    let mm=now.getMonth()+1; 
    let yyyy=now.getFullYear(); 
    let h=now.getHours();
    let m=now.getMinutes();
    let s=now.getSeconds(); 
    let completedOn=dd + '-' + mm +'-' + yyyy + ' at ' + h +  ' : '+m+' : '+s;
    let filteredItem={
      ...Todos[index],
      completedOn:completedOn
    }
    let updatedCompletedTodo=[...completedTodos];
    updatedCompletedTodo.push(filteredItem)
    setCompletedTodos(updatedCompletedTodo)
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedTodo));
    handleDelete(index)
  }

  const handleDeleteCompletedTodo=(index)=>{
    let reducedTodo=[...completedTodos];
    reducedTodo.splice(index);
    localStorage.setItem('completedTodos',JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo)
  }

  return (
     <div>
      <h1>My todo</h1>
      <div className="wrapper">
        <div className="input">
          <div className="input-item">
            <label for="">Title</label>
            <input
              type="text"
              placeholder="Write the title here"
              value={newTitle}
              onChange={(e) => setTitle(e.target.value)}
          />
          </div>
          <div className="input-item">
            <label for="">Description</label>
            <input
              type="text"
              placeholder="Write the description here"
              value={newDescription}
              onChange={(e) => setDescription(e.target.value)}
          />
          </div>
          <div className="input-item">
            <button
              type="button"
              className="add-button"
              onClick={handleAddTodo}
           >
              Add
            </button>
          </div>
        </div>
        <div className="button-area">
          <button
            type="button"
            className={`sec-button ${isComplete === false && `active`}`}
            onClick={() => setComplete(false)}
          >
            Todo
          </button>
          <button
            type="button"
            className={`sec-button ${isComplete === true && `active`}`}
            onClick={() => setComplete(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {isComplete===false && Todos.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h1>{item.title}</h1>
                  <p>{item.description}</p>
                </div>
                <div>
                <AiOutlineDelete className="icon" onClick={()=>handleDelete(index)}/>
                  <AiOutlineCheck className="check-icon" title="Completed" onClick={()=>handleCompleted(index)}/>
                </div>
              </div>
            );
          })}
          {isComplete===true && completedTodos.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h1>{item.title}</h1>
                  <p>{item.description}</p>
                  <p><small>Completed on: {item.completedOn}</small></p>
                </div>
                <div>
                <AiOutlineDelete className="icon" onClick={()=>handleDeleteCompletedTodo(index)}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

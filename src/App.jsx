import { useState, useRef } from "react";
import Navbar from "./components/navbar";
import "./App.css";

function App() {
  const [Sno, setSno] = useState(1);
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [prevVal, setprevVal] = useState("");
  const [updatedVal, setupdatedVal] = useState("");
  const [index, setIndex] = useState(0);

  const editContainer = useRef();
  const editBox = useRef();

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEditChange = (e) => {
    setupdatedVal(e.target.value);
  };

  const handleEditButton = () => {
    let arrAdd = updatedVal.split(" ");
    let strLen = 0;
    arrAdd.map((i) => {
      if (i.length > 45) {
        strLen = Math.max(i.length, strLen) 
        strLen = i.length
        alert(`please add a space between ur word ${i}`);
      }
    });
    if(strLen<46){
    todos[index].todo = updatedVal;
    setTodos([...todos]);
    editContainer.current.style.height = "0";
    editBox.current.style.display = "none";
    }
  };

  const handleAdd = (e) => {
    let arrAdd = todo.split(" ");
    let strLen = 0;
    arrAdd.map((i) => {
      if (i.length > 45) {
        strLen = Math.max(i.length, strLen) 
        strLen = i.length
        alert(`please add a space between ur word ${i}`);
      }
    });
    if (todo.trim() !== "" && strLen<46) {
      setTodos([...todos, { sno: Sno, todo: todo }]);
      setTodo("");
      setSno(Sno + 1);
    }
  };

  const handleDelete = (e) => {
    let arrAfterDelete = todos;
    arrAfterDelete.splice(e.target.className, 1);
    setTodos([...arrAfterDelete]);
  };

  const handleEdit = (e, index) => {
    setIndex(index);
    setprevVal(todos[index].todo);
    editContainer.current.style.height = "100vh";
    editBox.current.style.display = "block";
  };

  return (
    <>
      <Navbar />
      <div id="container">
        <div id="containerHead">
          {/* {formData.sno} */}
          <input
            autoFocus
            onChange={handleChange}
            type="text"
            value={todo}
            name="todo"
          />
          <button onClick={handleAdd}>Add</button>
        </div>
        <div id="containerBody">
          {todos.map((info, index) => (
            <div key={index}>
              <div>{info.todo}</div>
              <div>
                <button className={index} onClick={handleDelete}>
                  Delete
                </button>
                <button
                  className={index}
                  onClick={(e) => {
                    handleEdit(e, index);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div ref={editContainer} className="editContainer">
        <div ref={editBox} className="editBox">
          <div className="editInputBox">
            <input disabled={true} value={prevVal} type="text" />
            <input onChange={handleEditChange} value={updatedVal} type="text" />
            <button onClick={() => handleEditButton()}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

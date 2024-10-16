import React, { useState, useEffect} from 'react';
import "../Modal.css";
import { fetchToDo, updateToDo } from '../api.js';

const UpdateModal = ({itemId, setOpenModal, onUpdate}) => {

  const [text, setText] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [dueDate, setDueDate] = useState('');

  var [todo, setToDo] = useState({});
  const loadToDo = async () => {
    try {
      const todo = await fetchToDo(itemId);
      setToDo(todo)
    } catch (error) {
      console.error('Error fetching ToDo:', error);
    }
  };

  useEffect(() => {
    loadToDo();
  }, []);


  const handleUpdate = async (event) => {
    event.preventDefault();

    if(text.length===0){
      setText(todo.text)
    }
    if(todo.dueDate!= null && dueDate.length != null){
      setDueDate(todo.dueDate)
    }
    if(priority !== todo.priority){
      setPriority(priority)
    }else{
      setPriority(todo.priority)
    }
    try {
      await updateToDo(itemId,text, priority,dueDate);
      setOpenModal(false)
      onUpdate();
    } catch (error) {
      console.error('Error updating ToDo:', error);
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}>
            X
          </button>
        </div>
        <div><center>Edit the To Do</center></div>
        <div>
          <form onSubmit={handleUpdate} className="todo-update-form">
            <div className="form-group">
              <label>Text:</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Priority:</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
              </select>
            </div>
            <div className="form-group">
              <label>Due Date (optional):</label>
              <input
                type="datetime-local" id="datetime-input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className="footer">
              <button
                onClick={() => {setOpenModal(false);}}
                id="cancelBtn"
                >Cancel</button>
              <button 
                id="saveBtn"
                type="submit" 
                className="submit-btn">Save</button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateModal;
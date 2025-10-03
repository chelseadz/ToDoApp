import React, { useState } from 'react';
import { createToDo } from '../api.js';
import "../Modal.css";

const CreateToDoModal = ({ setOpenModal, onNewToDo}) => {

  const [text, setText] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createToDo(text, priority,dueDate);
      onNewToDo();
      setOpenModal(false);
      setText('');
      setDueDate('');
    } catch (error) {
      console.error('Error creating ToDo:', error);
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

        <div>
          <form onSubmit={handleSubmit} className="todo-form">
            <div className="form-group">
              <label>Text:</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
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
                className="submit-btn">Add</button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateToDoModal;
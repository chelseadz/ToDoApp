import React, { useState } from 'react';

const Filters = ({ onSearch }) => {
  const [name, setName] = useState('');
  const [priority, setPriority] = useState('all');
  const [state, setState] = useState('all');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onSearch prop with the filter values
    onSearch(name, priority, state);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          name="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="all">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="state">State:</label>
        <select
          id="state"
          name="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="undone">Undone</option>
        </select>

      <button type="submit">Search</button>
      </div>
      
    </form>
  );
};

export default Filters;

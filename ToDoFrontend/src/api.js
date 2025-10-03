import axios from 'axios';

const API_URL = 'http://localhost:9090/todos';

export const fetchToDo = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

export const fetchAllData = async () => {
  const { data } = await axios.get(`${API_URL}/`);
  return data;
};

export const fetchToDos = async (
  pageSize,
  pageNumber,
  sortByDone,
  sortByDate,
  sortByPriority,
  nameFilter,
  priorityFilter,
  doneFilter,
) => {
  const params = {
    pageSize: pageSize, 
    pageNumber: pageNumber,
    sortByDone: sortByDone,
    sortByDate: sortByDate,
    sortByPriority: sortByPriority, 
    nameFilter: nameFilter,      
    priorityFilter: priorityFilter, 
    doneFilter: doneFilter         
  };
  const { data } =  await axios.get(API_URL,{params})
  return data;
};

export const createToDo = async (text, priority, dueDate) => {
  try {
    return await axios.post(API_URL, { text: text, priority: priority, dueDate: dueDate });
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

export const updateToDo = async (id, text, priority, dueDate) => {
  try {
    return await axios.put(`${API_URL}/${id}`, { id:id, text: text, priority: priority, dueDate: dueDate });
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

export const deleteToDo = async (id) => {
  try {
    return await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }

};

export const doneToDo = async (id, done) => {
  const finalDone = done.toString();
  try {
    return await axios.put(`${API_URL}/${id}/done`, {id:id,done:finalDone});
  } catch (error) {
    console.error('Error updatind done in todo:', error);
    throw error;
  }

};

import axios from 'axios';

// Create a new task
export const createTask = async (goalID, name) => {
    try {
        const response = await axios.post('/api/tasks', { goalID, name });
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

// Update the status of an existing task
export const updateTaskStatus = async (taskID, status) => {
    console.log('Task ID DEL LIB:', taskID);
    try {
        const response = await axios.put(`/api/tasks/${taskID}`, { status });
        return response.data;
    } catch (error) {
        console.error('Error updating task status:', error);
        throw error;
    }
};

// Delete a task
export const deleteTask = async (taskID) => {
    try {
        const response = await axios.delete(`/api/tasks/${taskID}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};

// Edit an existing goal
export const editTask = async (taskID) => {
    try {
        const response = await axios.put(`/api/task/${taskID}`);
        return response.data;
    } catch (error) {
        console.error('Error editing task:', error);
        throw error;
    }
};
import axios from 'axios';

// Fetch goals data
export const fetchGoalsData = async () => {
    try {
        const response = await axios.get('/api/goals');
        return response.data;
    } catch (error) {
        console.error('Error fetching goals data:', error);
        throw error; // Re-throw to let the caller handle it
    }
};

// Create a new goal
export const createGoal = async (name) => {
    try {
        const response = await axios.post('/api/goals', { name });
        return response.data;
    } catch (error) {
        console.error('Error creating goal:', error);
        throw error;
    }
};

// Delete a goal
export const deleteGoal = async (goalId) => {
    try {
        const response = await axios.delete(`/api/goals/${goalId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting goal:', error);
        throw error;
    }
};

// Edit an existing goal
export const editGoal = async (goalId, name) => {
    try {
        const response = await axios.put(`/api/goals/${goalId}`, { name });
        return response.data;
    } catch (error) {
        console.error('Error editing goal:', error);
        throw error;
    }
};
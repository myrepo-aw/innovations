import { useState, useEffect, useCallback } from "react";
import { Button, Table, FormControl } from "react-bootstrap";
import { Plus, Check, PencilFill, Trash2Fill } from 'react-bootstrap-icons';
import axios from 'axios';
import styles from '../styles/components/tasks.module.scss';
import TaskModal from '../utils/TaskModal';
import { createTask, updateTaskStatus, deleteTask, editTask } from '../lib/tasks';

const Tasks = ({ goalName, goalID, handleTasksUpdate }) => {
    const [showModal, setShowModal] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [tasks, setTasks] = useState([]);
    const [selectedTaskID, setSelectedTaskID] = useState(null);
    const [filterTerm, setFilterTerm] = useState('');

    // Fetch tasks data
    const fetchTasks = useCallback(async (goalID) => {
        try {
            if (goalID) {
                const response = await axios.get(`/api/tasks?goalID=${goalID}`);
                setTasks(response.data);
                handleTasksUpdate(true);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }, []);

    useEffect(() => {
        fetchTasks(goalID);
    }, [fetchTasks, goalID]);

    // Select the first task by default when tasks are fetched
    useEffect(() => {
        if (tasks.length > 0) {
            setSelectedTaskID(tasks[0].taskID);
        }
    }, [tasks]);

    // Handle task operations
    const handleCreateTask = async () => {
        try {
            if (taskName.trim()) {
                await createTask(goalID, taskName);
                fetchTasks(goalID); 
                setShowModal(false);
                setTaskName('');
            }
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    // Handle radio button change
    const handleRadioChange = (taskID) => {
        setSelectedTaskID(taskID);
    };

    useEffect(() => {
    }, [selectedTaskID]);

    const handleCompleteTask = async (taskID) => {
        if (taskID) {
            try {
                await updateTaskStatus(taskID, 'Completed');
                fetchTasks(goalID);
            } catch (error) {
                console.error('Error completing task:', error);
            }
        }
    };

    const handleDeleteTask = async (taskID) => {
        try {
            await deleteTask(taskID);
            fetchTasks(goalID);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleShowEditModal = () => {
        if (selectedTaskID) {
            const task = tasks.find(t => t.taskID === selectedTaskID);
            setSelectedTask(task);
        }
    };

    const handleEditTask = async () => {
        try {
            if (selectedTaskID && taskName.trim()) {
                await editTask(selectedTaskID, taskName);
                fetchTasks(goalID);
                setEditModal(false);
                setTaskName('');
            }
        } catch (error) {
            console.error('Error editing task:', error);
        }
    };

    // Find the selected task object
    const selectedTask = tasks.find(task => task.taskID === selectedTaskID);
    const isCompleted = selectedTask?.status === 'Completed';

    // Filter tasks based on filterTerm
    const filteredTasks = tasks.filter(task =>
        task.name.toLowerCase().includes(filterTerm.toLowerCase())
    );

    return (
        <main className={styles['tasks']}>
            <div className="background-primary">
                <strong className="d-block ps-3 pt-2 pb-2 color-white font-weight-600">{goalName}</strong>
            </div>
            <div className="background-white ps-3 pt-3 pb-3">
                <Button className="my-button pt-1 pb-1 ps-1 pe-2" onClick={() => setShowModal(true)}>
                    <Plus className="font-size-24"/> Add Task
                </Button>
                <Button 
                    className={isCompleted ? "my-button-unabled ms-3 pt-1 pb-1 ps-1 pe-2" : "my-button ms-3 pt-1 pb-1 ps-1 pe-2"} 
                    onClick={() => handleCompleteTask(selectedTaskID)}
                    disabled={isCompleted}
                >
                    <Check className="font-size-24"/> Complete Task
                </Button>
                <Button className="my-button ms-3 pt-1 pb-1 ps-2 pe-2" onClick={() => handleDeleteTask(selectedTaskID)}>
                    <Trash2Fill className="font-size-14"/> Delete
                </Button>
            </div>

            <TaskModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleSave={handleCreateTask}
                taskName={taskName}
                setTaskName={setTaskName}
                title="Add a New Task"
            />

            <div className="background-primary-light">
                <div className="pt-3 ps-3 pe-3">
                    <FormControl
                        type="text"
                        placeholder="Filter tasks by name..."
                        value={filterTerm}
                        onChange={(e) => setFilterTerm(e.target.value)}
                    />
                </div>

                <div className="pt-3">
                    <Table striped bordered hover className="mb-0">
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Name</th>
                                <th>Date Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTasks.length > 0 ? (
                                filteredTasks.map(task => (
                                    <tr key={task.taskID}>
                                        <td>
                                            <input 
                                                type="radio" 
                                                checked={selectedTaskID === task.taskID} 
                                                onChange={() => handleRadioChange(task.taskID)}
                                            />
                                        </td>
                                        <td>{task.name}</td>
                                        <td>{new Date(task.dateCreated).toLocaleDateString()}</td>
                                        <td className={task.status === 'Completed' ? 'text-success' : 'text-danger'}>{task.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No tasks available.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
        </main>
    );
}

export default Tasks;

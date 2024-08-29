import { useState, useEffect, useCallback, Fragment } from 'react';
import { Modal, Button, Form, ProgressBar } from 'react-bootstrap';
import { Plus, PencilFill, Trash2Fill } from 'react-bootstrap-icons';
import GoalModal from '../utils/GoalModal';
import Tasks from '@/components/Tasks';
import { fetchGoalsData, createGoal, deleteGoal, editGoal } from '../lib/goals';

const Goals = () => {
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [goals, setGoals] = useState([]);
    const [goalName, setGoalName] = useState('');
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [lastGoalID, setLastGoalID] = useState(null);
    const [lastGoalName, setLastGoalName] = useState(null);
    const [taskData, setTaskData] = useState([]);

    // Fetch goals data
    const fetchGoals = useCallback(async () => {
        try {
            const goalsData = await fetchGoalsData();
            setGoals(goalsData);
            setLastGoalID(goalsData.length > 0 ? goalsData[0].goalID : null);
            setLastGoalName(goalsData.length > 0 ? goalsData[0].name : null);
        } catch (error) {
            console.error('Error fetching goals:', error);
        }
    }, []);

    useEffect(() => {
        fetchGoals();
    }, [fetchGoals]);

    // Handle goal operations
    const handleCreateGoal = async () => {
        try {
            if (goalName.trim()) {
                await createGoal(goalName);
                fetchGoals();
                setShowModal(false);
                setGoalName('');
            }
        } catch (error) {
            console.error('Error creating goal:', error);
        }
    };

    const handleDeleteGoal = async (goalId) => {
        try {
            await deleteGoal(goalId);
            fetchGoals();
        } catch (error) {
            console.error('Error deleting goal:', error);
        }
    };

    const handleEditGoal = async () => {
        try {
            if (selectedGoal && goalName.trim()) {
                await editGoal(selectedGoal.goalID, goalName);
                fetchGoals();
                setEditModal(false);
                setGoalName('');
                setSelectedGoal(null);
            }
        } catch (error) {
            console.error('Error editing goal:', error);
        }
    };

    const handleTasksUpdate = (updatedTasks) => {
        fetchGoals();
    };

    return (
        <Fragment>
            <div className="row">
                <div className="col-4">
                    <aside className="goals">
                        <Button className="my-button" onClick={() => setShowModal(true)}>
                            <Plus className="font-size-24"/> New Goal
                        </Button>

                        <GoalModal
                            show={showModal}
                            handleClose={() => setShowModal(false)}
                            handleSave={handleCreateGoal}
                            goalName={goalName}
                            setGoalName={setGoalName}
                            title="Add a New Goal"
                        />

                        <GoalModal
                            show={editModal}
                            handleClose={() => setEditModal(false)}
                            handleSave={handleEditGoal}
                            goalName={goalName}
                            setGoalName={setGoalName}
                            title="Edit Goal"
                        />

                        <div className="w-100 mt-5">
                            <div id="goalsList">
                                {goals.length > 0 ? (
                                    goals.map(goal => (
                                        <div key={goal.goalID}>
                                            <div className="d-flex justify-content-between mt-3">
                                                <strong>{goal.name}</strong>
                                                <div>
                                                    <PencilFill className='clickeable' onClick={() => {
                                                        setSelectedGoal(goal);
                                                        setGoalName(goal.name);
                                                        setEditModal(true);
                                                    }} />
                                                    <Trash2Fill className="clickeable ms-2" onClick={() => handleDeleteGoal(goal.goalID)} />
                                                </div>
                                            </div>
                                            <span className="d-block ms-2">Created Date: {goal.dateCreated.substring(0, 10)}</span>
                                            
                                            <div className="d-flex justify-content-between mt-2">
                                                <span>Completed Tasks: {goal.completedTaskCount}/{goal.taskCount}</span>
                                                <span>{goal.taskCount > 0 ? Math.round((goal.completedTaskCount / goal.taskCount) * 100) : 0}%</span>
                                            </div>
                                            <ProgressBar className="d-block mt-3" variant="warning" now={goal.taskCount > 0 ? (goal.completedTaskCount / goal.taskCount) * 100 : 0} label="." />
                                            <hr className='mt-4 mb-4' />
                                        </div>
                                    ))
                                ) : (
                                    <p className='mt-5'>No goals available.</p>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>

                <div className="col-8">
                    <Tasks handleTasksUpdate={handleTasksUpdate} goalName={lastGoalName} goalID={lastGoalID} />
                </div>
            </div>
        </Fragment>
    );
}

export default Goals;
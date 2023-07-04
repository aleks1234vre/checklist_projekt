import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

interface Task {
    id: number;
    title_task: string;
    description_task: string;
    status: boolean;
    category_id: number;
}

interface Category {
    id: number;
    category_name: string;
}

const TaskView = () => {
    const { id } = useParams();
    const [task, setTask] = useState<Task | null>(null);
    const [category, setCategory] = useState<Category | null>(); // Add category state
    const [loading, setLoading] = useState(true);
    const [checkboxState, setCheckboxState] = useState(false);
    const [isStatusChanged, setIsStatusChanged] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get<Task>(`http://localhost:3000/tasks/${id}`);
                setTask(response.data);
                setLoading(false);
                setCheckboxState(response.data.status);
                console.log(task)
                const categoryResponse = await axios.get<Category>(`http://localhost:3000/categories/${response.data.category_id}`);
                setCategory(categoryResponse.data);
                console.log(category)
            } catch (error) {
                console.error('Error fetching task:', error);
                setLoading(false);
            }
        };

        fetchTask();
    }, []);

    const handleCheckboxChange = () => {
        setCheckboxState(!checkboxState);
        setIsStatusChanged(true);
    };

    const handleUpdate = async () => {
        if (task) {
            try {
                const updatedTask: Task = {
                    ...task,
                    status: checkboxState,
                };
                await axios.patch(`http://localhost:3000/tasks/${task.id}`, updatedTask, { withCredentials: true });
                console.log('Task updated successfully');
                setMessage('Task updated successfully!!');
                setTimeout(() => {
                    setMessage('');
                    window.location.reload();
                }, 2000);
            } catch (error) {
                console.error('Error updating task:', error);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!task) {
        return <div>Task not found</div>;
    }

    return (
        <div>
            <h1 style={{ paddingLeft: '40%', paddingRight: '40%' }}>Task View</h1>
            <hr />
            <div style={{ paddingLeft: '40%', paddingRight: '40%' }}>
                <p className="task_description">{task.description_task}</p>
                {category && <p className="task_category">Category: {category.category_name}</p>}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    <div
                        style={{
                            paddingTop: '10px',
                            borderRadius: '8px',
                            border: '1px solid transparent',
                            backgroundColor: '#E1C16E',
                            padding: '0.2em 2.3em',
                            display: 'inline-flex',
                        }}
                        className="form-check"
                    >
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={checkboxState}
                            onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Finished
                        </label>
                    </div>
                    {isStatusChanged && (
                        <div>
                            <button
                                className="button_small"
                                onClick={handleUpdate}
                                style={{ verticalAlign: 'middle' }}
                            >
                                Update
                            </button>
                        </div>
                    )}
                    <div className="success">{message}</div>
                </div>
            </div>
            <p style={{ paddingLeft: '40%', paddingRight: '40%', paddingTop: '10px' }}>
                Back to your <Link to="/tasksprofile">tasks!</Link>
            </p>
        </div>
        
    );
};

export default TaskView;
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Task {
    id: number;
    title_task: string;
    description_task: string;
    status: boolean;
}

const TaskView = () => {
    const { id } = useParams();
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);
    const [checkboxState, setCheckboxState] = useState(false);
    const [isStatusChanged, setIsStatusChanged] = useState(false);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get<Task>(`http://localhost:3000/tasks/${id}`);
                setTask(response.data);
                setLoading(false);
                setCheckboxState(response.data.status);
            } catch (error) {
                console.error('Error fetching task:', error);
                setLoading(false);
            }
        };

        fetchTask();
    }, [id]);

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
            <h1>Task View</h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ whiteSpace: 'pre-line', marginRight: '10px' }}>{task.description_task}</p>
                <label style={{ marginBottom: '13px' }}>
                    <input
                        type="checkbox"
                        checked={checkboxState}
                        onChange={handleCheckboxChange}
                    />
                    Finished
                </label>
            </div>
            {isStatusChanged && (
                <button className="button_small" onClick={handleUpdate}>Update</button>
            )}
        </div>
    );
};

export default TaskView;
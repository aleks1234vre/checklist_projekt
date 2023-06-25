import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Task {
    id: number;
    title_task: string;
    description_task: string;
    status:boolean;

}

const TaskView = () => {
    const { id } = useParams();
    const [task, setTask] = useState<Task | null>(null); // Define the type of task as Task | null
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get<Task>(`http://localhost:3000/tasks/${id}`);
                setTask(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching task:', error);
                setLoading(false);
            }
        };

        fetchTask();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!task) {
        return <div>Task not found</div>;
    }

    return (
        <div>
            <h1>Task View</h1>
            <h2>{task.title_task}</h2>
           <p style={{ whiteSpace: 'pre-line' }}>{task.description_task}</p>
            <div>
                <input type="checkbox" checked={task.status} onChange={() => {}} />
                <label>Finished</label>
            </div>
            {/* Render other task details */}
        </div>
    );
};

export default TaskView;
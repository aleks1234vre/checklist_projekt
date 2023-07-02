import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

interface Task {
    id: number;
    title_task: string;
    description_task: string;
    status: boolean;
    category_id: number | null;
    finished_at: string | null;
}

interface Category {
    id: number;
    category_name: string;
}

const style = {
    height: "100%",
};
const EditTask = () => {
    const { id } = useParams();
    const [task, setTask] = useState<Task | null>(null);
    const [category, setCategory] = useState<Category | null>();
    const [loading, setLoading] = useState(true);
    const [checkboxState, setCheckboxState] = useState(false);
    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get<Task>(`http://localhost:3000/tasks/${id}`);
                setTask(response.data);
                setLoading(false);
                setCheckboxState(response.data.status);
                setEditTitle(response.data.title_task);
                setEditDescription(response.data.description_task);
                const categoryResponse = await axios.get<Category>(
                    `http://localhost:3000/categories/${response.data.category_id}`
                );
                setCategory(categoryResponse.data);
                setSelectedCategoryId(response.data.category_id);

            } catch (error) {
                console.error('Error fetching task:', error);
                setLoading(false);
            }
        };

        fetchTask();
    }, [id]);

    const handleCheckboxChange = () => {
        setCheckboxState(!checkboxState);
    };


    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategoryId(Number(e.target.value));
    };

    const handleUpdate = async () => {
        try {



            const updatedTask: Task = {
                ...task!,
                title_task: editTitle,
                description_task: editDescription,
                category_id: selectedCategoryId ?? 0,
                status: checkboxState,
                finished_at: status ? new Date().toISOString() : null,
            };


            await axios.patch(`http://localhost:3000/tasks/${task!.id}`, updatedTask, { withCredentials: true });
            console.log('Task updated successfully');
            setMessage('Task updated successfully!!');
            setTimeout(() => {
                setMessage('');
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get<Category[]>('http://localhost:3000/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

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
                {isEditing ? (
                    <>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="editTitle"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                            <label htmlFor="editTitle">Task Title</label>
                        </div>
                        <div className="form-floating">
                            <textarea
                                className="form-control"
                                id="editDescription"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                rows={6}
                                style={style}
                            ></textarea>
                            <label htmlFor="editDescription">Task Description</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select
                                className="form-select"
                                id="editCategory"
                                value={selectedCategoryId || ''}
                                onChange={handleCategoryChange}
                            >
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.category_name}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="editCategory">Category</label>
                        </div>
                        <div
                            style={{
                                paddingTop: '10px',
                                borderRadius: '8px',
                                border: '1px solid transparent',
                                backgroundColor: '#E1C16E',
                                padding: '0.2em 2.3em',
                                display: 'inline-flex',
                                marginTop: '10px',
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
                        <div>
                            <button className="button_small" onClick={handleUpdate}>
                                Save
                            </button>
                            <button className="button_small" onClick={() => setIsEditing(false)}>
                                Cancel
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="task_description">{task.description_task}</p>
                        {category && <p className="task_category">Category: {category.category_name}</p>}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            <div>
                                <button className="button_small" onClick={handleEdit} style={{ verticalAlign: 'middle' }}>
                                    Edit
                                </button>
                            </div>

                        </div>
                    </>
                )}
            </div>
            <h6  style={{ paddingLeft: '40%', paddingRight: '40%' }} className="success">{message}</h6>
            <p style={{ paddingLeft: '40%', paddingRight: '40%', paddingTop: '10px' }}>
                Back to your <Link to="/tasksprofile">tasks!</Link>
            </p>
        </div>
    );
};

export default EditTask;
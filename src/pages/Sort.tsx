import { useEffect, useState } from 'react';
import axios from 'axios';

type Task = {
    id: number;
    title_task: string;
    description_task: string;
    category_id: number;
};

type Category = {
    id: number;
    category_name: string;
};

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [sortedTasks, setSortedTasks] = useState<Task[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<string>('asc');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get<Task[]>('http://localhost:3000/tasks');
                setTasks(response.data);

                const categoryResponse = await axios.get<Category[]>('http://localhost:3000/categories');
                setCategories(categoryResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchTasks();
    }, []);

    useEffect(() => {
        const filteredTasks = tasks.filter(task => task.category_id === selectedCategory);
        setSortedTasks(filteredTasks);
    }, [tasks, selectedCategory]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(Number(e.target.value));
    };

    const handleSort = () => {
        const sorted = sortedTasks.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.title_task.localeCompare(b.title_task);
            } else {
                return b.title_task.localeCompare(a.title_task);
            }
        });
        setSortedTasks([...sorted]);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div>
            <h1>Task List</h1>
            <div>
                <label htmlFor="category">Select Category:</label>
                <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                    <option value={0}>All</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.category_name}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={handleSort}>Sort</button>
            <ul>
                {sortedTasks.map(task => (
                    <li key={task.id}>
                        <strong>{task.title_task}</strong> - {task.description_task}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
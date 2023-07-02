import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";

type Task = {
    id: number;
    title_task: string;
    description_task: string;
    created_at: string;
    category_id: number;
    category: Category;
};

type Category = {
    id: number;
    category_name: string;
};

const TasksProfile = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasksResponse = await axios.get("http://localhost:3000/tasks", {
                    withCredentials: true,
                });
                const sortedTasks = tasksResponse.data.sort((a: Task, b: Task) => {
                    return (
                        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                    );
                });

                setTasks(sortedTasks);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:3000/categories");
                setCategories(response.data);
            } catch (error) {
                // Handle error
            }
        };

        fetchTasks();
        fetchCategories();
    }, []);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    const handleSort = () => {
        const sorted = [...tasks].sort((a: Task, b: Task) => {
            if (sortOrder === "asc") {
                return (
                    new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                );
            } else {
                return (
                    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                );
            }
        });

        setTasks(sorted);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const filteredTasks = selectedCategory
        ? tasks.filter((task: Task) => task.category.category_name === selectedCategory)
        : tasks;

    return (
        <div>
            {localStorage.getItem("hasCookie") ? (
                <>
                    <h1 style={{ paddingLeft: "6%" }}>All tasks</h1>
                    <label style={{ paddingLeft: "6%" }} htmlFor="category">
                        Filter by Category:
                    </label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value="">All</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.category_name}>
                                {category.category_name}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleSort}>
                        Sort ({sortOrder === "asc" ? "Ascending" : "Descending"})
                    </button>
                    <hr />
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            marginTop: "50px",
                            marginBottom: "50px",
                            paddingLeft: "6%",
                        }}
                    >
                        {filteredTasks.map((task) => (
                            <div
                                key={task.id}
                                style={{
                                    width: "23%",
                                    marginBottom: "10px",
                                    marginRight: "20px",
                                }}
                            >
                                <Card
                                    title={task.title_task}
                                    description={task.description_task}
                                    taskId={task.id}
                                    category_name={task.category.category_name}
                                />
                            </div>
                        ))}
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default TasksProfile;
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card.tsx";

type Task = {
    id: number;
    title_task: string;
    description_task: string;
    created_at: string;
};

const TasksProfile = () => {
    const [tasks, setTasks] = useState<Task[]>([]); // Explicitly define the type as Task[]
    const [loading, setLoading] = useState(true);

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
                // Handle error
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {localStorage.getItem("hasCookie") ? (
                <>
                    <h1 style={{ paddingLeft: "6%" }}>All tasks</h1>
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
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                style={{ width: "23%", marginBottom: "10px", marginRight: "20px" }}
                            >
                                <Card
                                    title={task.title_task}
                                    description={task.description_task}
                                    taskId={task.id}
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
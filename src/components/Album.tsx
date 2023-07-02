import Card from "./Card.tsx";
import { useEffect, useState } from "react";
import axios from "axios";

const Album = () => {

    const [loading, setLoading] = useState(true);
    const [recentTasks, setRecentTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasksResponse = await axios.get("http://localhost:3000/tasks", {
                    withCredentials: true,
                });
                const sortedTasks = tasksResponse.data.sort((a: any, b: any) => {
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                });
                setLoading(false);
                const recentTasks = sortedTasks.slice(0, 4);
                setRecentTasks(recentTasks);
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
            {localStorage.getItem('hasCookie') ? (
                <>
                    <h1 style={{ paddingLeft: "6%" }}>Recent tasks</h1>
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
                        {recentTasks.map((task: any) => (
                            <div style={{ width: "23%", marginBottom: "10px", marginRight: "20px" }}>
                                <Card
                                    key={task.id}
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

export default Album;
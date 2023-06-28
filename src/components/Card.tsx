import React, { useState, useEffect } from "react";
import axios from "axios";

type CardProps = {
    title: string;
    description: string;
    taskId: number;
};

const Card = ({ title, description, taskId }: CardProps) => {
    const [status, setStatus] = useState(false);
    const [showUpdateButton, setShowUpdateButton] = useState(false);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/tasks/${taskId}`);
                const task = response.data;
                setStatus(task.status);
            } catch (error) {
                console.error("Error fetching task status:", error);
                // Handle the error or display an error message to the user
            }
        };

        fetchStatus();
    }, [taskId]);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.checked);
        setShowUpdateButton(true);
    };

    const handleUpdate = async () => {
        try {
            const updatedTask = {
                status: status,
                finished_at: status ? new Date().toISOString() : null,
            };

            await axios.patch(`http://localhost:3000/tasks/${taskId}`, updatedTask, {
                withCredentials: true,
            });

            console.log("Task updated successfully");
            // You can handle the response or perform additional actions here
        } catch (error) {
            console.error("Error updating task:", error);
            // Handle the error or display an error message to the user
        }
    };

    return (
        <>
            <div className="col">
                <div className="card shadow-sm">
                    <svg
                        className="bd-placeholder-img card-img-top"
                        width="100%"
                        height="225"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-label="Placeholder: Thumbnail"
                        preserveAspectRatio="xMidYMid slice"
                        focusable="false"
                    >
                        <rect width="100%" height="100%" fill="#E1C16E" />
                        <title>siva je</title>
                        <foreignObject width="100%" height="100%">
                            <div style={{ wordWrap: "break-word" }}>
                                <p
                                    className="card-text"
                                    style={{ padding: "15px", whiteSpace: "pre-wrap" }}
                                >
                                    {description}
                                </p>
                            </div>
                        </foreignObject>
                    </svg>
                    <div className="card-body">
                        <p className="card-text">{title}</p>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={status ? "true" : "false"}
                                checked={status}
                                onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Finished
                            </label>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-secondary"
                                    onClick={() => (window.location.href = `/task/${taskId}`)}
                                >
                                    View
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-secondary"
                                >
                                    Edit
                                </button>
                            </div>
                            {showUpdateButton && (
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-secondary"
                                    onClick={handleUpdate}
                                >
                                    Update
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;
import React, { useState, useEffect } from "react";
import axios from "axios";

type CardProps = {
    title: string;
    description: string;
    taskId: number;
    category_name: string;
};

const Card = ({ title, description, taskId, category_name }: CardProps) => {
    const [status, setStatus] = useState(false);
    const [showUpdateButton, setShowUpdateButton] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [message, setMessage] = useState("");


    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/tasks/${taskId}`);
                const task = response.data;
                setStatus(task.status);
            } catch (error) {
                console.error("Error fetching task status:", error);
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
            setMessage("Task updated!!");
            console.log("Task updated successfully");

            setTimeout(() => {
                setMessage("");
            }, 1000); // 1 second timeout
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleDelete = () => {
        setShowConfirmation(true);
    };

    const confirmDelete = async () => {
        try {
            // Send delete request
            await axios.delete(`http://localhost:3000/tasks/${taskId}`, {
                withCredentials: true,
            });
            setRedirect(true);
            console.log("Task deleted successfully");
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    useEffect(() => {
        if (redirect) {
            // Perform the page refresh here
            window.location.reload();
        }
    }, [redirect]);

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
                            <tr className="d-flex justify-content-between align-items-center">
                                <td>
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Finished
                                    </label>
                                </td>
                                <td>
                                    <h6 className="success" style={{ paddingLeft: "10px" }}>
                                        {message}
                                    </h6>
                                </td>
                            <td style={{paddingLeft:"10em"}}>
                                {category_name}
                            </td>
                            </tr>
                            <rect width="100%" height="100%" fill="#E1C16E" />
                            <foreignObject width="100%" height="100%">
                                <div style={{ wordWrap: "break-word" }}>
                                    <p
                                        className="card-text"
                                        style={{ padding: "15px", whiteSpace: "pre-wrap" }}
                                    >

                                    </p>
                                </div>
                            </foreignObject>
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
                                    onClick={() =>
                                        (window.location.href = `/task/${taskId}/edit`)
                                    }
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={handleDelete}
                                >
                                    Delete
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

            {/* Confirmation Popup */}
            {showConfirmation && (
                <div className="popup">
                    <div className="popup-content">
                        <p style={{ fontWeight: "bold", color: "red" }}>
                            Are you sure you want to delete this task?
                        </p>
                        <div className="popup-buttons">
                            <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={confirmDelete}
                            >
                                Confirm Delete
                            </button>

                            <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => setShowConfirmation(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Card;
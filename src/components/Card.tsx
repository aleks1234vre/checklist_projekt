import {useState} from "react";

type CardProps = {
    title: string;
    description: string;
    taskId: number; // Updated type to number
};


const Card = ({ title, description, taskId}: CardProps) => {
    const [Status, setStatus] = useState(false);

    const handleCheckboxChange = () => {
        setStatus(!Status);
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
                        <rect width="100%" height="100%" fill="#808080" />

                        <title>siva je</title>

                        <foreignObject width="100%" height="100%">
                            <div style={{ wordWrap: 'break-word' }}>
                                <p className="card-text" style={{ padding: '15px', whiteSpace: 'pre-wrap'  }}>

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
                                value={Status ? "true" : "false"}
                                checked={Status}
                                onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Finished
                            </label>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => (window.location.href = `/task/${taskId}`)}>
                                    View
                                </button>
                                <button type="button" className="btn btn-sm btn-outline-secondary">
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;
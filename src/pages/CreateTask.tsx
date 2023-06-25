import { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const style = {
    height: "100%",
};

const CreateTask = () => {
    const [title_task, setTitleTask] = useState("");
    const [descriptions, setDescriptions] = useState([""]); // State for task descriptions
    const [category_id, setCategory] = useState(1);

    const [errorText, setErrorText] = useState("");
    const [redirect, setRedirect] = useState(false);

    const [categories, setCategories] = useState([]);
    const getCategories = async () => {
        try {
            const response = await axios.get("http://localhost:3000/categories");
            setCategories(response.data);
        } catch (error) {
            // Handle error
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleDescriptionChange = (index: number, value: string) => {
        const newDescriptions = [...descriptions];
        newDescriptions[index] = value;
        setDescriptions(newDescriptions);
    };

    const addDescriptionBox = () => {
        setDescriptions([...descriptions, ""]);
    };

    const removeDescriptionBox = (index: number) => {
        const newDescriptions = [...descriptions];
        newDescriptions.splice(index, 1);
        setDescriptions(newDescriptions);
    };

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const data = {
            title_task,
            description_task: descriptions.join("\n"),
            category_id,
        };
        console.log(data);

        try {
            const res = await axios.post("http://localhost:3000/tasks", data, {
                withCredentials: true,
            });

            if (res.status === 201) {
                setRedirect(true);
            } else {
                setErrorText("napaka");
            }
        } catch (error) {
            // Handle error
        }
    };

    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <main className="form-signin w-100 m-auto">
                <h2 className="error">{errorText}</h2>
                <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal">Create a new task</h1>
                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Title"
                            onChange={(e) => setTitleTask(e.target.value)}
                            required
                        />
                        <label htmlFor="floatingInput">Title</label>
                    </div>
                    {categories.length > 0 ? (
                        <div className="form-floating">
                            <select
                                className="form-control"
                                id="floatingSelect"
                                placeholder="Category"
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories.map((category: any, i) => {
                                    return (
                                        <option value={category.id} key={i}>
                                            {category.category_name}
                                        </option>
                                    );
                                })}
                            </select>
                            <label htmlFor="floatingSelect">Category</label>
                        </div>
                    ) : (
                        <div>Loading categories...</div>
                    )}
                    {/* Render task description input boxes */}
                    {descriptions.map((description, index) => (
                        <div className="form-floating d-grid" key={index}>
    <textarea
        className="form-control"
        id={`floatingContent${index}`}
        placeholder="Input content"
        style={style}
        rows={2}
        value={description}
        onChange={(e) => handleDescriptionChange(index, e.target.value)}
        required
    ></textarea>

                            <label htmlFor={`floatingContent${index}`}>Task content</label>
                            {index > 0 && (
                                <div className="text-center">
                                <button
                                    type="button"
                                    className="btn btn-danger align-self-center"
                                    onClick={() => removeDescriptionBox(index)}
                                >
                                    -
                                </button>
                                </div>
                            )}
                        </div>
                    ))}
                        <div className="text-center">
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={addDescriptionBox}

                        >
                            Add another task +

                        </button>
                        </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">
                        Create
                    </button>
                    <h6 className="error">{errorText}</h6>
                </form>
            </main>
        </>
    );
};

export default CreateTask;
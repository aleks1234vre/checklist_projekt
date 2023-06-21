import { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const style = {
    height: "100%",
};

const CreateTask = () => {
    const [title_task, setTitleTask] = useState("");
    const [description_task, setDescriptionTask] = useState("");
    const [category_id, setCategory] = useState("");

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

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const data = {
            title_task,
            description_task,
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

    useEffect(() => {
        console.log(categories);
    }, [categories]);

    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <main className="form-signin w-100 m-auto">
                <h2 className="error">{errorText}</h2>
                <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal">Create new task</h1>
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
                            <select className="form-control" id="floatingSelect"
                                    placeholder="Category"
                                    onChange={(e) => setCategory(e.target.value)}>
                                {categories.map((category:any, i) =>
                                {
                                    return (
                                        <option value={category.id} key={i}>
                                            {category.title}</option>)
                                })}
                            </select>
                            <label htmlFor="floatingSelect">Category</label>
                        </div>
                    ) : (
                        <div>Loading categories...</div>
                    )}
                    <div className="form-floating">
            <textarea
                className="form-control"
                id="floatingContent"
                placeholder="Input content"
                style={style}
                rows={10}
                onChange={(e) => setDescriptionTask(e.target.value)}
                required
            ></textarea>
                        <label htmlFor="floatingContent">Input content</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">
                        Create
                    </button>
                </form>
            </main>
        </>
    );
};

export default CreateTask
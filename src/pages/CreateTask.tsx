import { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const style = {
    height: "100%",
};

const CreateTask = () => {
    const [title_task, setTitleTask] = useState("");
    const [description_task, setDescriptionTask] = useState("");
    const [category_id, setCategory] = useState(1);
    const [errorText, setErrorText] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [categories, setCategories] = useState([""]);
    const [loading, setLoading] = useState(true); // New state to track loading state

    const getCategories = async () => {
        try {
            const response = await axios.get("http://localhost:3000/categories");
            setCategories(response.data);
            setLoading(false); // Set loading state to false once categories are fetched
        } catch (error) {
            // Handle error
            setLoading(false); // Set loading state to false even if fetching categories fails
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
            category_id: category_id || null, // Use null if category_id is falsy
        };
        console.log(data);

        try {
            const res = await axios.post(
                "http://localhost:3000/tasks",
                data,
                { withCredentials: true }
            );

            if (res.status === 201) {
                setRedirect(true);
            } else {
                setErrorText("napaka");
            }
        } catch (error) {
            // Handle error
            setErrorText("napaka");
        }
    };

    if (redirect) {
        return <Navigate to="/" />;
    }

    if (loading) {
        return <div>Loading categories...</div>; // Placeholder for loading state
    }

    return (
        <>
            <main className="form-signin w-100 m-auto">
                <h2 className="error">{errorText}</h2>
                <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal">Create new task</h1>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput"
                               placeholder="Title"
                               onChange={(e) => setTitleTask(e.target.value)} required/>
                        <label htmlFor="floatingInput">Title</label>
                    </div>
                    <div className="form-floating">
                        <select className="form-control" id="floatingSelect"
                                placeholder="Category"
                                onChange={(e) => setCategory(parseInt(e.target.value,10)) }required>
                            {categories.map((category:any)=>{
                                return (
                                    <option value={category.id} key={category.id}>{category.title}</option>
                                )})
                            }
                        </select>
                        <label htmlFor="floatingSelect">Category</label>
                    </div>
                    <div className="form-floating">
                      <textarea className="form-control" id="floatingContent"
                                placeholder="Input content"
                                style={style}
                                rows={10}
                                onChange={(e) => setDescriptionTask(e.target.value)} required>
                      </textarea>
                        <label htmlFor="floatingContent">Input content</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Create</button>
                </form>
            </main>
        </>
    )
}

export default CreateTask;


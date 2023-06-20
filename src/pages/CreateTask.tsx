/*import { useState } from "react";
import axios from "axios";

const CreateTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const createTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/tasks", {
                title,
                description,
            });

            if (response.status === 201) {
                setTitle("");
                setDescription("");
                setError("");
                console.log("Task created:", response.data);
            } else {
                setError("Error creating task");
            }
        } catch (error) {
            setError("Error creating task");
        }
    };

    return (
        <div>
            <form onSubmit={createTask}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                ></textarea>
                <button type="submit">Create Task</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default CreateTask;
*/
import {SyntheticEvent, useEffect, useState} from "react";
import axios from "axios";
import {Navigate} from "react-router-dom";

const style = {
    height: "100%"
}

const CreateTask = () => {
    const [title_task, setTitleTask] = useState('');
    const [description_task, setDescriptionTask] = useState('');
    const [category_id, setCategory] = useState(1);

    const [errorText, setErrorText] = useState('');
    const [redirect, setRedirect] = useState(false);


    const [categories, setCategoies] =
        useState([]);
    const getCategories = async () => {
        const getCat =
            await axios.get('http://localhost:3000/categories');
        setCategoies(getCat.data);
    }
    //ko se spletna stran naloži se sproži ta effect in požene funkcijo
    useEffect(() => {getCategories()}, []);

    const submit = async (e:SyntheticEvent) => {
        e.preventDefault();

        const data = {
            title_task,
            description_task,
            category_id
        };
        console.log(data);

        const res =
            await axios.post('http://localhost:3000/tasks',
                data,
                {withCredentials: true});

        if (res.status == 201) {
            setRedirect(true);
        }

        if (res.status != 201) {
            setErrorText("napaka")
        }

    }

    if (redirect) {
        return <Navigate to='/' />;
    }


    return (
        <>
            <main className="form-signin w-100 m-auto">
                <h2 className="error">{errorText}</h2>
                <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal">Insert blog</h1>
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
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Save</button>
                </form>
            </main>
        </>
    )
}

export default CreateTask;


import { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const style = {
    height: "100%",
};

const CreateTask = () => {
    const [category_id, setCategory] = useState(1);
    const [category_name, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [categories, setCategories] = useState([]);
    const getCategories = async () => {
        try {
            const response = await axios.get("http://localhost:3000/categories");
            setCategories(response.data);
            if (response.data.length > 0) {
                setCategoryName(response.data[0].category_name);
                setDescription(response.data[0].description);
            }
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
            category_name,
            description,
        };

        try {
            const res = await axios.patch(
                `http://localhost:3000/categories/${category_id}`,
                data,
                {
                    withCredentials: true,
                }
            );

            if (res.status === 200) {
                setRedirect(true);
            } else {
                setErrorText("Error");
            }
        } catch (error) {
            // Handle error
        }
    };


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("http://localhost:3000/auth/profile", {
                    withCredentials: true,
                });
                setIsAdmin(response.data.is_admin);
                console.log(isAdmin)
                if(!isAdmin){
                    setErrorText("you're not an admin!!")
                }
            } catch (error) {
                // Handle error
            }
        };

        fetchUser();
    }, []);


    const handleEdit = () => {
        setIsEditing(true);
    };

    if (redirect) {
        return <Navigate to="/" />;
    }




    return (

        <>
            {isAdmin?( <div>
                    <h2 style={{ paddingLeft: "40%", paddingRight: "40%" }}>Edit Category (admin)</h2>
                    <hr></hr>
                    <form style={{ paddingLeft: "40%", paddingRight: "40%" }} onSubmit={submit}>
                        {categories.length > 0 ? (
                            <div className="form-floating">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingCategoryName"
                                        placeholder="Category name"
                                        value={category_name}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        required
                                    />
                                ) : (
                                    <select
                                        className="form-control"
                                        id="floatingSelect"
                                        placeholder="Category"
                                        onChange={(e) => {
                                            const selectedCategory = categories.find(
                                                (category:any) => category.id === Number(e.target.value)
                                            );
                                            setCategory(Number(e.target.value));
                                            setCategoryName(selectedCategory?.category_name || "");
                                            setDescription(selectedCategory?.description || "");
                                            setIsEditing(false);
                                        }}
                                    >

                                        {categories.map((category: any, i=1) => (
                                            <option value={category.id} key={i}>
                                                {category.category_name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                <label htmlFor={isEditing ? "floatingCategoryName" : "floatingSelect"}>
                                    Category
                                </label>
                            </div>
                        ) : (
                            <div>Loading categories...</div>
                        )}

                        {category_id && (
                            <>
                                <div className="form-floating d-grid">
                <textarea
                    className="form-control"
                    id="floatingContent"
                    placeholder="Category description"
                    style={style}
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    readOnly={!isEditing}
                    required
                ></textarea>
                                    <label htmlFor="floatingContent">Category description</label>
                                </div>

                                {!isEditing && (
                                    <button style={{ paddingRight:"11.2em"}} type="button" className="button_wide" onClick={handleEdit}>
                                        Edit
                                    </button>
                                )}

                                {isEditing && (
                                    <button style={{ paddingRight:"9.8em"}} type="submit" className="button_wide">
                                        Update
                                    </button>
                                )}
                            </>
                        )}


                    </form>

                </div> ):
                (
                    <h6 className="error">{errorText}</h6>

            )
            }
        </>
    );
};

export default CreateTask;
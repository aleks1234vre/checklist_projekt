import React, {useEffect, useState} from "react";
import axios from "axios";
import {Navigate} from "react-router-dom";


const CreateCategory: React.FC = () => {
    const [categoryData, setCategoryData] = useState({
        category_name: "",
        description: "",

    });


    const style = {
        height: "100%",
    };

    const [redirect, setRedirect] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:3000/categories",
                categoryData, {withCredentials: true,});
                {

                }

            if (response.status === 201) {
                setRedirect(true);
            } else {
                setErrorText("napaka");
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
                //
            }
        };

        fetchUser();
    }, []);

    if (redirect) {
        return <Navigate to="/" />;
    }



    return (
        <>
        {isAdmin?( <div>
                <h2 style={{ paddingLeft: "40%", paddingRight: "40%" }}>Create Category (Admin)</h2>
                <hr></hr>
                <form style={{ paddingLeft: "40%", paddingRight: "40%" }}onSubmit={handleSubmit}>
                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Title"
                            value={categoryData.category_name}
                            onChange={(e) =>
                                setCategoryData({ ...categoryData, category_name: e.target.value })

                            }
                            required/>
                        <label htmlFor="floatingInput">Title</label>
                    </div>


                    <div className="form-floating d-grid">
                    <textarea
                        className="form-control"
                        id="floatingContent"
                        placeholder="Category description"
                        style={style}
                        rows={6}
                        value={categoryData.description}
                        onChange={(e) =>
                            setCategoryData({ ...categoryData, description: e.target.value })
                        } required
                    ></textarea>
                        <label htmlFor="floatingInput">Description</label>
                    </div>
                    <button className="button_wide" type="submit">Create</button>

                </form>
            </div>):(

            <h6 className="error">{errorText}</h6>
            )
        }
</>
);
};


export default CreateCategory;
import React, { useState } from "react";
import axios from "axios";
import {Navigate} from "react-router-dom";

const CreateCategory: React.FC = () => {
    const [categoryData, setCategoryData] = useState({
        category_name: "",
        description: "",
        // other category properties
    });
    const [redirect, setRedirect] = useState(false);
    const [errorText, setErrorText] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:3000/categories",
                categoryData, {withCredentials: true,});
                {
                    // Add any necessary headers for admin authorization
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

    if (redirect) {
        return <Navigate to="/" />;
    }


    return (
        <div>
            <h2>Create Category (Admin)</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={categoryData.category_name}
                        onChange={(e) =>
                            setCategoryData({ ...categoryData, category_name: e.target.value })
                        }
                    required/>
                </label>
                <br />
                <label>
                    Description:
                    <textarea
                        value={categoryData.description}
                        onChange={(e) =>
                            setCategoryData({ ...categoryData, description: e.target.value })
                        }required
                    ></textarea>
                </label>
                <br />
                {/* Add more form fields for other category properties */}
                <button type="submit">Create Category</button>
                <h6 className="error">{errorText}</h6>
            </form>
        </div>
    );
};

export default CreateCategory;
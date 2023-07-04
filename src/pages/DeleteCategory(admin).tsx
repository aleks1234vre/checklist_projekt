import axios from 'axios';
import  { useEffect, useState } from 'react';

const style = {
    height: "100%",
};
const DeleteCategory = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category_id, setCategory] = useState(1);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [description, setDescription] = useState("");
    const [errorText, setErrorText] = useState("");
    const getCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3000/categories');
            setCategories(response.data);
            if (response.data.length > 0) {
                setDescription(response.data[0].description);
            }
        } catch (error) {
            //
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleDelete = () => {
        setShowConfirmation(true);
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

    const confirmDelete = async () => {
        try {

            await axios.delete(`http://localhost:3000/categories/${category_id}`);
            console.log('Category deleted successfully');
            window.location.reload();
            getCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };



    return (
        <>
            {isAdmin?(<div>
                <h2 style={{ paddingLeft: "40%", paddingRight: "40%" }}>Delete Category (admin)</h2>
                <hr></hr>
                <form style={{ paddingLeft: "40%", paddingRight: "40%" }}>
        {categories.length > 0 ? (
            <div className="form-floating">   <select
                className="form-control"
                id="floatingSelect"
                placeholder="Category"
                onChange={(e) => {
                    const selectedCategory:any = categories.find(
                        (category:any) => category.id === Number(e.target.value)
                    );
                    setCategory(Number(e.target.value));
                    setDescription(selectedCategory?.description || "");

                }}
            >
                {categories.map((category: any, i=1) => (
                    <option value={category.id} key={i}>
                        {category.category_name}
                    </option>
                ))}
            </select>
                <label htmlFor="floatingSelect">Category</label>
            </div>
        ) : (
            <div>Loading categories...</div>
        )}

        <div className="form-floating d-grid">
                <textarea
                    className="form-control"
                    id="floatingContent"
                    placeholder="Category description"
                    style={style}
                    rows={6}
                    value={description}
                    readOnly
                    required
                ></textarea>
            <label htmlFor="floatingContent">Category description</label>
        </div>
        </form>
    <button style={{ marginLeft: "40%", marginRight: "40%" }} className="btn btn-danger mt-2" onClick={handleDelete}>
        Delete
    </button>
    {showConfirmation && (
        <div  className="popup" style={{ paddingLeft: "40%", paddingRight: "40%" }}>
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

            </div>):(
                <h6>{errorText}</h6>


            )
            }
        </>
    );
};

export default DeleteCategory;
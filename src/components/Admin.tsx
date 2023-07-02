const Admin = () => {

    return(
        <>
        <div className="dropdown">
            <button className="dropbtn">Admin</button>
            <div className="dropdown-content">
                <a href="/createcategory">Create Category</a>
                <a href="/editcategory">Edit Category</a>
                <a href="/deletecategory">  Delete category</a>
            </div>
        </div>
            </>
    )
}

export default Admin
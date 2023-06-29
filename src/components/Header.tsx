import axios from "axios";



const Header = () => {


    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/auth/logout', null, {withCredentials: true});
            localStorage.removeItem('hasCookie');
            window.location.href = '/';

        } catch (error) {
            //
        }
    };



    return (

        <>
            <div className="custom-navbar">
                    <div className="container d-flex justify-content-between align-items-center">
                        <a href="/" className="custom-home"  >
                            <strong>Home</strong>
                        </a>
                        <div>
                            {localStorage.getItem('hasCookie') ? (
                                <div>
                                    <button className="button_bigger"  onClick={handleLogout}>
                                        Logout
                                    </button>
                                    <button  className="button_bigger" onClick={() => (window.location.href = "/profile")}>
                                        Profile
                                    </button>
                                    <button className="button_bigger"   onClick={() => (window.location.href = "/tasksprofile")}>
                                        My tasks
                                    </button>
                                    <button className="button_bigger"  onClick={() => (window.location.href = "/createtask")}>
                                        New task
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <button className="button_bigger" onClick={() => (window.location.href = "/login")}>
                                        Login
                                    </button>
                                    <button className="button_bigger" onClick={() => (window.location.href = "/register")}>
                                        Register
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                </div>


        </>
    )


}
export default Header;
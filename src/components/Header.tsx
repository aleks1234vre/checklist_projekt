import axios from "axios";



const Header = () => {


    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/auth/logout', null, {withCredentials: true});
            localStorage.removeItem('hasCookie');
            window.location.href = '/';

        } catch (error) {
            // Handle error
        }
    };



    return (

        <>

            <div className="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
                <button className="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center"
                        id="bd-theme"
                        type="button"
                        aria-expanded="false"
                        data-bs-toggle="dropdown"
                        aria-label="Toggle theme (auto)">
                    <svg className="bi my-1 theme-icon-active" width="1em" height="1em">
                        <use href="#circle-half"></use>
                    </svg>
                    <span className="visually-hidden" id="bd-theme-text">Toggle theme</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text">
                    <li>
                        <button type="button" className="dropdown-item d-flex align-items-center"
                                data-bs-theme-value="light" aria-pressed="false">
                            <svg className="bi me-2 opacity-50 theme-icon" width="1em" height="1em">
                                <use href="#sun-fill"></use>
                            </svg>
                            Light
                            <svg className="bi ms-auto d-none" width="1em" height="1em">
                                <use href="#check2"></use>
                            </svg>
                        </button>
                    </li>
                    <li>
                        <button type="button" className="dropdown-item d-flex align-items-center"
                                data-bs-theme-value="dark" aria-pressed="false">
                            <svg className="bi me-2 opacity-50 theme-icon" width="1em" height="1em">
                                <use href="#moon-stars-fill"></use>
                            </svg>
                            Dark
                            <svg className="bi ms-auto d-none" width="1em" height="1em">
                                <use href="#check2"></use>
                            </svg>
                        </button>
                    </li>
                    <li>
                        <button type="button" className="dropdown-item d-flex align-items-center active"
                                data-bs-theme-value="auto" aria-pressed="true">
                            <svg className="bi me-2 opacity-50 theme-icon" width="1em" height="1em">
                                <use href="#circle-half"></use>
                            </svg>
                            Auto
                            <svg className="bi ms-auto d-none" width="1em" height="1em">
                                <use href="#check2"></use>
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>
            <header data-bs-theme="dark">
                <div className="collapse text-bg-dark" id="navbarHeader">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8 col-md-7 py-4">
                                <h4>About</h4>
                                <p className="text-body-secondary">Aplikacija za objavljanje blogov.</p>
                            </div>
                            <div className="col-sm-4 offset-md-1 py-4">
                                <h4>Meni</h4>
                                <ul className="list-unstyled">
                                    <li><a href="/" className="text-white">Home</a></li>
                                    <li><a href="/login" className="text-white">Login</a></li>
                                    <li><a href="/register" className="text-white">Register</a></li>
                                    <li><a href="/createtask" className="text-white">Create Task</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="navbar navbar-dark bg-dark shadow-sm">
                    <div className="container d-flex justify-content-between align-items-center">
                        <a href="/" className="navbar-brand d-flex align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                                 stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                 stroke-width="2"
                                 aria-hidden="true" className="me-2" viewBox="0 0 24 24">
                                <path
                                    d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                                <circle cx="12" cy="13" r="4"/>
                            </svg>
                            <strong>Album</strong>
                        </a>
                        <div>
                            {localStorage.getItem('hasCookie') ? (
                                <div>
                                    <button className="btn btn-bd-primary py-2 me-2" onClick={handleLogout}>
                                        Logout
                                    </button>
                                    <button className="btn btn-bd-primary py-2 me-2" onClick={() => (window.location.href = "/profile")}>
                                        Profile
                                    </button>
                                    <button className="btn btn-bd-primary py-2 me-2" onClick={() => (window.location.href = "/tasksprofile")}>
                                        My tasks
                                    </button>
                                    <button className="btn btn-bd-primary py-2 me-2" onClick={() => (window.location.href = "/createtask")}>
                                        New task
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <button className="btn btn-bd-primary py-2 me-2" onClick={() => (window.location.href = "/login")}>
                                        Login
                                    </button>
                                    <button className="btn btn-bd-primary py-2 me-2" onClick={() => (window.location.href = "/register")}>
                                        Register
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </header>

        </>
    )


}
export default Header;
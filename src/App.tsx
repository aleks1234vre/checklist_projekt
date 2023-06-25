import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Wrapper from "./components/Wrapper.tsx";
import CreateTask from "./pages/CreateTask.tsx";
import Profile from "./pages/profile.tsx";
import CreateCategoryAdmin from "./pages/CreateCategory(admin).tsx";
import TasksProfile from "./pages/TasksProfile.tsx";
import TaskView from "./pages/TaskView.tsx";

function App() {

  return (
      <>
        <Wrapper>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Home />} />
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/register'} element={<Register />} />
                    <Route path={'/createtask'} element={<CreateTask/>} />
                    <Route path={'/profile'} element={<Profile/>} />
                    <Route path={'tasksprofile'} element={<TasksProfile/>} />
                    <Route path={'createcategory'} element={<CreateCategoryAdmin/>} />
                    <Route path={'/task/:id'} element={<TaskView/>} />

                </Routes>
            </BrowserRouter>
        </Wrapper>
      </>
  )
}

export default App

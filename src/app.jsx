import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Register from "./Components/Register/index";
import Home from "./Components/Home/index";
import MyProfile from "./Components/MyProfile/index";
import Articles from "./Components/Articles/index";
import ShowArticle from "./Components/Articles/show";
import NewArticle from "./Components/Articles/new";
import LogIn from "./Components/LogIn/index";
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from "./mynavbar";
import './Styles/style.scss';
import "./Styles/dark-mode.css";
import LoggedInRoute from './Components/PrivateRoute/loggedinroute'
import LoggedOutRoute from './Components/PrivateRoute/loggedoutroute'
import PageNotFound from './Components/PageNotFound/index'
import {Navigate} from "react-router-dom";
import { useAtom} from "jotai";
import { darkModeAtom } from './Atoms/darkmode';


export default function App() {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };
  
  return (
    <BrowserRouter>
      <div className={darkMode ? "dark" : ""}>
        <MyNavbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/myprofile" element={<LoggedInRoute><MyProfile /></LoggedInRoute>} />
            <Route path="/articles/new" element={<LoggedInRoute><NewArticle /></LoggedInRoute>} />
            <Route path="/register" element={<LoggedOutRoute><Register /></LoggedOutRoute>} />
            <Route path="/login" element={<LoggedOutRoute><LogIn /></LoggedOutRoute>} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/article/:articleSlug" element={<ShowArticle />} />
            <Route path="/404" element={<PageNotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
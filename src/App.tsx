import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom';
import Kline from "./components/Kline";
import Login from "./components/Login";
import AboutMe from "./components/AboutMe";
import Register from "./components/Register"
import Main from './components/Main'
import React from "react";
import '../src/styles/main.scss'
import PageLayout from './components/PageLayout'
import ChangePassword from "./components/ChangePassword";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/" element={<PageLayout/>}>
                    <Route index element={<Main/>}/>
                    <Route path='/websocket' element={<Kline/>}/>
                    <Route path='/about' element={<AboutMe/>}/>
                    <Route path='/changePassword' element={<ChangePassword/>}/>
                </Route>
            </Routes>
        </Router>
    )
}
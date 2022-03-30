import React from 'react';
import ReactDOM from 'react-dom';
import '../src/styles/main.scss'
import Login from "./components/Login";
import Register from "./components/Register"
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Main from './components/Main'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/Main" element={<Main/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

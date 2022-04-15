import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
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
import { isHaveToken } from "./atoms/tokenAtom";
import { useRecoilValue } from "recoil";


export default function App() {
  const isHaveTokenState = useRecoilValue(isHaveToken)
  interface token {
    isAuthenticated:Boolean
  }
  const PrivateWrapper = (props:token) => {
    return props.isAuthenticated ? <PageLayout /> : <Navigate to="/login" />;
  };
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path='/changePassword'
               element={<ChangePassword/>}/>
        <Route element={<PrivateWrapper isAuthenticated={isHaveTokenState}/>}>
        <Route path="/">
          <Route index element={<Main/>}/>
          <Route path='/websocket'
                 element={<Kline/>}/>
          <Route path='/about'
                 element={<AboutMe/>}/>
        </Route>
        </Route>
      </Routes>
    </Router>
  )
}
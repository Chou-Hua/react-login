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
  // const jwt = localStorage.getItem('jwt')
  const isHaveTokenState = useRecoilValue(isHaveToken)
  // const isHaveToken = () => {
  //   console.log('jwt',jwt)
  //   console.log(jwt !== '' && jwt !== null && jwt !==undefined)
  //   return jwt !== '' && jwt !== null && jwt !==undefined
  // }
  interface token {
    isAuthenticated:Boolean
  }
  const PrivateWrapper = (props:token) => {
    console.log('token',props.isAuthenticated)
    return props.isAuthenticated ? <PageLayout /> : <Navigate to="/login" />;
  };
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route element={<PrivateWrapper isAuthenticated={isHaveTokenState}/>}>
        <Route path="/">
          <Route index element={<Main/>}/>
          <Route path='/websocket'
                 element={<Kline/>}/>
          <Route path='/about'
                 element={<AboutMe/>}/>
          <Route path='/changePassword'
                 element={<ChangePassword/>}/>
        </Route>
        </Route>
      </Routes>
    </Router>
  )
}
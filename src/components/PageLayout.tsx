import { Outlet } from 'react-router-dom';
import Header from './Header'
import React from "react";

const PageLayout = () => {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
};

export default PageLayout;
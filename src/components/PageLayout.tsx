import { Outlet } from 'react-router-dom';
import Header from './Header'
import React from "react";

const PageLayout = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
};

export default PageLayout;
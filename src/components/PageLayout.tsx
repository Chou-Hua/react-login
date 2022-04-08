import { Outlet } from 'react-router-dom';
import Header from './Header'

const PageLayout = () => (
    <div>
        <Header/>
        <Outlet/>
    </div>

);

export default PageLayout;
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import jwt_decode from "jwt-decode";


export default function Header() {
    let navigate = useNavigate();
    const logOut = () => {
        let path = '/'
        navigate(path)
    }
    const getAccountName = () => {
        const jwt = JSON.parse(JSON.stringify(localStorage.getItem('jwt')))
        const jwtJson: any = jwt_decode<Object>(jwt)
        return jwtJson?.sub;
    }
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Home
                    </Typography>
                    <AccountCircleIcon/>
                    <div className='home-user-name'>{getAccountName()}</div>
                    <div className="logout-button">
                        <Button color="inherit" onClick={logOut}>
                            LOGOUT
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>

    )
}

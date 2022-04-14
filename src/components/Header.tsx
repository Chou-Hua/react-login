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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useEffect } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from '@mui/material/Tooltip';
import { Details } from "@mui/icons-material";


export default function Header() {
    let navigate = useNavigate();

    interface LinkTabProps {
        label?: string;
        href?: string;
    }

    const logOut = () => {
        localStorage.setItem('jwt','')
        jumpPage('/login')
        handleMenuClose();
    }
    const changePassword = () => {
        jumpPage('/changePassword')
        handleMenuClose();
    }
    const getAccountName = () => {
        const jwt = JSON.parse(JSON.stringify(localStorage.getItem('jwt')))
        const jwtJson: any = jwt_decode<Object>(jwt)
        return jwtJson?.sub;
    }
    const [value, setValue] = React.useState(0);
    const navClick = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const jumpPage = (path: any) => {
        let jump = path;
        navigate(jump);
    }
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const isMenuOpen = Boolean(anchorEl);
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={changePassword}>ChangePassword</MenuItem>
            <MenuItem onClick={logOut}>LogOut</MenuItem>
        </Menu>
    );


    function LinkTab(props: LinkTabProps) {
        return (
            <Tab
                component="a"
                onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                    event.preventDefault();
                }}
                {...props}
            />
        );
    }

    useEffect(() => {
        switch (value) {
            case 0:
                jumpPage('/');
                break;
            case 1:
                jumpPage('/websocket');
                break;
            case 2:
                jumpPage('/about');
                break;

        }
    }, [value])
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
                        <Tabs
                            value={value}
                            onChange={navClick}
                            indicatorColor="secondary"
                            textColor="inherit"
                            aria-label="secondary tabs example"
                        >
                            <LinkTab label="Main"/>
                            <LinkTab label="Binance Kline"/>
                            <LinkTab label="About me"/>
                        </Tabs>
                    </Typography>
                    <Tooltip title='Details'>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        <AccountCircle/>
                    </IconButton>
                    </Tooltip>
                    <div className='home-user-name'>{getAccountName()}</div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>

    )
}

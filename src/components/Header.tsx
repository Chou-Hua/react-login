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
import { useRecoilState } from "recoil";
import { nowRoutePath } from "../atoms/tokenAtom";


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
    const [routePath,setRoutePath] = useRecoilState(nowRoutePath)
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
                setRoutePath('/');
                break;
            // {/*TODO Andy BinanceAPI*/}
            // case 1:
            //     jumpPage('/websocket');
            //     setRoutePath('/websocket');
            //     break;
            case 1:
                jumpPage('/about');
                setRoutePath('/about');
                break;

        }
    }, [value])
    return (
        <div>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography  component="div" sx={{flexGrow: 1}}>
                        <Tabs
                            value={value}
                            onChange={navClick}
                            indicatorColor="secondary"
                            textColor="inherit"
                            scrollButtons="auto"
                            allowScrollButtonsMobile
                        >
                            <LinkTab label="Main"/>
                            {/*TODO Andy BinanceAPI*/}
                            {/*<LinkTab label="Binance Kline"/>*/}
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
            <Toolbar/>
            {renderMenu}
        </div>

    )
}

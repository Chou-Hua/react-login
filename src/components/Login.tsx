import * as React from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import { Loading } from "./LoadingOverlay";

const Login = () => {
    let navigate = useNavigate();
    const [open, setOpen] = useState<any>(false);
    const [loadingOpen, setLoadingOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleLoadingOpen = () => setLoadingOpen(true);
    const handleLoadingClose = () => setLoadingOpen(false);
    const [account, setAccount] = useState<String | null>(null);
    const [password, setPassword] = useState<String | null>(null);
    const [isLogin, setIsLogin] = useState<Boolean | any>(false);
    const [failLogin, setFailLogin] = useState<String | null>(null);
    const accountHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredName = event.target.value.toString();
        setAccount(enteredName);
    };
    const passwordHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value.toString();
        setPassword(password);
    }
    const signIn = async () => {
        handleLoadingOpen();
        await loginApi();
        handleLoadingClose();
    }
    useEffect(() => {
        if (isLogin) {
            let path = '/Main'
            navigate(path)
        }
    }, [isLogin])
    const loginApi = async () => {
        let header = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        let body = {
            "account": account,
            "password": password
        }
        try {
            await fetch(
                'https://python-flask-chouhua.herokuapp.com/user/login',
                {
                    method: "POST",
                    headers: header,
                    body: JSON.stringify(body)
                })
                .then(response => {
                    if (response.status === 200) {
                        response.json()
                            .then(json => {
                                setIsLogin(json.success);
                                console.log(json.success);
                                console.log(json.status)
                                localStorage.setItem('jwt', json.access_token)
                            })
                    } else {
                        response.json()
                            .then(json => {
                                setFailLogin(json.error);
                                handleOpen();
                            })
                    }
                })

        } catch (err) {
            setFailLogin('Server is not open ')
            handleOpen();
        }
    }
    const register = (event: React.MouseEvent<HTMLButtonElement>) => {
        let path = '/register';
        navigate(path);
    }
    return (
        <div>
            <div>
                <Loading isLoading={loadingOpen}/>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <Box className="login-fail">
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                登入失敗！！！
                            </Typography>
                            <Typography id="transition-modal-description" sx={{mt: 2}}>
                                {failLogin}
                            </Typography>
                        </Box>
                    </Fade>
                </Modal>
            </div>
            <h3 className="login-page">
                Login Page
            </h3>
            <div className="account-button-class">
                <TextField
                    required
                    id="outlined-password-input"
                    label="Account"
                    type="text"
                    onChange={accountHandle}
                />
            </div>
            <div className="account-button-class">
                <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={passwordHandle}
                /></div>
            <div className="sign-in-button-div">
                <div>
                    <Button variant="contained" className="register-button" onClick={register}>
                        Register
                    </Button>
                    <Button variant="contained" onClick={signIn}>
                        Sign In
                    </Button>
                </div>
            </div>
        </div>
    )
}


export default Login;

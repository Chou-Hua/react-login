import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Register = () => {
    let navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [account, setAccount] = useState<String | null>(null);
    const [password, setPassword] = useState<String | null>(null);
    const [email, setEmail] = useState<String | null>(null);
    const [isRegister, setIsRegister] = useState<Boolean | null>(null);
    const [failRegister, setFailRegister] = useState<String | null>(null);
    const accountHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredName = event.target.value.toString();
        setAccount(enteredName);
    };
    const passwordHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value.toString();
        setPassword(password);
    }
    const emailHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const email = event.target.value.toString();
        setEmail(email);
    }
    const loginPage = () => {
        let path = '/'
        navigate(path)
    }
    useEffect(() => {
        if (isRegister) {
            let path = '/'
            navigate(path)
        }
    }, [isRegister])
    const registerAccount = async () => {
        await createAccountApi();
    }
    const createAccountApi = async () => {
        let header = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        let body = {
            "account": account,
            "email": email,
            "password": password
        }
        try {
            await fetch(
                'https://python-flask-chouhua.herokuapp.com/user/add',
                {
                    method: "POST",
                    headers: header,
                    body: JSON.stringify(body)
                })
                .then(response => {
                    if (response.status === 200) {
                        response.json()
                            .then(json => {
                                setIsRegister(json.success);
                            })
                    } else {
                        response.json()
                            .then(json => {
                                setFailRegister(json.error);
                                handleOpen();
                            })
                    }
                })

        } catch (err) {
            setFailRegister('Server is not open ')
            handleOpen();
        }
    }
    return (
        <div>
            <div>
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
                                帳號申請失敗！！！
                            </Typography>
                            <Typography id="transition-modal-description" sx={{mt: 2}}>
                                {failRegister}
                            </Typography>
                        </Box>
                    </Fade>
                </Modal>
            </div>
            <h3 className="login-page">
                Register
            </h3>
            <div className="account-button-class">
                <TextField
                    id="outlined-password-input"
                    label="Account"
                    type="text"
                    onChange={accountHandle}
                />
            </div>
            <div className="account-button-class">
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    onChange={passwordHandle}
                />
            </div>
            <div className="account-button-class">
                <TextField
                    id="outlined-password-input"
                    label="email"
                    type="email"
                    onChange={emailHandle}
                />
            </div>
            <div className="text-center">
                <Button onClick={loginPage} className="login-button">
                    LogIn
                </Button>
                <Button variant="contained" onClick={registerAccount}>
                    Apply
                </Button>
            </div>
        </div>
    )
}
export default Register;
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
import * as Yup from "yup";
import { useFormik } from "formik";
import { isHaveToken, loginAccount } from "../atoms/tokenAtom";
import { useRecoilState } from "recoil";
import jwt_decode from "jwt-decode";

const Login = () => {
  let navigate = useNavigate();
  const [open, setOpen] = useState<any>(false);
  const [loadingOpen, setLoadingOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleLoadingOpen = () => setLoadingOpen(true);
  const handleLoadingClose = () => setLoadingOpen(false);
  const [isHaveTokenState, setIsHaveTokenState] = useRecoilState(isHaveToken)
  const [loginAccountName, setLoginAccountName] = useRecoilState(loginAccount)
  const validationSchema = Yup.object({
    account: Yup.string()
      .min(4, '名稱長度至少為4')
      .required('必填'),
    password: Yup.string()
      .test("passwordCheck", "密碼須包含大小寫字母且長度為8", (value: any) => {
        if (formik.values.account === 'admin') {
          return true;
        }
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)
      })
      .required('必填')
  });
  const formik = useFormik({
    initialValues: {
      account: 'admin',
      password: '0000',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      signIn().then();
    },
  });
  const [isLogin, setIsLogin] = useState<Boolean | any>(false);
  const [failLogin, setFailLogin] = useState<String | null>(null);
  const signIn = async () => {
    handleLoadingOpen();
    await loginApi();
    handleLoadingClose();
  }
  const getAccountName = () => {
    const jwt = JSON.parse(JSON.stringify(localStorage.getItem('jwt')))
    const jwtJson: any = jwt_decode<Object>(jwt)
    return jwtJson?.sub;
  }
  useEffect(() => {
    if (isLogin) {
      setIsHaveTokenState(true);
      setLoginAccountName(getAccountName());
      let path = '/'
      navigate(path)
    }
  }, [isLogin])
  const loginApi = async () => {
    let header = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
    let body = {
      "account": formik.values.account,
      "password": formik.values.password
    }
    try {
      await fetch(
        'https://python-flask-chouhua.onrender.com/user/login',
        {
          method: "POST",
          headers: header,
          body: JSON.stringify(body)
        })
        .then(response => {
          if (response.status === 200) {
            response.json()
              .then(json => {
                localStorage.setItem('jwt', json.access_token)
                setIsLogin(json.success);
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
    <div className='login-page-main'>
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
      <div className='login-page-component'>
        <h3 className="login-page-title">
          Login Page
        </h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="account-button-class">
            <TextField
              required
              value={formik.values.account}
              id="outlined-password-input"
              name="account"
              label="Account"
              type="text"
              onChange={formik.handleChange}
              error={formik.touched.account && Boolean(formik.errors.account)}
              helperText={formik.touched.account && formik.errors.account}
            />
          </div>
          <div className="account-button-class">
            <TextField
              required
              id="outlined-password-input"
              value={formik.values.password}
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            /></div>
          <div className="sign-in-button-div">
            <div>
              <Button variant="contained" className="register-button" onClick={register}>
                Register
              </Button>
              <Button variant="contained" type="submit">
                Sign In
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}


export default Login;

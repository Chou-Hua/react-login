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
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const registerAccount = async () => {
    await createAccountApi();
  }
  const createAccountApi = async () => {
    let header = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
    let body = {
      "account": formik.values.account,
      "email": formik.values.email,
      "password": formik.values.password,
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
  const validationSchema = Yup.object({
    account: Yup.string()
      .min(4, '名稱長度至少為4')
      .required('必填'),
    password: Yup.string()
      .test("passwordCheck", "密碼須包含大小寫字母且長度為8", (value: any) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)
      })
      .required('必填'),
    email: Yup.string()
      .email('email格式錯誤')
      .required('必填'),
  });
  const formik = useFormik({
    initialValues: {
      account: '',
      password: '',
      email: ''
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      registerAccount().then();
    },
  });
  const [isRegister, setIsRegister] = useState<Boolean | null>(null);
  const [failRegister, setFailRegister] = useState<String | null>(null);
  const loginPage = () => {
    let path = '/login'
    navigate(path)
  }
  useEffect(() => {
    if (isRegister) {
      let path = '/login'
      navigate(path)
    }
  }, [isRegister])

  return (
    <div className='login-page-main'>
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
      <div className='login-page-component'>
        <h3 className="login-page-title">
          Register
        </h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="account-button-class">
            <TextField
              id="outlined-password-input"
              label="Account"
              value={formik.values.account}
              name="account"
              type="text"
              onChange={formik.handleChange}
              error={formik.touched.account && Boolean(formik.errors.account)}
              helperText={formik.touched.account && formik.errors.account}
            />
          </div>
          <div className="account-button-class">
            <TextField
              id="outlined-password-input"
              label="Password"
              name="password"
              value={formik.values.password}
              type="password"
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </div>
          <div className="account-button-class">
            <TextField
              id="outlined-password-input"
              label="email"
              type="email"
              value={formik.values.email}
              name="email"
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>
          <div className="text-center">
            <Button onClick={loginPage} className="login-button">
              LogIn
            </Button>
            <Button variant="contained" type="submit">
              Apply
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Register;
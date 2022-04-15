import { TextField } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRecoilState, useRecoilValue } from "recoil";
import { isHaveToken, loginAccount, nowRoutePath } from "../atoms/tokenAtom";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Loading } from "./LoadingOverlay";
import { isChangePassword } from "../atoms/tokenAtom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const validationSchema: any = Yup.object({
    oldPassword: Yup.string()
      .min(8, '密碼長度需大於8')
      .required('Password is required'),
    newPassword: Yup.string()
      .test("passwordCheck", "密碼須包含大小寫字母且長度為8", (value: any) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)
      })
      .test('oldNewCheck', "新舊密碼不得一致", (value: any) => {
        return !(value === formik.values.oldPassword)
      })
      .required('Password is required'),
    againPassword: Yup.string()
      .when('newPassword', (newPassword, schema) => {
        return newPassword ? schema.oneOf([newPassword], '密碼需相同').required() : schema
      }),
  });
  const [loadingOpen, setLoadingOpen] = React.useState(false);
  const handleLoadingOpen = () => setLoadingOpen(true);
  const handleLoadingClose = () => setLoadingOpen(false);
  const [isChangePasswordState, setIsChangeStatePassword] = useRecoilState(isChangePassword)
  const [isHaveTokenState, setIsHaveTokenState] = useRecoilState(isHaveToken)
  const loginAccountName = useRecoilValue(loginAccount);
  const [open, setOpen] = React.useState(false);
  const routePath: string = useRecoilValue(nowRoutePath)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    if (isChangePasswordState) {
      setIsHaveTokenState(false);
      loginPage();
    }
  };
  const jumpPage = () => {
    let jump = routePath;
    navigate(jump);
  }
  const [responseText, setResponseText] = useState(null);
  const loginPage = () => {
    let path = '/login';
    navigate(path);
  }
  const changePassword = async () => {
    let header = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
    let body = {
      "account": loginAccountName,
      "oldPassword": formik.values.oldPassword,
      "newPassword": formik.values.newPassword
    }
    try {
      await fetch(
        'https://python-flask-chouhua.herokuapp.com/user/changePassword',
        {
          method: "PUT",
          headers: header,
          body: JSON.stringify(body)
        })
        .then(response => {
          if (response.status === 200) {
            response.json()
              .then(json => {
                setIsChangeStatePassword(true);
                setResponseText(json.success);
                handleOpen();
              })
          } else {
            response.json()
              .then(json => {
                setResponseText(json.error);
                handleOpen();
              })
          }
        })

    } catch (err) {
    }
  }
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      againPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleLoadingOpen();
      await changePassword();
      handleLoadingClose();
    },
  });

  return (
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
            <Typography id="transition-modal-description" sx={{mt: 2}}>
              {responseText}
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <div className="pt-20">
        <form onSubmit={formik.handleSubmit}>
          <div className="account-button-class">
            <h1> Change Password</h1>
            <TextField
              required
              name="oldPassword"
              id="outlined-password-input"
              value={formik.values.oldPassword}
              label="Old Password"
              type="password"
              onChange={formik.handleChange}
              error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
              helperText={formik.touched.oldPassword && formik.errors.oldPassword}
            />
          </div>
          <div className="account-button-class">
            <TextField
              required
              value={formik.values.newPassword}
              name="newPassword"
              id="outlined-password-input"
              label="New Password"
              type="password"
              onChange={formik.handleChange}
              error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
              helperText={formik.touched.newPassword && formik.errors.newPassword}
            />
          </div>
          <div className="account-button-class">
            <TextField
              required
              name="againPassword"
              value={formik.values.againPassword}
              id="outlined-password-input"
              label="Again Password"
              type="password"
              onChange={formik.handleChange}
              error={formik.touched.againPassword && Boolean(formik.errors.againPassword)}
              helperText={formik.touched.againPassword && formik.errors.againPassword}
            />
          </div>
          <div className="account-button-class">
            <Button onClick={jumpPage}>
              Back
            </Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
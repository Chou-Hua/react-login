import { TextField } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ChangePassword = ()=>{
  const validationSchema = Yup.object({
    oldPassword: Yup.string()
      .min(8, '密碼長度需大於8')
      .required('Password is required'),
    newPassword: Yup.string()
      .test("passwordCheck","密碼須包含大小寫字母且長度為8",(value:any)=>{
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)
      })
      .required('Password is required'),
    againPassword: Yup.string()
      .when('newPassword', (newPassword, schema) => {return newPassword ? schema.oneOf([newPassword], '密碼需相同').required() : schema}),
  });
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      againPassword:''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
    return(
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
                    // onChange={oldPasswordHandle}
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
                    // onChange={newPasswordHandle}
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
                  // onChange={newAgainPasswordHandle}
                />
            </div>
            <div className="account-button-class">
            <Button variant="contained" type="submit">
                Submit
            </Button>
            </div>
          </form>
        </div>
    )
}

export default ChangePassword
import { TextField } from "@mui/material";
import * as React from "react";
import { useState } from "react";

const ChangePassword = ()=>{
    const [oldPassword, setOldPassword] = useState<String | null>(null);
    const oldPasswordHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const oldPassword = event.target.value.toString();
        setOldPassword(oldPassword);
    };
    const [newPassword, setNewPassword] = useState<String | null>(null);
    const newPasswordHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value.toString();
        setOldPassword(newPassword);
    };
    return(
        <div>
            <div className="account-button-class">
                <TextField
                    required
                    id="outlined-password-input"
                    label="Old Password"
                    type="text"
                    onChange={oldPasswordHandle}
                />
            </div>
            <div className="account-button-class">
                <TextField
                    required
                    id="outlined-password-input"
                    label="New Password"
                    type="text"
                    onChange={newPasswordHandle}
                />
            </div>
        </div>
    )
}

export default ChangePassword
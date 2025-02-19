import React, { useState } from "react";
import { 
  Box, Typography, Grid, Card, CardContent, Avatar, Button, 
  Dialog, DialogTitle, DialogContent, DialogActions, TextField 
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CommonModal from "../../../Components/Common/CommonModal";
import { changePwd } from "../../../store/redux/thunks";

function MyAccount() {
  const user = useSelector((state) => state.user.user);

  // State for password change dialog
  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  // Open/Close Dialog
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  };
  console.log("userererere",user);


  // Handle Password Change
  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    const credentials = { _id:user._id, oldPassword, newPassword };
    dispatch(changePwd(credentials))
    handleClose(); 
  };

  return (
    <Box
      maxWidth="800px"
      mx="auto"
      p={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Avatar sx={{ width: 80, height: 80, bgcolor: "#0c831f", mb: 2 }}>
        {user?.name?.charAt(0).toUpperCase()}
      </Avatar>

      <Typography variant="h5" color="#0c831f" fontWeight="bold">
        Welcome, {user?.name}
      </Typography>

      {/* User Details Card */}
      <Card sx={{ mt: 3, width: "100%", p: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Name:
              </Typography>
              <Typography color="textSecondary">{user?.name || "N/A"}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Email:
              </Typography>
              <Typography color="textSecondary">{user?.email || "N/A"}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Phone Number:
              </Typography>
              <Typography color="textSecondary">+91 {user?.number || "N/A"}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Password:
              </Typography>
              <Typography color="textSecondary">********</Typography>
              <Button 
                variant="outlined" 
                className="button"
                color="primary" 
                size="small" 
                sx={{ mt: 1 }} 
                onClick={handleOpen}
              >
                Change Password
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <CommonModal open={open} handleClose={handleClose} handleSubmit={handleChangePassword} header="Change Password" buttonTitle={"Change Password"}>
        <TextField
            margin="dense"
            label="Old Password"
            type="password"
            fullWidth
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Confirm New Password"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" mt={1}>
              {error}
            </Typography>
          )}
      </CommonModal>
    </Box>
  );
}

export default MyAccount;

import React, {  useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, FormControl, Grid, InputLabel, OutlinedInput, Button, Typography, FormHelperText, Paper } from '@mui/material';
import { createUser, getMe, login,logout, userLogin } from '../../store/redux/thunks';
import { showError, showSuccess } from '../../Assets/Constants/showNotifier';
export default function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [mode, setMode] = useState("login"); 
  const user = useSelector((state)=>state.user.user);
  const [data, setData] = useState({
        email: "",
        name: "",
        password: "",
        number: "",
        role: "user", 
    });
    const [errors, setErrors] = useState({
        email: "",
        name: "",
        password: "",
        number: "",
    });
    const handleReset = () => {setData({
        email: "",
        name: "",
        password: "",
        number: "",
        role: "user", 
    })}

    const handleChange = (key, val) => {
        if(key == 'number' && val.length > 10){
            return;
        }
        setData((prev) => ({ ...prev, [key]: val }));
        setErrors((prev) => ({ ...prev, [key]: "" })); 
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhoneNumber = (number) => {
        return /^\d{10}$/.test(number);
    };

    const handleSubmit = async () => {
        const { email, password, number, role, name } = data;
        let valid = true;
        let newErrors = { email: "", password: "", number: "", name:"" };

        if (!email) {
            newErrors.email = "Email is required";
            valid = false;
        } else if (!validateEmail(email)) {
            newErrors.email = "Enter a valid email";
            valid = false;
        }

        if (!password) {
            newErrors.password = "Password is required";
            valid = false;
        }
        
        if (mode === "register") {
            
            if (!name) {
                newErrors.name = "Name is required";
                valid = false;
            }
            if (!number) {
                newErrors.number = "Phone number is required";
                valid = false;
            } else if (!validatePhoneNumber(number)) {
                newErrors.number = "Phone number must be 10 digits";
                valid = false;
            }
        }

        if (!valid) {
            setErrors(newErrors);
            return;
        }

        if (mode === "register") {
            if (!number) return showError("Phone number is required");

            const userData = { email, password, number, role, name };
            await dispatch(createUser(userData)); // Call register API here
        } else {
            const credentials = { email, password };
            await dispatch(userLogin(credentials)); // Call login API
        }
        handleReset();
        setMode('login')
    };


    useEffect(()=>{
        if(user) navigate('/user-media') 
    },[user])
    
    return (
        <Box 
            sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh', 
            }}
        >
            <Paper 
                elevation={3} 
                sx={{ 
                    padding: '2rem', 
                    width: '400px', 
                    textAlign: 'center' 
                }}
            >
                <Typography variant="h5" gutterBottom>
                    {mode != "register" ? 'Login' : 'Register'}
                </Typography>
               <Box fullWidth>
                    <Grid container spacing={2}>
                        {mode === "register" && (
                            <Grid item xs={12}>
                                <FormControl fullWidth error={!!errors.email}>
                                    <InputLabel>Name</InputLabel>
                                    <OutlinedInput
                                        value={data.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        label="Name"
                                        type='name'
                                    />
                                    {errors.name && <FormHelperText>{errors.name}</FormHelperText>}
                                </FormControl>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <FormControl fullWidth error={!!errors.email}>
                                <InputLabel>Email</InputLabel>
                                <OutlinedInput
                                    value={data.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    label="Email"
                                    type='email'
                                />
                                {errors.email && <FormHelperText>{errors.email}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth error={!!errors.password}>
                                <InputLabel>Password</InputLabel>
                                <OutlinedInput
                                    value={data.password}
                                    onChange={(e) => handleChange('password', e.target.value)}
                                    label="Password"
                                    type='password'
                                />
                                {errors.password && <FormHelperText>{errors.password}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        {mode === "register" && (
                            <>
                                <Grid item xs={12}>
                                    <FormControl fullWidth error={!!errors.number}>
                                        <InputLabel>Phone Number</InputLabel>
                                        <OutlinedInput
                                            value={data.number}
                                            onChange={(e) => handleChange('number', e.target.value)}
                                            label="Phone Number"
                                            type='number'
                                        />
                                        {errors.number && <FormHelperText>{errors.number}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                            </>
                        )}

                        {/* Toggle between Login and Register */}
                        <Grid item xs={12} textAlign="center">
                            <Typography variant="body2">
                                {mode === "login" ? "Don't have an account?" : "Already have an account?"} 
                                <Button onClick={() => setMode(mode === "login" ? "register" : "login")} color="primary">
                                    {mode === "login" ? "Register" : "Login"}
                                </Button>
                            </Typography>
                        </Grid>
                    </Grid>
                <Button 
                    fullWidth 
                    variant="contained" 
                    color="primary" 
                    sx={{ marginTop: '1rem' }}
                    onClick={handleSubmit}
                >
                    {mode !== "register"  ? 'Login' : 'Register'}
                </Button>
                </Box>
            </Paper>
        </Box>
    );
}

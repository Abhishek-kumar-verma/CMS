import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {Link } from 'react-router-dom'
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { error } from "console";

const defaultTheme = createTheme();



// TODO remove, this demo shouldn't need to reset the theme.

interface IFromInput {
  firstName: string;
  lastName: string,
  email: string,
  password: string,
  confirmPassword : string
}

const schema = yup.object().shape({
  email : yup.string().required().email(),
  firstName : yup.string().required().min(2).max(25),
  lastName : yup.string().required().min(2).max(25),
  password : yup.string().required() 
  .min(
    8,
    'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special'
  ).max(25),
  confirmPassword : yup.string().required('password must match').min(8).max(25),
  // .minLowercase(1, 'password must contain at least 1 lower case letter')
  // .minUppercase(1, 'password must contain at least 1 upper case letter')
  // .minNumbers(1, 'password must contain at least 1 number')
  // .minSymbols(1, 'password must contain at least 1 special character')
})

function Register() {
  
  const { register, handleSubmit, formState: { errors }, } = useForm<IFromInput>({
    resolver : yupResolver(schema)
  });
  const [ data , setData] = useState<IFromInput>();
  
  const formSubmit = (data : IFromInput): void => {
    console.log(JSON.stringify(data));
    setData(data);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper
          sx={{
            height: "90vh", // Set height to 100% of the viewport height
                    display: "flex",
                    padding:'10px',
                    margin:"20px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(formSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                { ...register("firstName")}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  helperText={errors.firstName?.message}
                  error={ !!errors.firstName?.message}
                  id="firstName"
                  label="First Name"
                  autoFocus
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                { ...register("lastName")}
                  required
                  fullWidth
                  helperText={errors.lastName?.message}
                  error={ !!errors.lastName?.message}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                { ...register("email")}
                  required
                  fullWidth
                  helperText={errors.email?.message}
                  error={ !!errors.email?.message}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                { ...register("password")}
                  required
                  fullWidth
                  helperText={errors.password?.message}
                  error={ !!errors.password?.message}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                { ...register("confirmPassword")}
                  required
                  fullWidth
                  helperText={errors.confirmPassword?.message}
                  error={ !!errors.confirmPassword?.message}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to='/signin'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
export default Register;
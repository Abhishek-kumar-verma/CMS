import * as React from "react";
import { useForm } from "react-hook-form";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { FacebookProvider, LoginButton, useLogin } from "react-facebook";
// import { useNavigate} from 'react-router-dom';
import jwt_decode from "jwt-decode";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Divider, Paper } from "@mui/material";
// import "./style.css";
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
interface IFromInput {
    email: string;
    password: string;
}
export default function Login() {
    // const navigate = useNavigate();
    const clientID: any = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    console.log(clientID);
    const { login, status, isLoading, error } = useLogin();
    const { register, handleSubmit } = useForm<IFromInput>();

    const onSubmit = (data: IFromInput) => {
        console.log(data);
        // navigate("/dashboard");
    };
    const googleSuccess = async (res: any) => {
        const token = res?.clientId;
        const result = jwt_decode(res.credential);
        console.log(result);
    };
    const handleLogin = async () => {
        try {
            const response = await login({
                scope: "email",
            });

            console.log(response.status);
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Paper
                    sx={{
                    height: "90vh", // Set height to 100% of the viewport height
                    display: "flex",
                    padding:'30px',
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
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        {...register("email")}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        {...register("password")}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Grid
                        container
                        sx={{ mt: 3, mb: 1, display: "flex", alignItem: "center" }}
                    >
                        <Grid item xs>
                            <Link to="/forgotPassword">Forgot password?</Link>
                        </Grid>
                        <Grid item>
                            <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Divider variant="middle" />
                    <Box textAlign="center">Or</Box>
                    <GoogleOAuthProvider clientId={clientID}>
                        <GoogleLogin
                            onSuccess={googleSuccess}
                            onError={() => {
                                console.log("Login Failed");
                            }}
                        />
                    </GoogleOAuthProvider>
                    <Button
                        onClick={handleLogin}
                        disabled={isLoading}
                        color="primary"
                        variant="contained"
                        sx={{ width: "100%", marginTop: "10px" }}
                    >
                        Login via Facebook
                    </Button>
                    {/* </FacebookProvider> */}
                </Box>
            </Paper>
        </Container>
    </ThemeProvider >
  );
}

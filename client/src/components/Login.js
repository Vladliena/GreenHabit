import { AppContext } from "../App";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ThreeDots } from 'react-loader-spinner'
import '../Login.css'


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Green Habit
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const defaultTheme = createTheme();

export const SignIn = (props) => {
    const [username, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const {setToken} = useContext(AppContext);
    const [loader, setLoader] = useState(false)

    const navigate = useNavigate()


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoader(true)
        try {
            const res = await axios.post("/api/users/login", {
                username,
                password,
            });
            if (res.status === 200) {
                setMessage("");
                setToken(res.data);
                setLoader(false)
                navigate("/profile");
            }
        } catch (err) {
            setLoader(false)
            setMessage(err.response.data.msg);
        }
    };

    return (
        <>
            {loader ?
                (<div style={{ padding: '80px 200px', backgroundColor: '#BFAFF2', display: "flex", flexDirection: "column", backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} >
                    <div style={{ margin: 'auto', display: "flex", flexDirection: "column", padding: '200px' }} >
                    <h1 style={{ margin: 'auto', color: 'rgba(255, 255, 255, 1)', marginBottom: '20px' }}>Login</h1>
                    <ThreeDots
                        height="100"
                        width="300"
                        radius="9"
                        color="#AA4E78"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                        /></div>
                        </div>) :
                (<ThemeProvider theme={defaultTheme}>
                    <Container component="main" maxWidth="xs" style={{ paddingTop: '80px' }}>
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                            className="login-container"
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {props.title}
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/register" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                        <div><p>{message}</p></div>
                        <Copyright sx={{ mt: 8, mb: 4 }} />
                    </Container>
                </ThemeProvider>)}</>
    );
}
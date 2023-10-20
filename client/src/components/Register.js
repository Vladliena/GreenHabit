import { AppContext } from "../App";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ThreeDots } from 'react-loader-spinner'
import '../Register.css'

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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoader(true)
        try {
            const res = await axios.post("/api/users/register", {
                first_name,
                last_name,
                username,
                email,
                password,
            });
            if (res.status === 200) {
                setMessage("");
                await sendEmail(email, username);
                setLoader(false)
                navigate("/login");
            }
        } catch (err) {
            setLoader(false)
            setMessage(err.response.data.msg);
        }
    };

    const sendEmail = async (toEmail, toUsername) => {
        try {
            const res = await axios.post("/api/send-email", { to: toEmail, username: toUsername });
            if (res.status === 200) {
                console.log("Email sent successfully");
            }
        } catch (err) {
            console.error("Email sending failed: ", err);
        }
    };

    return (
        <>
            {
                loader ?
                    (<div style={{ padding: '80px 200px', backgroundColor: '#BFAFF2', display: "flex", flexDirection: "column", backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} >
                        <div style={{ margin: 'auto', display: "flex", flexDirection: "column", padding: '200px' }} >
                            <h1 style={{ margin: 'auto', color: 'rgba(255, 255, 255, 1)', marginBottom: '20px' }}>Registering a new Eco-friend 😊</h1>
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
                    </div >) :
                    (<ThemeProvider theme={defaultTheme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                                className="register-container"
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign up
                                </Typography>
                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="given-name"
                                                name="firstName"
                                                required
                                                fullWidth
                                                id="firstName"
                                                label="First Name"
                                                autoFocus
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="lastName"
                                                label="Last Name"
                                                name="lastName"
                                                autoComplete="family-name"
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="username"
                                                label="Username"
                                                name="username"
                                                autoComplete="username"
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                autoComplete="new-password"
                                                onChange={(e) => setPassword(e.target.value)}
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
                                            <Link href="/login" variant="body2">
                                                Already have an account? Sign in
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                            <Copyright sx={{ mt: 5 }} />
                        </Container>
                    </ThemeProvider>)}</>
    );
};
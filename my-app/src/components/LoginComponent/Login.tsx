import * as React from 'react';
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
import axios from 'axios';
import { useState } from 'react';
import Signup from '../SignupComponent/Signup';
import LandingPage from '../LandingPage/LandingPage';
import { LoggedInContext } from "../LoggedInContext";
import { Alert } from '@mui/material';


const theme = createTheme();

const Login = () => {

    const [name, setName] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const [signup, setSignup] = useState(false);
    const [wrongCredentials, setWrongCredentials] = useState(false);

    const { isLoggedIn, setIsLoggedIn, userId, setUserId } = React.useContext(LoggedInContext);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(name);
        console.log(password);
        let response = await axios.get(`http://localhost:8080/api/user/name/${name}/${password}`);
        
        response.data.name === name && 
        response.data.password === password ? 
            setIsLoggedIn(true) : setWrongCredentials(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const handleSignUp = () => {
      setSignup(true);
  }

  return (
    <div>
      {isLoggedIn && <LandingPage />}
      {signup && <Signup />}
      {!signup && (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Username"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={handleNameChange}
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
                onChange={handlePasswordChange}
              />
              { wrongCredentials && (
                <Alert severity="error">The credentials you typed is not correct... Try again!</Alert>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
                <Grid item>
                  <Link href="#" variant="body2" onClick={handleSignUp}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      )}
    </div>
  );
}

export default Login;
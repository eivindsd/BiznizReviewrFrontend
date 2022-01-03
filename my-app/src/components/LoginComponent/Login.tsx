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
import { LoggedInContext } from "../LoggedInContext";


const theme = createTheme();

const Login = () => {

    const [name, setName] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const [signup, setSignup] = useState(false);

    const { loggedIn} = React.useContext(LoggedInContext);

    console.log(loggedIn);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setName(data.get("name")?.toString());
        setPassword(data.get("password")?.toString());
        // eslint-disable-next-line no-console
        
        //let response = await axios.get(`http://localhost:8080/api/user/name/Chris/xJjCavfqrkpbYbXhDxVX`);
        let response = await axios.get(`http://localhost:8080/api/user/name/${name}/${password}`);
        console.log(response.data.name);
        console.log(response.data.password);
        
        (response.data.name === name && response.data.password === password ? console.log("yey") : console.log("ney")); 

  };

  const handleSignUp = () => {
        setSignup(true);
  }

  return (
    <div>
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
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
                <Grid item>
                  <Link href="#" variant="body2" onClick={() => handleSignUp()}>
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
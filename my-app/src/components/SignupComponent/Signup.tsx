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
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from '../LoginComponent/Login';
import axios from 'axios';

const theme = createTheme();

const Signup = () => {

    const [name, setName] = React.useState<string | undefined>();
    const [password, setPassword] = React.useState<string | undefined>();
    const [login, setLogin] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [userId, setUserId] = React.useState<string | undefined>();
    const [missingCredentials, setMissingCredentials] = React.useState(false);
    
    React.useEffect(() => {
      generateUUID();
    }, [])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(typeof name === 'undefined' 
        || name.length === 0 
        || typeof password === 'undefined'
        || password.length === 0) {
          setMissingCredentials(true);
        } else {
          setMissingCredentials(false);
          axios.post(`http://localhost:8080/api/user`, {
            userId: userId,
            name: name,
            password: password
        }).then(
            function(response) {
                response.status === 201 ? setOpen(true) : setOpen(false);
            }
        )
        }
      };

      const generateUUID = () => {
        setUserId(Math.floor(Math.random() * 10000000000000000000).toString());
      }

      const handleLogin = () => {
          setLogin(true);
      }

      const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
      };
    
      const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
      };


    return (
    <div>
        {login && <Login />}
        {!login && (
            <ThemeProvider theme={theme}>
              <Box sx={{ width: '100%' }}>
                <Collapse in={open}>
                    <Alert
                        action={
                          <Button color="inherit" onClick={() => handleLogin()}>Log in</Button>}
                        sx={{ mb: 2 }}>
                        Successfully created user!
                    </Alert>
                </Collapse>
            </Box>
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Username"
                  name="name"
                  autoComplete="name"
                  onChange={handleNameChange}
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
                  onChange={handlePasswordChange}
                />
                { missingCredentials && (
                <Alert severity="error">You must enter both username and password...</Alert>
              )}
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
                <Link href="#" variant="body2" onClick={() => handleLogin()}>
                  Already have an account? Log in
                </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    )}  
    </div>
    );
};

export default Signup;
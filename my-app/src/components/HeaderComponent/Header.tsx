import React, { useContext }  from 'react';
import { LoggedInContext } from "../LoggedInContext";
import Typography from '@mui/material/Typography';
import { Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";

const Header = () => {
    const { setIsLoggedIn, userId, userName } = useContext(LoggedInContext);
    
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            BiznizReviewr
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                           userId: {userId}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                           name: {userName}
                        </Typography>
                        <Button color="inherit"><Link to="/stats">Stats</Link></Button>
                        <Button color="inherit" onClick={() => setIsLoggedIn(false)}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
};

export default Header;
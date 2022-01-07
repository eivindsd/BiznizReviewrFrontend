import { useContext }  from 'react';
import { LoggedInContext } from "../LoggedInContext";
import Typography from '@mui/material/Typography';
import { Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";

const Header = () => {
    const { setAdmin, setIsLoggedIn, userId, userName, isAdmin } = useContext(LoggedInContext);
    
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                            <Link to={`/`} style={{ textDecoration: 'none', color: 'white' }}>BiznizReviewr</Link>
                        </Typography>
                        
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                           {isAdmin ? "admin" : ""}
                        </Typography>
                        <Button color="inherit"><Link to={`/user/${userId}`} style={{ textDecoration: 'none', color: 'white' }}>{userName}</Link></Button>
                        <Button color="inherit"><Link to="/stats" style={{ textDecoration: 'none', color: 'white' }}>Stats</Link></Button>
                        <Button color="inherit" onClick={() => {setIsLoggedIn(false); setAdmin(false);}}><Link to={`/`} style={{ textDecoration: 'none', color: 'white' }}>Logout</Link></Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
};

export default Header;


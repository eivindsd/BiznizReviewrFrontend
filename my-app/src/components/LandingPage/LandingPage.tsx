import React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Header from '../HeaderComponent/Header';


const LandingPage = () => {
    const [open, setOpen] = React.useState(true);

    return (
        <div>
            <Header />
            <Box sx={{ width: '100%' }}>
                <Collapse in={open}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                setOpen(false);
                                }}>
                                <CloseIcon fontSize="inherit" />
                            </IconButton>}
                        sx={{ mb: 2 }}>
                        Successfully logged in!
                    </Alert>
                </Collapse>
            </Box>
        </div>
    );
};

export default LandingPage;
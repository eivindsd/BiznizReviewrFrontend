import { useState } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Header from '../HeaderComponent/Header';
<<<<<<< HEAD
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { IUser } from '../UserComponent/UserComponentInterface';
import { IBusiness } from '../BusinessComponent/BusinessInterface';
import { LandingPageUser } from './LandingPageUser';
import { LandingPageBusiness } from './LandingPageBusiness';

const baseURL = "http://localhost:8080/api"
=======
import UserStats from '../StatisticsComponent/UserStats';
>>>>>>> main

const LandingPage = () => {
    const [open, setOpen] = useState(true);
    const [users, setUsers] = useState<IUser[]>([])
    const [businesses, setBusinesses] = useState<IBusiness[]>([])
    const [search, setSearch] = useState<String>("")

    const searchUserAndBusiness = () => {
        if (search.length != 0) {
            axios.get(`${baseURL}/user/search/${search}`).then((response) => {
                setUsers(response.data)
            }).catch(error => {console.log(error)})
            axios.get(`${baseURL}/business/search/${search}`).then((response) => {
                setBusinesses(response.data)
            })
        }
        if (search.length == 0) {
            axios.get(`${baseURL}/user`).then((response) => {
                setUsers(response.data);
            })
            axios.get(`${baseURL}/business`).then((response) => {
                setBusinesses(response.data)
            })
        }
    }
      
    return (
        <div>
            <Header />
            {/* <Box sx={{ width: '100%' }}>
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
<<<<<<< HEAD
                <TextField fullWidth label="fullWidth" id="User Search" value={search} onChange={e => setSearch(e.target.value)}/>
                <Button type="button" onClick={searchUserAndBusiness}>Search</Button>
                <div style={{ width: '100%' }}>
                    <Box
                            sx={{
                                display: 'flex',
                                p: 1,
                                m: 1,
                                bgcolor: 'background.paper',
                               
                            }}
                               
                               >
                            <LandingPageUser users={users}/>   
                            <LandingPageBusiness businesses={businesses}/>  
                           
                        
                    </Box>                

                </div>
                
                </Box>
=======
            </Box> */}
>>>>>>> main
        </div>
        
    );
};

export default LandingPage;
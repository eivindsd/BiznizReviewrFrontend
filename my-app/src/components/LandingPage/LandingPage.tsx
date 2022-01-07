import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Header from '../HeaderComponent/Header';
import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { IUser } from '../UserComponent/UserComponentInterface';
import { IBusiness } from '../BusinessComponent/BusinessInterface';
import { LandingPageUser } from './LandingPageUser';
import { LandingPageBusiness } from './LandingPageBusiness';
import { LoggedInContext } from '../LoggedInContext';
import BusinessFormAdmin from './BusinessFormAdmin';
import "./Landingpage.css";


const baseURL = "http://localhost:8080/api"

const LandingPage = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const [businesses, setBusinesses] = useState<IBusiness[]>([])
    const [userSearch, setUserSearch] = useState<String>("")
    const [businessSearch, setBusinessSearch] = useState<String>("")
    const { isAdmin } = useContext(LoggedInContext);

    const searchUser = () => {
        if (userSearch.length == 0) {
            axios.get(`${baseURL}/user`).then((response) => {
                setUsers(response.data);
            })
        }
        else {
            axios.get(`${baseURL}/user/search/${userSearch}`).then((response) => {
                setUsers(response.data) })
        }
    }

    const searchBusiness = () => {
        if (businessSearch.length == 0) {
            axios.get(`${baseURL}/business`).then((response) => {
                setBusinesses(response.data)
            })
        }
        else {
            axios.get(`${baseURL}/business/search/${businessSearch}`).then((response) => {
                setBusinesses(response.data) })
        }
    }
      
    return (
        <div>
            <Header />
            <Box sx={{ width: '100%', marginTop: '1vw'}}>
                <Grid container >
                    <Grid container item xs={6} direction="column" maxWidth="50%">
                        <TextField fullWidth label="Search by user name" id="User Search" value={userSearch} onChange={e => setUserSearch(e.target.value)}/>
                        <Button variant="contained" style={{ width: '100%', marginBottom: '1vw'}}  onClick={searchUser}>Search</Button>
                    </Grid>
                    <Grid container item xs={6} direction="column" maxWidth="50%">
                        <TextField fullWidth label="Search by business name" id="User Search" value={businessSearch} onChange={e => setBusinessSearch(e.target.value)}/>
                        <Button variant="contained" style={{ width: '100%', marginBottom: '1vw'}}  onClick={searchBusiness}>Search</Button>
                    </Grid>
                </Grid>
                <div style={{ width: '100%' }}>
                    <Box
                            sx={{
                                display: 'flex',
                                p: 1,
                                m: 1,
                                bgcolor: 'background.paper',
                               
                            }}>
                            <LandingPageUser users={users}/>
                            <LandingPageBusiness businesses={businesses}/>
                    </Box>         
                </div>
                </Box>
                {isAdmin && <BusinessFormAdmin />}
            </div>        
    );
};

export default LandingPage;
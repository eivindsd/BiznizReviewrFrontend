import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Header from '../HeaderComponent/Header';
import { Button, TextField } from '@mui/material';
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
    const [search, setSearch] = useState<String>("")
    const { isAdmin } = useContext(LoggedInContext);

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
            <Box sx={{ width: '100%', marginTop: '1vw'}}>
                <TextField fullWidth label="Search for username or business name" id="User Search" value={search} onChange={e => setSearch(e.target.value)}/>
                <Button variant="contained" style={{ width: '100%', marginBottom: '1vw'}}  onClick={searchUserAndBusiness}>Search</Button>
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
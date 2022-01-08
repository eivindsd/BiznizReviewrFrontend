import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper, Divider, IconButton, Grid } from "@mui/material"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { IFriends, ISuggestedUser, IUser } from "./UserComponentInterface"
import './User.css'
import { LoggedInContext } from "../LoggedInContext"
import { useParams } from "react-router-dom"
import Header from "../HeaderComponent/Header"
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateUserForm from "./UpdateUserForm"
import UserStats from "../StatisticsComponent/UserStats"
import { ISuggestedBusiness } from "../BusinessComponent/BusinessInterface"


const baseURL = "http://localhost:8080/api"

export const UserComponent = () => {
    const [user, setUser] = useState<IUser>({_id: "", userId: "", name: "", password: "", reviews: []})
    const [friends, setFriends] = useState<IFriends[]>([])
    const [suggestedUsers, setSuggestedUsers] = useState<ISuggestedUser[]>([])
    const [suggestedBusinesses, setSuggestedBusinesses] = useState<ISuggestedBusiness[]>([])
    const {userId, isAdmin} = useContext(LoggedInContext);
 
    let {userIdURL} = useParams();
    useEffect(() => {
        axios.get(`${baseURL}/user/${userIdURL}`).then((response) => {
            setUser(response.data);
        });
        axios.get(`${baseURL}/graph/user/following/${userIdURL}`).then((response) => {
            setFriends(response.data);
        });
        axios.get(`${baseURL}/graph/user/suggestions/${userIdURL}`).then((response) => {
            setSuggestedUsers(response.data);
        });
        axios.get(`${baseURL}/graph/business/suggestions/${userIdURL}`).then((response) => {
            setSuggestedBusinesses(response.data);
        })
        
    }, [])


    const onDeleteClick = (businessid:string, userid:string, reviewid:string) => {
        axios.delete(`${baseURL}/review/${businessid}/${userid}/${reviewid}`)
    }

    return (
    <div>
        <Header />
        <h1>{user.name}'s page</h1>
        <Divider/>
        <TableContainer component={Paper} style={{maxHeight: 400, overflow: 'auto'}} >
            <Table  aria-label="simple table">
                <TableHead >
                    <TableRow>
                        <TableCell>BUSINESS NAME</TableCell>
                        <TableCell align="left">REVIEW</TableCell>
                        <TableCell align="right">STARS</TableCell>
                        {(userId === userIdURL || isAdmin) && <TableCell align="right">DELETE</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody className="reviewContainer">
                {user.reviews.map((review) => (
                    <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    key = {review.reviewId}
                    >
                    <TableCell component="th" scope="row">{review.business_name}</TableCell>
                    <TableCell align="left">{review.text}</TableCell>
                    <TableCell align="right">{review.stars}</TableCell>
                    {(userId === userIdURL || isAdmin) && <TableCell align="right">
                            <IconButton aria-label="delete" size="small" onClick={() => onDeleteClick(review.businessId, review.userId, review.reviewId)}>
                                <DeleteIcon fontSize="inherit"/>
                            </IconButton>
                        </TableCell>}
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Grid container sx={{padding: '1vw'}}>
            <Grid container item xs={6} direction="column">
                <UserStats /> 
            </Grid>
            <Grid container item xs={6} direction="column">
                <TableContainer component={Paper} style={{maxHeight: 400, overflow: 'auto', width: '48vw'}} >
                    <Table aria-label="simple table">
                        <TableHead >
                            <TableRow className="MuiTableHead-root">
                                <TableCell>Suggested Businesses</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="reviewContainer">
                        {suggestedBusinesses.map((business) => (
                            <TableRow key={business.businessId}>
                                <TableCell scope="row">{business.name}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer> 
            </Grid>
            <Grid container item xs={6} direction="column">
                <TableContainer component={Paper} style={{maxHeight: 400, overflow: 'auto', width: '48vw'}} >
                    <Table aria-label="simple table">
                        <TableHead >
                            <TableRow className="MuiTableHead-root">
                                <TableCell>Following</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="reviewContainer">
                        {friends.map((friend) => (
                            <TableRow key={friend.userId}>
                                <TableCell scope="row">{friend.name}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer> 
            </Grid>
            <Grid container item xs={6} direction="column" maxWidth="50%">
                <TableContainer component={Paper} style={{maxHeight: 400, overflow: 'auto', width: '48vw'}} >
                    <Table aria-label="simple table">
                        <TableHead >
                            <TableRow className="MuiTableHead-root">
                                <TableCell>Suggested Users</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="reviewContainer">
                        {suggestedUsers.map((user) => (
                            <TableRow key={user.userId}>
                                <TableCell scope="row">{user.name}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </Grid>

        </Grid>
        
        
        {(isAdmin || userId==userIdURL) && <UpdateUserForm />}
    </div>
    
    );
}


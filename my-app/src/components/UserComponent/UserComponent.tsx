import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper, Divider, IconButton } from "@mui/material"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { IUser } from "./UserComponentInterface"
import './User.css'
import { LoggedInContext } from "../LoggedInContext"
import { useParams } from "react-router-dom"
import Header from "../HeaderComponent/Header"
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';


const baseURL = "http://localhost:8080/api"

export const UserComponent = () => {
    const [user, setUser] = useState<IUser>({_id: "", userId: "", name: "", password: "", reviews: [], friends: []})
    const {userId, isAdmin} = useContext(LoggedInContext)
 
    let {userIdURL} = useParams();
    useEffect(() => {
        axios.get(`${baseURL}/user/${userIdURL}`).then((response) => {
            setUser(response.data);
        });
    }, [])

    const ellipsify = (str:String) => {
        if (str.length > 100) {
            return (str.substring(0, 100) + "...");
        }
        else {
            return str;
        }
    }

    const onDeleteClick = (businessid:string, userid:string, reviewid:string) => {
        axios.delete(`${baseURL}/review/${businessid}/${userid}/${reviewid}`)
    }
    return (
    <div>
        <Header />
        <h1>{user.name}</h1>
        <Divider/>
        <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '1vw'}}>
        <TableContainer component={Paper} style={{maxHeight: 400, overflow: 'auto', width: '50vw'}} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                    <TableCell align="left">{ellipsify(review.text)}</TableCell>
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
        <div className="friendList">
            <TableContainer component={Paper} style={{maxHeight: 400, overflow: 'auto', width: '50vw'}} >
                <Table aria-label="simple table">
                    <TableHead >
                        <TableRow className="MuiTableHead-root">
                            <TableCell>FriendList</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="reviewContainer">
                    {user.friends.map((friend) => (
                        <TableRow key={friend.friendId}>
                            <TableCell scope="row">{friend.friendName}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
            </Box>
        
    </div>
    
    );


}
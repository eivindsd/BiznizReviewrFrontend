import { TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Paper, IconButton,  } from "@mui/material";
import { IUser } from "../UserComponent/UserComponentInterface";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoggedInContext }from "../LoggedInContext";
import DeleteIcon from '@mui/icons-material/Delete';

import axios from "axios";

interface IProps {
    users: IUser[]
}
const baseURL = "http://localhost:8080/api/user"

export const LandingPageUser: React.FC<IProps> = ({users}) => {
    const {isAdmin} = useContext(LoggedInContext)

    const onDeleteClick = (id:string) => {
        axios.delete(`${baseURL}/${id}`)
    }
    
    return (
            <TableContainer component={Paper} style={{maxHeight: 400, overflow: 'auto', width:"500vw"}} >
            <Table aria-label="simple table">
                <TableHead >
                    <TableRow className="MuiTableHead-root">
                        <TableCell>USERS</TableCell>
                        {isAdmin && <TableCell align="right">DELETE</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody className="reviewContainer">
                {users.map((user) => (
                    <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    key={user.userId}
                    >
                    <TableCell component="th" scope="row"> <Link to={`user/${user.userId}`}>{user.name}</Link></TableCell>
                    {isAdmin && <TableCell align="right">
                            <IconButton aria-label="delete" size="small" onClick={() => onDeleteClick(user.userId)}>
                                <DeleteIcon fontSize="inherit"/>
                            </IconButton>
                        </TableCell>}
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        )

    }
    

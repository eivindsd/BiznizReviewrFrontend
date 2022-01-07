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

export const LandingPageUser = (props:IProps) => {
    const {isAdmin} = useContext(LoggedInContext)

    const onDeleteClick = (id:string) => {
        axios.delete(`${baseURL}/${id}`)
    }

    if (props.users) {
        return (
        <TableContainer component={Paper} style={{maxHeight: 400, overflow: 'auto', width:"500vw"}} >
            <Table aria-label="simple table" stickyHeader className="MuiTableHead-root">
                <TableHead >
                    <TableRow className="MuiTableHead-root">
                        <TableCell>USERS</TableCell>
                        {isAdmin && <TableCell align="right">DELETE</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody className="reviewContainer">
                {props.users.map((user) => (
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
    } else {
        return (
            <TableContainer component={Paper} style={{maxHeight: 400, overflow: 'auto'}} >
            <Table aria-label="simple table" stickyHeader className="MuiTableHead-root">
                <TableHead >
                    <TableRow className="MuiTableHead-root">
                        <TableCell>USERS</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="reviewContainer">
                    <TableRow
                    sx={{ '&:last-child te, &:last-child tf': { border: 0 } }}
                    key={"id"}
                    >
                    <TableCell component="th" scope="row"> No User</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        )

    }
    

}
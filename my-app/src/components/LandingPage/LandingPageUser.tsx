import { TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Paper,  } from "@mui/material";
import { IUser } from "../UserComponent/UserComponentInterface";
import { Link } from "react-router-dom";

interface IProps {
    users: IUser[]
}

export const LandingPageUser = (props:IProps) => {


    if (props.users) {
        return (
        <TableContainer component={Paper} style={{maxHeight: 400, overflow: 'auto', width:"500vw"}} >
            <Table aria-label="simple table" stickyHeader className="MuiTableHead-root">
                <TableHead >
                    <TableRow className="MuiTableHead-root">
                        <TableCell>USERS</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="reviewContainer">
                {props.users.map((user) => (
                    <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    key={user.userId}
                    >
                    <TableCell component="th" scope="row"> <Link to={`user/${user.userId}`}>{user.name}</Link></TableCell>
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
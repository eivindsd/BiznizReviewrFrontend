import { TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Paper, IconButton,  } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { IBusiness } from "../BusinessComponent/BusinessInterface";
import { LoggedInContext } from "../LoggedInContext";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

interface IProps {
    businesses: IBusiness[]
}

const baseURL = "http://localhost:8080/api/business"

export const LandingPageBusiness = (props:IProps) => {
    const {isAdmin} = useContext(LoggedInContext)

    const onDeleteClick = (id:string) => {
        axios.delete(`${baseURL}/${id}`)
    }

    if (props.businesses) {
        return (
        <TableContainer component={Paper} style={{maxHeight: 400, overflow: 'auto'}} >
            <Table aria-label="simple table">
                <TableHead >
                    <TableRow className="MuiTableHead-root">
                        <TableCell>BUSINESSES</TableCell>
                        {isAdmin && <TableCell align="right">DELETE</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody className="reviewContainer">
                {props.businesses.map((business) => (
                    <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    key={business.businessId}
                    >
                    <TableCell component="th" scope="row"> <Link to={`business/${business.businessId}`}>{business.name}</Link></TableCell>
                    {isAdmin && <TableCell align="right">
                            <IconButton aria-label="delete" size="small" onClick={() => onDeleteClick(business.businessId)}>
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
            <TableContainer component={Paper} style={{height: '100%', overflow: 'auto'}} >
            <Table aria-label="simple table" stickyHeader className="MuiTableHead-root">
                <TableHead >
                    <TableRow className="MuiTableHead-root">
                        <TableCell>BUSINESSES</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="reviewContainer">
                    <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    key={"id"}
                    >
                    <TableCell component="th" scope="row"> No Businesses</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        )

    }
    

}
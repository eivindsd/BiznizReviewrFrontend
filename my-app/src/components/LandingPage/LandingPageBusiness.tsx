import { TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Paper,  } from "@mui/material";
import { Link } from "react-router-dom";
import { IBusiness } from "../BusinessComponent/BusinessInterface";

interface IProps {
    businesses: IBusiness[]
}

export const LandingPageBusiness = (props:IProps) => {

    console.log(props.businesses)
    if (props.businesses) {
        return (
        <TableContainer component={Paper} style={{maxHeight: 400, overflow: 'auto', width:"500vw"}} >
            <Table aria-label="simple table" stickyHeader className="MuiTableHead-root">
                <TableHead >
                    <TableRow className="MuiTableHead-root">
                        <TableCell>BUSINESSES</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="reviewContainer">
                {props.businesses.map((business) => (
                    <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    key={business.businessId}
                    >
                    <TableCell component="th" scope="row"> <Link to={`business/${business.businessId}`}>{business.name}</Link></TableCell>
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
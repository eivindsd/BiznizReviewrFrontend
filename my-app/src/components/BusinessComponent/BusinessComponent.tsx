import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper, Divider } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Header from "../HeaderComponent/Header"
import { IBusiness } from "./BusinessInterface"

const baseURL = "http://localhost:8080/api/business"

interface IProps {
    id: String
}

export const BusinessComponent = () => {
    const [business, setBusiness] = useState<IBusiness>({_id: "", businessId: "", name: "", country: "", city: "", reviews: [] })

    let {businessId} = useParams();

    useEffect(() => {
        axios.get(`${baseURL}/${businessId}`).then((response) => {
            setBusiness(response.data);
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
    return (
    <div>
        <Header />
        <h1>{business.name}</h1>
        <Divider/>
        <TableContainer component={Paper} style={{maxHeight: 400, overflow: 'auto'}} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader className="MuiTableHead-root">
                <TableHead >
                    <TableRow className="MuiTableHead-root">
                        <TableCell>BUSINESS NAME</TableCell>
                        <TableCell align="left">REVIEW</TableCell>
                        <TableCell align="right">STARS</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="reviewContainer">
                {business.reviews && business.reviews.map((review) => (
                    <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">{review.user_name}</TableCell>
                    <TableCell align="left">{ellipsify(review.text)}</TableCell>
                    <TableCell align="right">{review.stars}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );


}
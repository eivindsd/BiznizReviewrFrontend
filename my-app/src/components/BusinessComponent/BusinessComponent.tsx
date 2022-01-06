import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper, Divider } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Header from "../HeaderComponent/Header"
import { IBusiness } from "./BusinessInterface"
import ReviewForm from "../UserComponent/ReviewForm"

const baseURL = "http://localhost:8080/api/business"

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
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead >
                    <TableRow className="MuiTableHead-root">
                        
                        <TableCell align="left">REVIEW</TableCell>
                        <TableCell align="right">STARS</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="reviewContainer">
                {business.reviews && business.reviews.map((review) => (
                    <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell align="left">{review.text ? ellipsify(review.text): null}</TableCell>
                    <TableCell align="right">{review.stars}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <ReviewForm businessId={businessId} name={business.name}/>
        </div>
        
    );


}
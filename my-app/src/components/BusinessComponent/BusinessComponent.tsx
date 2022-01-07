import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper, Divider, IconButton } from "@mui/material"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Header from "../HeaderComponent/Header"
import { IBusiness } from "./BusinessInterface"
import ReviewForm from "../UserComponent/ReviewForm"
import DeleteIcon from '@mui/icons-material/Delete';
import {LoggedInContext} from "../LoggedInContext";

const baseURL = "http://localhost:8080/api"


export const BusinessComponent = () => {
    const [business, setBusiness] = useState<IBusiness>({_id: "", businessId: "", name: "", country: "", city: "", reviews: [] })
    const {isAdmin} = useContext(LoggedInContext);
    const [open, setOpen] = useState(false);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let {businessIdURL} = useParams();

    const onDeleteClick = (businessid:string, userid:string, reviewid:string) => {
        console.log(`${baseURL}/review/${businessid}/${userid}/${reviewid}`)
        
        axios.delete(`${baseURL}/review/${businessid}/${userid}/${reviewid}`)
    }

    useEffect(() => {
        axios.get(`${baseURL}/business/${businessIdURL}`).then((response) => {
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
                        {isAdmin && <TableCell align="right">DELETE</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody className="reviewContainer">
                {business.reviews && business.reviews.map((review) => (
                    <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell align="left">{review.text}</TableCell>
                    <TableCell align="right">{review.stars}</TableCell>
                    {isAdmin && <TableCell align="right">
                            <IconButton aria-label="delete" size="small" onClick={() => onDeleteClick(review.businessId, review.userId, review.reviewId)}>
                                <DeleteIcon fontSize="inherit"/>
                            </IconButton>
                        </TableCell>}
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <ReviewForm businessId={businessIdURL} name={business.name}/>
        </div>
        
    );


}
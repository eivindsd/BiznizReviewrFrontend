import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper, Divider, IconButton, Card, Typography, Container, Box, List, ListItem, ListItemText } from "@mui/material"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Header from "../HeaderComponent/Header"
import { IBusiness } from "./BusinessInterface"
import ReviewForm from "../UserComponent/ReviewForm"
import DeleteIcon from '@mui/icons-material/Delete';
import {LoggedInContext} from "../LoggedInContext"
import BusinessStats from "../StatisticsComponent/BusinessStats"


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
    console.log("categories ", business.categories)
    console.log("toptags", business.topTags)
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
        <div style={{ width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
            }}
            >
            <BusinessStats />
            <div style={{ width: '24%', paddingRight: '1vw'}}>
                <Card sx={{maxWidth:"50vw"}}>
                    <Typography variant="h4" align="center">Business Info</Typography>
                    <Divider></Divider>
                    <Typography>Country: {business.country}</Typography>
                    {business.state && <Typography>State: {business.state}</Typography>}
                    <Typography>City: {business.city}</Typography>
            
                </Card>
            </div>
            <div style={{ width: '24%', paddingRight: '1vw'}}>
            {business.topTags &&
                    <TableContainer component={Paper} style={{maxHeight: "20vw", overflow: 'auto', width:"500vw"}} >
                    <Table>
                        <TableHead>
                            <TableRow className="MuiTableHead-root">
                                <TableCell>Categories</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {business.topTags && business.topTags.map((tag) =>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }}}>
                                <TableCell component="th" scope="row"> {tag} </TableCell>
                            </TableRow>
                        )}
                            
                        </TableBody>

                    </Table>
                </TableContainer>
                    }
                    {business.categories &&
                     <TableContainer component={Paper} style={{maxHeight: "20vw", overflow: 'auto', width:"500vw"}} >
                        <Table>
                            <TableHead>
                                <TableRow className="MuiTableHead-root">
                                    <TableCell>Categories</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {business.categories && business.categories.map((tag) =>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }}}>
                                    <TableCell component="th" scope="row"> {tag} </TableCell>
                                </TableRow>
                            )}
                                
                            </TableBody>

                        </Table>
                    </TableContainer>
                    }
            </div>
            </Box>

        </div>
        </div>
        
    );


}
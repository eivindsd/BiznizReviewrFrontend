import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Header from "../HeaderComponent/Header";

interface AvgStarsState {
    avgStars: number;
    state: string;
}

interface AvgStarsCity {
    avgStars: number;
    city: string;
}

interface AvgReviewsCity {
    city: string;
    avgReviews: number;
}


const Statistics = () => {

    const [avgStarsState, setAvgStarsState] = useState<AvgStarsState[]>();
    const [avgStarsCity, setAvgStarsCity] = useState<AvgStarsCity[]>();
    const [avgReviewsCity, setAvgReviewsCity] = useState<AvgReviewsCity[]>();

    useEffect(() => {
        getAvgStarsPerState();
        getAvgStarsPerCity();
        getAvgReviewsCity();
    }, []);

    const getAvgStarsPerState = async () => {
        setAvgStarsState(await (await axios.get(`http://localhost:8080/api/aggregations/avgstarsstate`)).data);
    }

    const getAvgStarsPerCity = async () => {
        setAvgStarsCity(await (await axios.get(`http://localhost:8080/api/aggregations/avgstarscity`)).data);
    }

    const getAvgReviewsCity = async () => {
        setAvgReviewsCity(await (await axios.get(`http://localhost:8080/api/aggregations/maxreviewscity`)).data);
    }

    return (
        <div >
            <Header />
            <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '5%', marginLeft: '5%' }}>
                <div style={{width: '25%', marginRight: '10%'}}>
                    <Typography>Average stars per state</Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 20 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>State</TableCell>
                                    <TableCell align="right">Average stars</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {avgStarsState && avgStarsState.map((row) => (
                                <TableRow
                                key={row.state}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.state}
                                </TableCell>
                                <TableCell align="right">{row.avgStars.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                            </Table>
                    </TableContainer>
                </div>
                
        <div style={{width: '25%', marginRight: '10%', height: '100%'}}>
            <Typography>Average stars per city</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 20 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>City</TableCell>
                            <TableCell align="right">Average stars</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {avgStarsCity && avgStarsCity.map((row) => (
                            <TableRow
                            key={row.city}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.city}
                            </TableCell>
                            <TableCell align="right">{row.avgStars.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

        <div style={{width: '25%', marginRight: '10%'}}>
                <Typography>Average reviews on businesses in city</Typography>
                <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 20 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>City</TableCell>
                                <TableCell align="right">Average reviews on businesses</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {avgReviewsCity && avgReviewsCity.map((row) => (
                                <TableRow
                                key={row.city}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.city}
                                </TableCell>
                                <TableCell align="right">{row.avgReviews.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Box>
        </div>
    );
};

export default Statistics;
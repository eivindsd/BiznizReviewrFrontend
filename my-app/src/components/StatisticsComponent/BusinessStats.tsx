import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import { LoggedInContext } from "../LoggedInContext";
import axios from 'axios';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box } from '@mui/material';
import { maxWidth } from '@mui/system';
import '../BusinessComponent/Business.css'
import { tokenToString } from 'typescript';

interface amountOfStarsBusiness {
    //businessId muligens
    businessid: String;
    amountFive: number;
    amountFour: number;
    amountThree: number;
    amountTwo: number;
    amountOne: number;
}

const BusinessStats = () => {
    const [amountOfStarsBusiness, setAmountOfStarsBusiness] = useState<amountOfStarsBusiness>();

    useEffect(() => {
        getAmountOfStarsPerBusiness();
    }, []);

    let {businessIdURL} = useParams();

    const getAmountOfStarsPerBusiness = async () => {
        //her må det endres til faktisk businessId
        console.log(`http://localhost:8080/api/aggregations/amountofstarsperbusiness/${businessIdURL}`)
        setAmountOfStarsBusiness(await (await axios.get(`http://localhost:8080/api/aggregations/amountofstarsperbusiness/${businessIdURL}`)).data);
    }

    const calculatePercentage = (num: number) => {
        console.log(amountOfStarsBusiness)
        const tot: number = Number((Number(amountOfStarsBusiness?.amountFive) + Number(amountOfStarsBusiness?.amountFour) + Number(amountOfStarsBusiness?.amountThree) +
        Number(amountOfStarsBusiness?.amountTwo) + Number(amountOfStarsBusiness?.amountOne)))
        if (tot != 0) {
            return(
                100 * num/tot
            )
        }
        else {
            return 0
        }
        
    }

    return (
        <div style={{ width: '40%', paddingRight: '1vw' }}>
        <Card sx={{ maxWidth: '50vw'}}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Business:
                </Typography>
                <Box sx={{display:'flex', flexWrap: 'wrap', alignItems: 'center', maxWidth: '50vw'}}>
                    <Typography> 5 stars: </Typography>
                    <ProgressBar variant="info" label={`${Math.round(calculatePercentage(Number(amountOfStarsBusiness?.amountFive)))}%`} now={calculatePercentage(Number(amountOfStarsBusiness?.amountFive))} />
                </Box>
                <Box sx={{display:'flex', flexWrap: 'wrap', alignItems: 'center'}} style={{width: "100%"}}>
                    <Typography> 4 stars: </Typography>
                    <ProgressBar variant="info" label={`${Math.round(calculatePercentage(Number(amountOfStarsBusiness?.amountFour)))}%`} now={calculatePercentage(Number(amountOfStarsBusiness?.amountFour))} />
                </Box>
                <Box sx={{display:'flex', flexWrap: 'wrap', alignItems: 'center'}}>
                    <Typography> 3 stars: </Typography>
                    <ProgressBar variant="info" label={`${Math.round(calculatePercentage(Number(amountOfStarsBusiness?.amountThree)))}%`} now={calculatePercentage(Number(amountOfStarsBusiness?.amountThree))} />
                </Box>
                <Box sx={{display:'flex', flexWrap: 'wrap', alignItems: 'center', width:'100%'}}>
                    <Typography> 2 stars: </Typography>
                    <ProgressBar variant="info" label={`${Math.round(calculatePercentage(Number(amountOfStarsBusiness?.amountTwo)))}%`} now={calculatePercentage(Number(amountOfStarsBusiness?.amountTwo))} />
                </Box>
                <Box sx={{display:'flex', flexWrap: 'wrap', alignItems: 'center', maxWidth: '50vw'}}>
                    <Typography> 1 stars: </Typography>
                    <ProgressBar variant="info" label={`${Math.round(calculatePercentage(Number(amountOfStarsBusiness?.amountOne)))}%`} now={calculatePercentage(Number(amountOfStarsBusiness?.amountOne))} />
                </Box>
       
            </CardContent>
                
        </Card>
                
        </div>
    );
};

export default BusinessStats;
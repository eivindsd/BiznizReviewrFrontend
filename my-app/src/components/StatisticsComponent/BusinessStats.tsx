import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import { LoggedInContext } from "../LoggedInContext";
import axios from 'axios';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

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

    const getAmountOfStarsPerBusiness = async () => {
        //her må det endres til faktisk businessId
        setAmountOfStarsBusiness(await (await axios.get(`http://localhost:8080/api/aggregations/amountofstarsperbusiness/6iYb2HFDywm3zjuRg0shjw`)).data);
    }

    return (
        <div>
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Business: {amountOfStarsBusiness?.businessid}
                </Typography>
                <Typography >
                Number of 5-stars reviews given: {amountOfStarsBusiness?.amountFive}
                </Typography>
                <Typography >
                Number of 4-stars reviews given: {amountOfStarsBusiness?.amountFour}
                </Typography>
                <Typography >
                Number of 3-stars reviews given: {amountOfStarsBusiness?.amountThree}
                </Typography>
                <Typography >
                Number of 2-stars reviews given: {amountOfStarsBusiness?.amountTwo}
                </Typography>
                <Typography >
                Number of 1-stars reviews given: {amountOfStarsBusiness?.amountOne}
                </Typography>
            </CardContent>
        </Card>
        </div>
    );
};

export default BusinessStats;
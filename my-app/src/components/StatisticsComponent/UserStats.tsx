import React, { useEffect, useState } from 'react';
import { LoggedInContext } from "../LoggedInContext";
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


interface AmountOfStarsUser {
    userId: String;
    amountFive: number;
    amountFour: number;
    amountThree: number;
    amountTwo: number;
    amountOne: number;
}

const UserStats = () => {
    
    const [amountOfStarsUser, setAmountOfStarsUser] = useState<AmountOfStarsUser>();
    const { userId, userName } = React.useContext(LoggedInContext);

    useEffect(() => {
        getAmountOfStarsPerUser();
    }, []);

    const getAmountOfStarsPerUser = async () => {
        setAmountOfStarsUser(await (await axios.get(`http://localhost:8080/api/aggregations/amountofstarsperuser/${userId}`)).data);
    }

    return (
        <div>
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                User: {userName}
                </Typography>
                <Typography >
                Number of 5-stars reviews given: {amountOfStarsUser?.amountFive}
                </Typography>
                <Typography >
                Number of 4-stars reviews given: {amountOfStarsUser?.amountFour}
                </Typography>
                <Typography >
                Number of 3-stars reviews given: {amountOfStarsUser?.amountThree}
                </Typography>
                <Typography >
                Number of 2-stars reviews given: {amountOfStarsUser?.amountTwo}
                </Typography>
                <Typography >
                Number of 1-stars reviews given: {amountOfStarsUser?.amountOne}
                </Typography>
            </CardContent>
        </Card>
        </div>
    );
};

export default UserStats;
import React, { useEffect, useState } from 'react';
import { LoggedInContext } from "../LoggedInContext";
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ProgressBar } from 'react-bootstrap';
import { Box } from '@mui/material';


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

    const calculatePercentage = (num: number) => {
        console.log(amountOfStarsUser)
        const tot: number = Number((Number(amountOfStarsUser?.amountFive) + Number(amountOfStarsUser?.amountFour) + Number(amountOfStarsUser?.amountThree) +
        Number(amountOfStarsUser?.amountTwo) + Number(amountOfStarsUser?.amountOne)))
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
        <div>
        <Card sx={{ maxWidth: '48vw'}}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Business: 
                </Typography>
                <Box sx={{display:'flex', flexWrap: 'wrap', alignItems: 'center', maxWidth: '50vw'}}>
                    <Typography> 5 stars: </Typography>
                    <ProgressBar variant="info" label={`${Math.round(calculatePercentage(Number(amountOfStarsUser?.amountFive)))}%`} now={calculatePercentage(Number(amountOfStarsUser?.amountFive))} />
                </Box>
                <Box sx={{display:'flex', flexWrap: 'wrap', alignItems: 'center'}} style={{width: "100%"}}>
                    <Typography> 4 stars: </Typography>
                    <ProgressBar variant="info" label={`${Math.round(calculatePercentage(Number(amountOfStarsUser?.amountFour)))}%`} now={calculatePercentage(Number(amountOfStarsUser?.amountFour))} />
                </Box>
                <Box sx={{display:'flex', flexWrap: 'wrap', alignItems: 'center'}}>
                    <Typography> 3 stars: </Typography>
                    <ProgressBar variant="info" label={`${Math.round(calculatePercentage(Number(amountOfStarsUser?.amountThree)))}%`} now={calculatePercentage(Number(amountOfStarsUser?.amountThree))} />
                </Box>
                <Box sx={{display:'flex', flexWrap: 'wrap', alignItems: 'center', width:'100%'}}>
                    <Typography> 2 stars: </Typography>
                    <ProgressBar variant="info" label={`${Math.round(calculatePercentage(Number(amountOfStarsUser?.amountTwo)))}%`} now={calculatePercentage(Number(amountOfStarsUser?.amountTwo))} />
                </Box>
                <Box sx={{display:'flex', flexWrap: 'wrap', alignItems: 'center', maxWidth: '50vw'}}>
                    <Typography> 1 stars: </Typography>
                    <ProgressBar variant="info" label={`${Math.round(calculatePercentage(Number(amountOfStarsUser?.amountOne)))}%`} now={calculatePercentage(Number(amountOfStarsUser?.amountOne))} />
                </Box>
       
            </CardContent>
                
        </Card>
                
        </div>
    );
};

export default UserStats;
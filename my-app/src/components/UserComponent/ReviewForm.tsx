import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { LoggedInContext } from "../LoggedInContext";

interface IProps {
    businessId: string | undefined;
    name: string | undefined;
}

const ReviewForm: React.FC<IProps> = ({businessId, name}) => {
    const [review, setReview] = React.useState<string>();
    const [stars, setStars] = React.useState<number | null>(0);
    const [open, setOpen] = React.useState(false);
    const { userId } = React.useContext(LoggedInContext);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReview(event.currentTarget.value);
      };

      const handleSubmit = async () => {
         
          axios.post(`http://localhost:8080/api/review/${businessId}/${userId}`,{
              stars: stars,
              text: review,
              business_name: name
          }).then(
            function(response) {
                response.status === 201 ? setOpen(true) : setOpen(false);
            }
          )
      }
    
    return (
        <div style={{marginTop: '1vw'}}>
            <TextField
                id="outlined-multiline-flexible"
                label="Write a review"
                multiline
                maxRows={10}
                value={review}
                style={{width: '100%'}}
                onChange={handleChange}
            />
            <Box
            sx={{'& > legend': { mt: 2 }}}>
                <Typography component="legend">Stars</Typography>
                <Rating
                    name="simple-controlled"
                    value={stars}
                    onChange={(event, newValue) => {
                    setStars(newValue);
                    }}
                />
            </Box>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                onClick={handleSubmit}
              >
                Publish review
              </Button>
              
        </div>
    );
};

export default ReviewForm;
import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const BusinessFormAdmin = () => {
    const [name, setName] = React.useState<string>();
    const [country, setCountry] = React.useState<string>();
    const [city, setCity] = React.useState<string>();
    const [state, setState] = React.useState<string>();
    const [topTags, setTopTags] = React.useState<string>();
    const [categories, setCategories] = React.useState<string>();
    const [open, setOpen] = React.useState(false);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
      };
      const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCountry(event.currentTarget.value);
      };
      const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(event.currentTarget.value);
      };
      const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(event.currentTarget.value);
      };
      const handleTopTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTopTags(event.currentTarget.value);
      };
      const handleCategoriesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategories(event.currentTarget.value);
      };

    const handleSubmit = async () => {
        axios.post(`http://localhost:8080/business`,{
            name: name,
            country: country,
            city: city,
            state: state,
            topTags: topTags,
            categories: categories
        }).then(
          function(response) {
              response.status === 201 ? setOpen(true) : setOpen(false);
          }
        )
    }
    return (
        <div style={{marginTop: '1vw'}}>
            <h1>Create a new business</h1>
            <div style={{display: 'flex', flexDirection: 'row'}}>
            <TextField
                id="outlined-multiline-flexible"
                label="Businessname"
                multiline
                maxRows={10}
                value={name}
                //style={{width: '15%'}}
                onChange={handleNameChange}
            />
            <TextField
                id="outlined-multiline-flexible"
                label="Country"
                multiline
                maxRows={10}
                value={country}
                //style={{width: '15%'}}
                onChange={handleCountryChange}
            />
            <TextField
                id="outlined-multiline-flexible"
                label="City"
                multiline
                maxRows={10}
                value={city}
                //style={{width: '15%'}}
                onChange={handleCityChange}
            />
            <TextField
                id="outlined-multiline-flexible"
                label="State"
                multiline
                maxRows={10}
                value={state}
                //style={{width: '15%'}}
                onChange={handleStateChange}
            />
            <TextField
                id="outlined-multiline-flexible"
                label="Top tags (comma separated)"
                multiline
                maxRows={10}
                value={topTags}
                //style={{width: '15%'}}
                onChange={handleTopTagsChange}
            />
            <TextField
                id="outlined-multiline-flexible"
                label="Categories (comma separated)"
                multiline
                maxRows={10}
                value={categories}
                //style={{width: '15%'}}
                onChange={handleCategoriesChange}
            />
            </div>
            
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                onClick={handleSubmit}
              >
                Publish business
              </Button>
              
        </div>
    );
};

export default BusinessFormAdmin;
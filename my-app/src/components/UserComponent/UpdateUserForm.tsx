import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { LoggedInContext } from '../LoggedInContext';
import axios from 'axios';
import "./UpdateUserForm.css";
import { IReview } from './UserComponentInterface';

interface IProps {
  reviews: IReview[]
}

const UpdateUserForm = (props:IProps) => {
    const [name, setName] = React.useState<string | undefined>();
    const [password, setPassword] = React.useState<string | undefined>();
    const [open, setOpen] = React.useState(false);
    const { userId } = useContext(LoggedInContext);

    const handleSubmit = async () => {
        axios.put(`http://localhost:8080/api/user/${userId}`,{
              name: name,
              password: password,
              reviews: props.reviews
          }).then(
            function(response) {
                response.status === 200 ? setOpen(true) : setOpen(false);
            }
          )
          axios.put(`http://localhost:8080/api/graph/user/${userId}`,{
              name: name
          }).then(
            function(response) {
                response.status === 200 ? setOpen(true) : setOpen(false);
            }
          )
        }
        
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
      };
      const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
      };

    return (
        <div style={{marginTop: '1vw', textAlign: "left"}}>
            <h2>Update user</h2>
            <Box component="form" noValidate style={{display: 'flex', flexDirection: 'row'}}>
            <TextField
                id="outlined-multiline-flexible"
                type="password"
                label="New username"
                multiline
                maxRows={10}
                value={name}
                style={{width: '20%'}}
                onChange={handleNameChange}
            />
            <TextField
              margin="normal"
              label="New password"
              type="password"
              autoComplete="current-password"
              style={{width: '20%'}}
              onChange={handlePasswordChange}
            />
            </Box>
            <Box sx={{ width: '100%' }}>
                <Collapse in={open}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                setOpen(false);
                                }}>
                                <CloseIcon fontSize="inherit" />
                            </IconButton>}
                        sx={{ mb: 2 }}>
                        Successfully updated user!
                    </Alert>
                </Collapse>
            </Box>
            
            <Button
                type="submit"
                style={{width: '40%'}}
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                onClick={handleSubmit}
              >
                Update user
              </Button>
              
        </div>
    );
};

export default UpdateUserForm;
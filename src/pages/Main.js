import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { routes } from '../services/routes/routes';

const Main = () => {
    const nav = useNavigate()
    return (
        <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ backgroundColor: 'var(--white)', boxShadow: '0px 10px 50px -10px var(--black)', padding: '2rem', borderRadius: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 36, fontWeight: 'bold' }}>Sign in</Typography>
                    <Typography>Click the button bellow if you already have an account.</Typography>
                    <Button onClick={() => nav(routes.LOGIN)}>Log in</Button>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 36, fontWeight: 'bold' }}>Sign up</Typography>
                    <Typography>If you are new here you can just create a new account by clicking on register button.</Typography>
                    <Button onClick={() => nav(routes.REGISTER)}>Register</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Main;
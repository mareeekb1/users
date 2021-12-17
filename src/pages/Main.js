import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { routes } from '../services/routes/routes';

const Main = () => {
    const nav = useNavigate()
    return (
        <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', textAlign: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--white)', boxShadow: '0px 10px 50px -10px var(--black)', padding: '2rem', borderRadius: 2 }}>
                <Typography sx={{ fontSize: 36, fontWeight: 'bold' }}>Sign in</Typography>
                <Typography>Click the button bellow if you already have an account.</Typography>
                <Button onClick={() => nav(routes.LOGIN)}>Log in</Button>
            </Box>
            <Box sx={{ mt: "4rem", display: 'flex', flexDirection: 'column', width: '50%', textAlign: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--white)', boxShadow: '0px 10px 50px -10px var(--black)', padding: '2rem', borderRadius: 2 }}>
                <Typography sx={{ fontSize: 36, fontWeight: 'bold' }}>Sign up</Typography>
                <Typography>If you are new here you can just create a new account by clicking on register button.</Typography>
                <Button onClick={() => nav(routes.REGISTER)}>Register</Button>
            </Box>
        </Box>
    );
};

export default Main;
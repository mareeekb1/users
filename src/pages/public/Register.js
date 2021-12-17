import { Box } from '@mui/material';
import React from 'react';
import CreateUserForm from '../../components/forms/CreateUserForm';

const Register = () => {
    return (
        <Box>
            <CreateUserForm handler={() => console.log('handler')} />
        </Box>
    );
};

export default Register;
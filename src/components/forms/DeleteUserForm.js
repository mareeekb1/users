import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const DeleteUserForm = ({ onClose, handle }) => {
    return (
        <Box>
            <Typography>Do you really want to delete this user?</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mt: '1rem' }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={() => handle()} color="error" variant="contained">Delete</Button>
            </Box>
        </Box>
    );
};

export default DeleteUserForm;
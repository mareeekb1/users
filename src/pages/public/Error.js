import React from 'react';
import { Box } from '@mui/material';

const Error = () => {
    return (
        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <div style={{ fontWeight: 'bold', fontSize: 200, color: 'var(--white)' }}>404</div>
            <div style={{ fontWeight: 'bold', fontSize: 36, color: 'var(--white)' }}>Page not found</div>
        </Box>
    );
};

export default Error;
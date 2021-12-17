import { Box, CircularProgress, Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';

const Modal = ({ open, onClose, handleSubmit, content, header, loading, disabled, ...rest }) => {
    return (
        <Dialog open={open} onClose={onClose} {...rest} >
            <DialogTitle>{header}</DialogTitle>
            {loading ?
                <Box sx={{ display: 'flex', justifyContent: 'center', height: 200, width: 400, alignItems: 'center', flexDirection: 'column' }} >
                    <CircularProgress size={100} thicknes={200} />
                    <div style={{ position: 'absolute' }}>Loading</div>
                </Box>
                :
                <DialogContent>
                    {content}
                </DialogContent>
            }
        </Dialog>
    );
};

export default Modal;
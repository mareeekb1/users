import React, { useState } from 'react';
import { Box, Button, FormControl, InputAdornment, TextField } from '@mui/material';
import Cake from '@mui/icons-material/Cake';
import Person from '@mui/icons-material/Person';
import Phone from '@mui/icons-material/Phone';
import Email from '@mui/icons-material/Email';
import Info from '@mui/icons-material/Info';

const UpdateUserForm = ({ data, handle, onClose }) => {

    const [form, setForm] = useState(data ?? {
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        description: '',
        birth_date: '',
    })
    function checkIfDisabled() {
        if (
            data.firstname === form.firstname &&
            data.lastname === form.lastname &&
            data.phone === form.phone &&
            data.email === form.email &&
            data.description === form.description &&
            data.birth_date === form.birth_date
        ) return true
        return false
    }


    return (
        <Box>
            <FormControl>
                <Box>
                    <TextField
                        sx={{ m: '1rem' }}
                        label="Firstname"
                        variant="standard"
                        value={form.firstname}
                        onChange={(e) => setForm({ ...form, firstname: e.target.value })}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Person />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        sx={{ m: '1rem' }}
                        label="Lastname"
                        variant="standard"
                        value={form.lastname}
                        onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Person />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box>
                    <TextField
                        sx={{ m: '1rem' }}
                        label="Phone"
                        variant="standard"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Phone />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        sx={{ m: '1rem' }}
                        label="Email"
                        variant="standard"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box>
                    <TextField
                        sx={{ m: '1rem' }}
                        label="Birth date"
                        variant="standard"
                        value={form.birth_date}
                        onChange={(e) => setForm({ ...form, birth_date: e.target.value })}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Cake />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <TextField
                    sx={{ m: '1rem' }}
                    multiline
                    maxRows={3}
                    label="Description"
                    variant="standard"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Info />
                            </InputAdornment>
                        ),
                    }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={() => handle(form)} disabled={checkIfDisabled()}>Submit</Button>
                </Box>
            </FormControl>
        </Box>
    );
};

export default UpdateUserForm;
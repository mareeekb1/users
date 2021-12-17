import React, { useState } from 'react';
import { Box, Button, CircularProgress, FormControl, InputAdornment, TextField } from '@mui/material';
import Cake from '@mui/icons-material/Cake';
import Person from '@mui/icons-material/Person';
import Phone from '@mui/icons-material/Phone';
import Email from '@mui/icons-material/Email';
import Info from '@mui/icons-material/Info';
import Key from '@mui/icons-material/Key';

const CreateUserForm = ({ handle }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(true)
    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        description: '',
        birth_date: '',
        username: '',
        role: 'BASIC',
        is_premium: false,
        birth_date: '2000-01-01',
        password: ''
    })

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
            <div style={{ color: 'var(--white)', fontSize: 36, fontWeight: 'bold', marginBottom: '2rem' }}>Sign up</div>
            {isLoading ?
                <Box sx={{ borderRadius: 2, background: 'var(--white)', display: 'flex', justifyContent: 'center', height: 160, width: 290.4, alignItems: 'center', flexDirection: 'column' }} >
                    <CircularProgress size={100} thicknes={200} />
                    <div style={{ position: 'absolute' }}>Loading</div>
                </Box> :
                <FormControl>
                    <Box>
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
                        <TextField
                            sx={{ m: '1rem' }}
                            label="Username"
                            variant="standard"
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
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
                            label="Password"
                            variant="standard"
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Key />
                                    </InputAdornment>
                                ),
                            }}
                        />
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
                    </Box>
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
                    {error &&
                        <Box sx={{ color: 'var(--red)', mt: '1rem' }}>Your username and email have to be unique</Box>
                    }
                </FormControl>}
            <Button
                disabled={isLoading}
                variant="contained"
                onClick={() => handle(form)}
                sx={{ background: 'var(--white)', color: 'var(--var1)', my: '2rem', fontWeight: 'bold', "&:hover": { color: 'var(--white)' } }}>Sign up</Button>

        </Box>
    );
};

export default CreateUserForm;
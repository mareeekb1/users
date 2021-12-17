import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, FormControl, TextField, InputAdornment, Button, CircularProgress } from '@mui/material';
import Person from '@mui/icons-material/Person';
import Key from '@mui/icons-material/Key';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { service } from '../../services/queries/users'
import { routes } from '../../services/routes/routes'
import { loginUser } from '../../services/redux/actions'

const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [form, setForm] = useState({
        username: '',
        password: '',
    })
    const dispatch = useDispatch()
    const nav = useNavigate()

    async function handleLogin() {
        setIsLoading(true)
        setError(false)
        const result = await service.loginS(form.username, form.password)
        console.log(result)
        if (result.user_aggregate.nodes?.length > 0) {
            dispatch(loginUser({ username: form.username, role: result.user_aggregate.nodes[0]?.role }))
            nav(routes.DASHBOARD)
        }
        setError(true)
        setIsLoading(false)
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column' }}>
            <ArrowBackIcon sx={{
                position: 'absolute', top: "2rem", left: '2rem', color: "var(--white)", zIndex: 10, cursor: 'pointer', p: "0.3rem", "&:hover": {
                    color: 'var(--var4)', boxShadow: '2px 2px 20px -5px var(--black)', borderRadius: 50,
                }
            }}
                onClick={() => nav(routes.HOME)} />
            <div style={{ color: 'var(--white)', fontSize: 36, fontWeight: 'bold', marginBottom: '2rem' }}>Sign in</div>
            {isLoading ?
                <Box sx={{ borderRadius: 2, background: 'var(--white)', display: 'flex', justifyContent: 'center', height: 160, width: 290.4, alignItems: 'center', flexDirection: 'column' }} >
                    <CircularProgress size={100} thicknes={200} />
                    <div style={{ position: 'absolute' }}>Loading</div>
                </Box> :
                <FormControl sx={{ backgroundColor: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', p: '2rem', borderRadius: 2 }}>
                    <TextField
                        label="Username"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                        variant="standard"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Person />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        variant="standard"
                        type="password"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Key />
                                </InputAdornment>
                            ),
                        }}
                    />
                    {error &&
                        <Box sx={{ color: 'var(--red)', mt: '1rem' }}>Wrong credentials</Box>
                    }
                </FormControl>
            }
            <Button
                disabled={isLoading}
                variant="contained"
                onClick={() => handleLogin()}
                sx={{ background: 'var(--white)', color: 'var(--var1)', my: '2rem', fontWeight: 'bold', "&:hover": { color: 'var(--white)' } }}>Sign in</Button>
        </Box>
    );
};

export default Login;
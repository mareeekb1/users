import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { styled } from '@mui/material/styles';
import { Box, Grow, Typography, Paper, Grid, ButtonGroup, Button, IconButton, Skeleton, Fade } from '@mui/material'
import Modal from '../../components/general/Modal';
import UpdateUserForm from '../../components/forms/UpdateUserForm';

import Cake from '@mui/icons-material/Cake';
import Person from '@mui/icons-material/Person';
import ArrowBack from '@mui/icons-material/ArrowBack';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import Delete from '@mui/icons-material/DeleteForever';
import Edit from '@mui/icons-material/Edit';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import StarIcon from '@mui/icons-material/Star';
import DeleteUserForm from '../../components/forms/DeleteUserForm';
import Logout from '@mui/icons-material/Logout';


import { routes } from '../../services/routes/routes';
import { service } from '../../services/queries/users';
import { getYearsFromBirthDate, reformatDate } from '../../services/helpers';
import { logoutUser } from '../../services/redux/actions'



const Detail = () => {
    const nav = useNavigate()
    const params = useParams();
    const dispatch = useDispatch()
    const user_selector = useSelector(state => state.user)
    const [isLoading, setIsLoading] = useState(true)
    const [modal, setModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [user, setUser] = useState({
        id: 1,
        role: '',
        is_premium: true,
        email: '',
        username: '',
        firstname: '',
        birth_date: '',
        description: '',
        lastname: '',
        phone: '',
    })

    useEffect(() => {
        async function fetch() {
            setIsLoading(true)
            const result = await service.getUserByIDs(+params.id)
            console.log(result)
            setUser(result.user_by_pk)
            setIsLoading(false)
        }
        fetch()
    }, [params.id]);


    const ItemWithoutLoading = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        fontSize: 18,
    }));

    const Item = ({ children }) => {
        if (isLoading) {
            return (
                <Box sx={{ background: 'var(--white)', height: '100%', borderRadius: 1, flex: 1 }}>
                    <Skeleton animation="wave" sx={{ height: '100%', mx: '1rem', borderRadius: 1 }} />
                </Box>)
        }
        return (
            <Fade in timeout={500} style={{ transformOrigin: '0 0 0' }} >
                <ItemWithoutLoading >
                    {children}
                </ItemWithoutLoading>
            </Fade>)
    }

    async function handleUpdateUser({ birth_date, description, firstname, lastname, phone, email }) {
        setIsLoading(true)
        const result = await service.updateUserByIdS(user.id, birth_date, description, email, firstname, lastname, phone)
        if (result.update_user_by_pk) {
            setUser({ ...user, ...result.update_user_by_pk })
        }
        setModal(false)
        setIsLoading(false)
    }
    async function handleDeleteUser() {
        setIsLoading(true)
        const result = await service.deleteUserByIdS(user.id)
        if (result.delete_user_by_pk) {
            nav(routes.DASHBOARD)
        }
        setIsLoading(false)
    }
    function handleLogout() {
        dispatch(logoutUser())
        nav(routes.LOGIN)
    }

    return (
        <Box sx={{ maxHeight: '100%' }}>
            <Logout sx={{
                position: 'absolute', top: "2rem", right: '2rem', color: "var(--white)", zIndex: 10, cursor: 'pointer', p: "0.3rem", "&:hover": {
                    color: 'var(--var4)', boxShadow: '2px 2px 20px -5px var(--black)', borderRadius: 50,
                }
            }}
                onClick={() => handleLogout()} />
            {!isLoading &&
                <>
                    <Modal
                        open={modal}
                        onClose={() => setModal(false)}
                        content={<UpdateUserForm data={user} onClose={() => setModal(false)} handle={(e) => handleUpdateUser(e)} />}
                        header={"Update user"}
                        loading={isLoading} disabled={isLoading}
                    />
                    <Modal
                        open={deleteModal}
                        onClose={() => setDeleteModal(false)}
                        content={<DeleteUserForm data={user} onClose={() => setDeleteModal(false)} handle={() => handleDeleteUser()} />}
                        header={"Delete user"}
                        loading={isLoading} disabled={isLoading}
                    />
                </>
            }
            <Grow in timeout={500} style={{ transformOrigin: '0 0 0' }} >
                <Box sx={{ mt: '2rem' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} sm={10} md={10} lg={10} xl={10}>
                                <Box sx={{ ...styles.with_icon, my: '1rem' }}>
                                    <IconButton
                                        onClick={() => nav(routes.DASHBOARD)}
                                        sx={{ background: 'var(--white)', color: "var(--var1)", fontSize: 36, borderRadius: 50, mr: '1rem', "&:hover": { background: 'var(--var2)', color: "var(--white)", } }}>
                                        <ArrowBack />
                                    </IconButton>
                                    <Typography sx={{ fontSize: 36, fontWeight: 'bold', color: 'var(--white)' }}>User profile</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={10} md={5} lg={5} xl={5}>
                                <Item >
                                    <Box sx={styles.title_with_icon}><ContactPageIcon sx={{ m: '0.5rem' }} />Account</Box>
                                    <Box sx={{ p: '0.5rem' }}>
                                        <Box sx={styles.with_icon}>
                                            <Person /><b>{`${user.firstname} ${user.lastname}`}</b>
                                            <Box sx={styles.with_icon}>
                                                <b style={{ margin: '0 1rem' }}>
                                                    {getYearsFromBirthDate(user.birth_date)}y</b><Cake sx={{ mr: '1rem' }} />
                                                <b>{reformatDate(user.birth_date)}</b>
                                            </Box>
                                        </Box>
                                        <Box sx={styles.with_icon}>
                                            <AccountBoxIcon />
                                            <span style={styles.with_icon}>username: <b>{user.username}</b></span>
                                        </Box>
                                        <Box sx={styles.with_icon}>
                                            <SupervisorAccountIcon />
                                            <span style={styles.with_icon}>role: <b>{user.role}</b></span>
                                        </Box>
                                        <Box sx={styles.with_icon}>
                                            {user.is_premium && <StarIcon sx={{ color: 'var(--yelllow)' }} />}
                                            <span style={styles.with_icon}><b>{user.is_premium ? 'premium user' : 'without premium'}</b></span>
                                        </Box>
                                    </Box>

                                </Item>
                            </Grid>
                            <Grid item xs={12} sm={10} md={5} lg={5} xl={5}>
                                <Grid container spacing={2} direction="column">
                                    <Grid item xs={12} sm={10} md={5} lg={5} xl={5}>
                                        <ButtonGroup variant="text" sx={{ background: 'var(--white)' }}>
                                            {user_selector.username === user.username &&
                                                <Button onClick={() => setModal(true)} disabled={isLoading} startIcon={<Edit />} sx={{ color: 'var(--grey)', "&:hover": { background: 'var(--var2)', color: "var(--white)", } }}>Edit</Button>
                                            }
                                            {user_selector.role === "ADMIN" &&
                                                <Button onClick={() => setDeleteModal(true)} disabled={isLoading} startIcon={<Delete />} sx={{ color: 'var(--grey)', "&:hover": { background: 'var(--var2)', color: "var(--white)", } }}>Delete</Button>
                                            }
                                        </ButtonGroup>
                                    </Grid>
                                    <Grid item xs={12} sm={10} md={5} lg={5} xl={5}>
                                        <Item>
                                            <Box sx={styles.title_with_icon}><ContactMailIcon sx={{ m: '0.5rem' }} />Contact</Box>
                                            <Box sx={{ p: '0.5rem' }}>
                                                <Box sx={styles.with_icon}><PhoneIcon />
                                                    <span>Phone: <b>{user.phone}</b></span>
                                                </Box>
                                                <Box sx={styles.with_icon}><EmailIcon />
                                                    <span>Email: <b>{user.email}</b></span>
                                                </Box>
                                            </Box>
                                        </Item>
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={10} md={10} lg={10} xl={10}>
                                <Item>
                                    <Box sx={styles.title_with_icon}><InfoIcon sx={{ m: '0.5rem' }} />Description</Box>
                                    <Box sx={{ p: '0.5rem' }}>{user.description}</Box>
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grow>
        </Box>

    );
};
const styles = {
    with_icon: { display: 'flex', alignItems: 'center' },
    title_with_icon: { display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: '20', borderBottom: '1px solid var(--grey)' },
}

export default Detail;
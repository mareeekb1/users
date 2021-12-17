import React, { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'

import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Grow, IconButton, Skeleton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteUserForm from '../../components/forms/DeleteUserForm';


import { routes } from '../../services/routes/routes';
import { query, service } from '../../services/queries/users';
import Modal from '../../components/general/Modal';


const Dashboard = () => {
    const nav = useNavigate()
    const params = useParams();
    const [deleteModal, setDeleteModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [list, setList] = useState([])
    const user = useSelector(state => state.user)


    const columns = [
        { field: 'id', headerName: 'ID', width: 30 },
        {
            field: 'username',
            headerName: 'Username',
            sortable: true,
            width: 100,
        },
        {
            field: 'email',
            headerName: 'Email',
            sortable: true,
            width: 160,
        },
        {
            field: 'role',
            headerName: 'Role',
            sortable: true,
            width: 80,
        },
        {
            field: 'is_premium',
            headerName: 'Premium',
            sortable: true,
            width: 100,
            renderCell: ({ value }) => (
                <Box sx={{ display: "flex", justifyContent: 'center', width: '100%' }}>
                    {value && <StarIcon sx={{ color: 'var(--yellow)' }} />}
                </Box>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: true,
            width: 160,
            renderCell: ({ row }) => (
                <Box>
                    <IconButton onClick={() => nav(routes.DETAIL + row.id)}><RemoveRedEyeIcon sx={{ color: 'var(--var1)' }} /></IconButton>
                    {user.role === "ADMIN" &&
                        <IconButton onClick={() => setDeleteModal(true)}><DeleteForeverIcon sx={{ color: 'var(--red)' }} /></IconButton>
                    }
                    <Modal
                        open={deleteModal}
                        onClose={() => setDeleteModal(false)}
                        content={<DeleteUserForm onClose={() => setDeleteModal(false)} handle={() => handleDeleteUser(row.id)} />}
                        header={"Delete user"}
                        loading={isLoading} disabled={isLoading}
                    />
                </Box>
            ),
        },
    ];
    const [{ fetching, data }, reexecuteQuery] = useQuery({
        query: query.getAllForTable,
    });
    const refresh = () => {
        reexecuteQuery({ requestPolicy: "network-only" });
    };

    useEffect(() => {
        if (data?.user) {
            setList(data.user)
        }
        refresh()
        // eslint-disable-next-line
    }, [params.id, data?.user]);

    async function handleDeleteUser(id) {
        setIsLoading(true)
        const result = await service.deleteUserByIdS(id)
        if (result.delete_user_by_pk) {
            setList(list.filter(item => item.id !== id))
        }
        setIsLoading(false)
    }

    return (
        <Grow in timeout={500} style={{ transformOrigin: '0 0 0' }} >
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={{ fontSize: 36, color: 'var(--white)', fontWeight: 'bold', margin: "2rem" }}>List of users</Typography>
                {fetching ?
                    <Skeleton animation="wave" sx={{ height: data?.user.length < 5 ? (200 + (data?.user.length * 40)) : 420, width: '66%', borderRadius: 1 }} />
                    : <div style={{ height: data?.user.length < 5 ? (200 + (data?.user.length * 40)) : 420, width: '66%', borderRadius: 1 }} className="data-table">
                        <DataGrid
                            loading={fetching || isLoading}
                            sx={{ borderRadius: 1, background: 'var(--white)', width: 'auto', p: '1rem' }}
                            rows={list}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            disableSelectionOnClick
                        />
                    </div>
                }
            </Box>
        </Grow>
    );
};
export default Dashboard;
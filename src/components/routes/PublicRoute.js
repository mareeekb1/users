import React from "react"
import { Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { routes } from '../../services/routes/routes'

const PublicRoute = ({ ...rest }) => {
    const user = useSelector((state) => state.user)

    if (user) return <Route {...rest} element={<Navigate to={routes.DASHBOARD} replace />} />
    return <Route {...rest} />
}

export default PublicRoute

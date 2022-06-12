import React from "react"
import { useSelector } from "react-redux"
import { Navigate, Route, useLocation } from "react-router-dom"

export const RequiredAuth = ({ children, roles }) => {
  let location = useLocation()
  const successLogin =
    useSelector(state => state.auth.login.token) ||
    localStorage.getItem("token")
  const role = useSelector(state => state.auth.login.role)
  const userHasRequiredRole = roles.includes(role) ? true : false
  if (!successLogin) {
    return <Navigate to='/auth' state={{ from: location }} />
  }
  if (successLogin && !userHasRequiredRole) {
    return <h2 style={{ color: "#fff" }}>Доступ запрещен</h2>
  }

  return children
}

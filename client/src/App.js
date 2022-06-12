import { ReactNotifications } from "react-notifications-component"
import React from "react"
import "react-notifications-component/dist/theme.css"
import "animate.css"
import { BrowserRouter } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getRole } from "./store/actions/auth"
import MyNavbar from "./components/Navbar/Navbar"
import { MyRoutes } from "./routes"

function App() {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getRole())
  }, [])
  return (
    <BrowserRouter>
      <div className='app'>
        <ReactNotifications isMobile={true} />
        <MyRoutes />
      </div>
    </BrowserRouter>
  )
}

export default App

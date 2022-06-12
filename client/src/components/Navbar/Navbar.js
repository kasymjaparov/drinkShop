import React from "react"
import "./Navbar.css"
import { Container, Nav, Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom"

const links = [{ text: "a", path: "" }]
export default function MyNavbar({ data = links, ...props }) {
  const token = window.localStorage.getItem("token")
  return (
    <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand>
          <NavLink className={"navbar_logo"} to='/'>
            AlcoShop
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='lk_nav'>
            {data.map(link => {
              return (
                <NavLink className='navbar_link' key={link.text} to={link.path}>
                  {link.text}
                </NavLink>
              )
            })}
            {token && (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  localStorage.removeItem("token")
                  document.location.replace("/")
                }}
              >
                Выйти
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

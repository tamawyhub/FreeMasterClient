import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function MainView ()
{
    const [expanded, setExpanded] =useState(false)
    const navLinkClass= ({isActive}) =>
    {
        return 'nav-link p-3 ' + (isActive?'active':'');
    }
    return (
        <>
        {/*
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <div className="container-fluid">
                <NavLink className="navbar-brand bg-danger text-uppercase" to="/">sochsolar team</NavLink>
                <button className="navbar-toggler" type="button"
                    data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className='nav-item'>
                            <NavLink className={navLinkClass} to="/">Home</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className={navLinkClass} to="/app-control-structure">Application Control Structure</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className={navLinkClass} to="/parameters">Parameters</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className={navLinkClass} to="/current-control">Current Control</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className={navLinkClass} to="/speed-control">Speed Control</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        */}
        <Navbar expand='lg' expanded={expanded} className='navbar navbar-dark bg-dark'>
            <Container>
                <NavLink className="navbar-brand bg-danger text-uppercase" to="/">sochsolar team</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={()=>setExpanded(!expanded)}/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Item>
                            <NavLink onClick={()=>setExpanded(false)} className={navLinkClass} to="/">Home</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink onClick={()=>setExpanded(false)} className={navLinkClass} to="/app-control-structure">Application Control Structure</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink onClick={()=>setExpanded(false)} className={navLinkClass} to="/parameters">Parameters</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink onClick={()=>setExpanded(false)} className={navLinkClass} to="/current-control">Current Control</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink onClick={()=>setExpanded(false)} className={navLinkClass} to="/speed-control">Speed Control</NavLink>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>    
    );
}

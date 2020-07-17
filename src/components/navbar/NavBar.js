import React from 'react';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBarContainer = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
                <Link to="/dashboard" className="nav-link">Home</Link>
                <Link to="/profile" className="nav-link">Profile</Link>
                <Link to="/messages" className="nav-link">Messages</Link>
                <Link to="/notifications" className="nav-link">Notifications</Link>
                <Link to="/settings" className="nav-link">Settings</Link>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
            </Form>
        </Navbar>
    );
}

export default NavBarContainer;
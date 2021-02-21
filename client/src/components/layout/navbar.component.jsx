import React, { useContext, useState } from 'react';
import authContext from '../../context/auth/authContext';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBIcon } from "mdbreact";

const Navbar = () => {

	const AuthContext = useContext(authContext);
	const { isAuthenticated, logout } = AuthContext;

	const onLogout = () => {
		logout();
		window.location.href = "http://localhost:3000/login";
	}

	const [state, setState] = useState({
		isOpen: false
	});

	const toggleCollapse = () => {
		setState({ isOpen: !state.isOpen });
	};

	const authLinks = (
		<MDBNavbarNav right>
			<MDBNavItem>
				<MDBNavLink onClick={onLogout} className="waves-effect waves-light" to="#!">
					<MDBIcon icon="sign-out-alt" /> Logout
				</MDBNavLink>
			</MDBNavItem>
		</MDBNavbarNav>
	)

	const guestLinks = (
		<MDBNavbarNav right>
			<MDBNavItem>
				<MDBNavLink className="waves-effect waves-light" to="/register">
					<MDBIcon icon="chevron-circle-up" /> Register
				</MDBNavLink>
			</MDBNavItem>
			<MDBNavItem>
				<MDBNavLink className="waves-effect waves-light" to="/login">
					<MDBIcon icon="sign-in-alt" /> Login
				</MDBNavLink>
			</MDBNavItem>
		</MDBNavbarNav>
	);

	return (
		<MDBNavbar color="elegant-color-dark" dark expand="md">
			<MDBNavbarBrand>
				<strong><MDBIcon icon="clipboard-list" /> To-do List</strong>
			</MDBNavbarBrand>
			<MDBNavbarToggler onClick={toggleCollapse} />
			<MDBCollapse id="navbarCollapse3" isOpen={state.isOpen} navbar>
				{isAuthenticated ? authLinks : guestLinks}
			</MDBCollapse>
		</MDBNavbar>
	);
}

export default Navbar;

import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLockOpen, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {Button, Container, Dropdown, Image, Nav, Navbar} from '@themesberg/react-bootstrap';
import User from "../assets/img/team/user.png";
import UserAdmin from "../assets/img/team/user-admin.png";
import {Redirect} from "react-router-dom";
import {Routes} from "../routes";
import axiosClient from "../utils/axios";
import getUserData from "../utils/getUserData";


export default () => {

    const userData = getUserData()
    const firstName = userData.firstName
    const lastName = userData.lastName
    const isSuperUser = userData.isSuperUser
    const [isAuthenticated, setIsAuthenticated] = useState(userData.isAuthenticated)

    const submitLogout = (e) => {
        e.preventDefault();
        axiosClient.post(
            "/api/logout",
            {withCredentials: true}
        ).then((res) => {
            if (res.status === 200) {
                setIsAuthenticated(false)
            }
        }).catch((err) => {
                console.log(err)
            }
        );
    }

    if (!isAuthenticated) {
        return <Redirect to={Routes.Signin.path}/>
    }

    return (
        <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
            <Container fluid className="px-0">
                <div className="d-flex justify-content-end w-100">
                    <Nav className="align-items-center">
                        <Dropdown as={Nav.Item}>
                            <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                                <div className="media d-flex align-items-center">
                                    <div
                                        className="media-body ms-2 me-2 text-dark align-items-center d-none d-lg-block">
                                        <span
                                            className="mb-0 font-small fw-bold">{firstName} {lastName} {isSuperUser ? <>(admin)</> : <></>}</span>
                                    </div>
                                    <Image src={isSuperUser ? UserAdmin : User}
                                           className="user-avatar md-avatar rounded-circle"/>
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                                <Button variant="transparent" size="sm"
                                        className="text-start col-md-12">
                                    <Dropdown.Item className="fw-bold" href={Routes.ChangePassword.path}>
                                        <FontAwesomeIcon icon={faLockOpen} className="text-success me-2"/> Change Password
                                    </Dropdown.Item>
                                </Button>
                                <Button onClick={submitLogout} variant="transparent" size="sm"
                                        className="text-start col-md-12">
                                    <Dropdown.Item className="fw-bold">
                                        <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2"/> Logout
                                    </Dropdown.Item>
                                </Button>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </div>
            </Container>
        </Navbar>
    );
};

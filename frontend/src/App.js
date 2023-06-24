import React, {useEffect, useState} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {Routes} from "./routes";

import Companies from "./pages/crud/companies/Companies";
import Employees from "./pages/crud/employees/Employees";

import Signin from "./pages/auth/Signin";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ConfirmPassword from "./pages/auth/ConfirmPassword";
import ChangePassword from "./pages/auth/ChangePassword";
import NotFoundPage from "./pages/auth/NotFound";
import ServerError from "./pages/auth/ServerError";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";

import Home from "./pages/Home";


const RouteWithLoader = ({component: Component, ...rest}) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Route {...rest} render={props => (<> <Preloader show={loaded ? false : true}/> <Component {...props} /> </>)}/>
    );
};

const RouteWithSidebar = ({component: Component, ...rest}) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Route {...rest} render={props => (
            <>
                <Preloader show={loaded ? false : true}/>
                <Sidebar/>
                <main className="content" id="content">
                    <Navbar/>
                    <Component {...props} />
                    <Footer/>
                </main>
            </>
        )}
        />
    );
};

export default () => (
    <BrowserRouter>
        <Switch>
            {/*Auth */}
            <RouteWithLoader exact path={Routes.Signin.path} component={Signin}/>
            <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword}/>
            <RouteWithLoader exact path={Routes.ConfirmPassword.path} component={ConfirmPassword}/>
            <RouteWithLoader exact path={Routes.ChangePassword.path} component={ChangePassword}/>
            <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage}/>
            <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError}/>

            {/*Pages*/}
            <RouteWithSidebar exact path={Routes.Home.path} component={Home}/>
            <RouteWithSidebar exact path={Routes.Companies.path} component={Companies}/>
            <RouteWithSidebar exact path={Routes.Employees.path} component={Employees}/>

            <Redirect to={Routes.NotFound.path}/>
        </Switch>
    </BrowserRouter>
);

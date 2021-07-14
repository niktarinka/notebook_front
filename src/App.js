import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import RegistrForm from "./component/RegistrForm/RegistrForm";
import LoginForm from "./component/LoginForm/loginForm";
import ProfileUser from "./component/ProfileUser/ProfileUser";
import NotebookForm from "./component/NotebookForm/NotebookForm";
import UserComponent from "./component/UserComponent/UserComponent";
import {Navbar} from "react-bootstrap";
import Home from "./component/Home/Home";

export default function App() {
    return (
        <Router>
            <>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand className="mr-auto">Notebook</Navbar.Brand>
                    <div className="pr-5">
                        <UserComponent/>
                    </div>
                </Navbar>

                <Switch>
                    <Route path="/login">
                        <LoginForm/>
                    </Route>
                    <Route path="/registr">
                        <RegistrForm/>
                    </Route>
                    <Route path="/profile">
                        <ProfileUser/>
                    </Route>
                    <Route path="/notebook">
                        <NotebookForm/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </>
        </Router>
    );
}





import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import RegistrForm from "./component/RegistrForm/RegistrForm";
import LoginForm from "./component/LoginForm/loginForm";
import ProfileUser from "./component/ProfileUser/ProfileUser";
import NotebookForm from "./component/NotebookForm/NotebookForm";


export default function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/profile">ProfileUser</Link>
                        </li>
                        <li>
                            <Link to="/login">LoginForm</Link>
                        </li>
                        <li>
                            <Link to="/registr">RegistrForm</Link>
                        </li>
                        <li>
                            <Link to="/notebook">NotebookForm</Link>
                        </li>
                    </ul>
                </nav>

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
                </Switch>
            </div>
        </Router>
    );
}



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
import UserComponent from "./component/UserComponent/UserComponent";

export default function App() {
    return (
        <Router>
            <div>

                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-item nav-link active"><Link to="/profile">ProfileUser</Link></a>
                            <a className="nav-item nav-link active"><Link to="/login">LoginForm</Link> </a>
                            <a className="nav-item nav-link active"><Link to="/registr">RegistrForm</Link> </a>
                            <a className="nav-item nav-link active"><Link to="/notebook">NotebookForm</Link> </a>
                            <a className="nav-item nav-link active"><UserComponent/></a>
                        </div>
                    </div>
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



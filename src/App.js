import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
}  from "react-router-dom";
import RegistrForm from "./component/RegistrForm/RegistrForm";
import LoginForm from "./component/LoginForm/loginForm";


export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">LoginForm</Link>
            </li>
            <li>
              <Link to="/registr">RegistrForm</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/registr">
            <RegistrForm />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}


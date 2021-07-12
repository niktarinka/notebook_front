import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {Button, Dropdown, DropdownButton} from "react-bootstrap";
import {exitUser, setUserAuth, setUserData, setUserToken} from "../../store/actions/actions";
import axios from "axios";


class UserComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_data: {username: null},
        };

        this.linkClick = this.linkClick.bind(this);
        this.exitClick = this.exitClick.bind(this);

    }

    linkClick(link) {
        this.props.history.push('/' + link);
    }

    exitClick() {
        this.props.exitUser();
        localStorage.removeItem('token');
        this.props.history.push('/home');
    }

    async componentDidMount() {
        let token = localStorage.getItem('token');
        console.log(token);
        axios.post(`http://127.0.0.1:8000/api/user/get_data/`, {}, {
            headers: {'Authorization': `Token ${token}`}
        }).then(reses => {
            this.props.setUserData(reses.data);
            this.props.setUserTokenAction(token);
            this.props.setUserAuth(true);
        }).catch(error => {

        })


    }

    render() {

        let html;
        if (this.props.authentication) {
            html =
                <DropdownButton title={this.props.userData.username} id="bg-nested-dropdown" variant="outline-light">
                    <Dropdown.Item eventKey="1" onClick={this.linkClick.bind(this, "profile")}>Профиль</Dropdown.Item>
                    <Dropdown.Item eventKey="2"
                                   onClick={this.linkClick.bind(this, "notebook")}> Блокноты</Dropdown.Item>
                    <Dropdown.Item eventKey="3" onClick={this.exitClick}> Выход</Dropdown.Item>
                </DropdownButton>
        } else {
            html = <div>
                <Button variant="outline-light" onClick={this.linkClick.bind(this, "login")}>Войти</Button>
            </div>
        }
        return (html)
    }
}


function mapDispatchToProps(dispatch) {
    return {
        exitUser: () => dispatch(exitUser()),
        setUserTokenAction: (token) => dispatch(setUserToken(token)),
        setUserAuth: (authentication) => dispatch(setUserAuth(authentication)),
        setUserData: (data) => dispatch(setUserData(data)),
    }
}

const mapStateToProps = (state) => ({
    authentication: state.user.authentication,
    userToken: state.user.token,
    userData: state.user.data,
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserComponent));



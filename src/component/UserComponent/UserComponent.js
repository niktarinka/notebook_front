import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {Button, Dropdown, DropdownButton} from "react-bootstrap";
import axios from "axios";
import {exitUser} from "../../store/actions/actions";


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
        this.props.history.push('/home');
    }

    async shouldComponentUpdate(nextProps, nextState) {
        if (this.props.authentication) return false;

        await axios.post(`http://127.0.0.1:8000/api/user/get_data/`, {}, {
            headers: {'Authorization': `Token ${this.props.userToken}`}
        })
            .then(res => {
                this.setState({
                    user_data: res.data,
                })
            })
            .catch(error => {
            })

        return true;
    }


    render() {

        let html;
        if (this.props.authentication) {
            html =
                <DropdownButton title={this.state.user_data.username} id="bg-nested-dropdown" variant="outline-light">
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
    }
}

const mapStateToProps = (state) => ({
    authentication: state.user.authentication,
    userToken: state.user.token

})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserComponent));


// export default connect(null, mapDispatchToProps)(withRouter(UserComponent));
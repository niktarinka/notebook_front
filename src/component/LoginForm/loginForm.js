import React, {Component} from 'react'
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {withRouter} from 'react-router-dom';
import axios from "axios";
import {connect} from 'react-redux'
import {setUserToken, setUserAuth, setUserData} from "../../store/actions/actions";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        const id = Math.floor(Math.random() * Math.floor(99999999999));
        this.state = {
            username: `test_${id}`,
            password: "39689794aa",
            password_invalid: false,
            username_invalid: false,
            mess_show: false,
            token: "error",

        };

        this.usernameChange = this.usernameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.userLoginClick = this.userLoginClick.bind(this);
        this.homeClick = this.homeClick.bind(this);
        this.regClick = this.regClick.bind(this);
        this.messShow = this.messShow.bind(this);
    }

    regClick() {
        this.props.history.push('/registr');
    }

    messShow(flag) {
        this.setState({
            mess_show: flag,
        })
    }

    usernameChange(e) {
        this.setState(state => ({
            username: e.target.value,
            password_invalid: false,
            username_invalid: false
        }));
    }

    passwordChange(e) {
        this.setState(state => ({
            password: e.target.value,
            password_invalid: false,
            username_invalid: false
        }));
    }

    async userLoginClick() {

        await axios.post(`http://127.0.0.1:8000/api/user/login/`, this.state)
            .then(res => {

                axios.post(`http://127.0.0.1:8000/api/user/get_data/`, {}, {
                    headers: {'Authorization': `Token ${res.data.token}`}
                }).then(reses => {
                    this.props.setUserData(reses.data);
                }).catch(error=>{
                    console.log(error);
                })
                localStorage.setItem('token', res.data.token);
                this.props.setUserTokenAction(res.data.token);
                this.props.setUserAuth(true);
                this.props.history.push('/notebook');

            }).catch(error => {
                this.setState(state => ({
                    password_invalid: true,
                    username_invalid: true
                }));
            });


    }

    homeClick() {
        this.props.history.push('/');
    }

    async componentDidMount() {
        await axios.get(`http://127.0.0.1:8000/api/user/last_user/`)
            .then(res => {
                const username = res.data.username;
                this.setState({
                    username: username
                })
            })
    }

    render() {

        return (

            <div>
                <Container className="pt-sm-2">
                    <Row className="justify-content-md-center">
                        <Col md={3}/>
                        <Col className="text-center">
                            <h1>??????????</h1>
                        </Col>
                        <Col md={3}/>
                    </Row>
                </Container>

                <Container className="pt-sm-5">
                    <Row className="justify-content-md-center">
                        <Col md={3}/>
                        <Col md={5}>
                            <Card>
                                <Card.Body>
                                    <Form>
                                        <Form.Group as={Row}>
                                            <Form.Label column sm="3">
                                                ??????????
                                            </Form.Label>
                                            <Col sm="9">
                                                <Form.Control type="text" isInvalid={this.state.username_invalid}
                                                              value={this.state.username}
                                                              onChange={this.usernameChange}/>
                                            </Col>
                                        </Form.Group>


                                        <Form.Group as={Row}>
                                            <Form.Label column sm="3">
                                                ????????????
                                            </Form.Label>
                                            <Col sm="9">
                                                <Form.Control type="password"
                                                              isInvalid={this.state.password_invalid}
                                                              onChange={this.passwordChange}
                                                              value={this.state.password}
                                                />
                                            </Col>
                                        </Form.Group>


                                        <Form.Group as={Row}>

                                            <Col sm="5" className="text-center">
                                                <Button variant="primary" type="button"
                                                        onClick={this.homeClick}

                                                >
                                                    ??????????
                                                </Button>
                                            </Col>

                                            <Col sm="5" className="text-right">
                                                <Button variant="primary" type="button" onClick={this.userLoginClick}>
                                                    ??????????
                                                </Button> </Col>
                                        </Form.Group>

                                        <Form.Group as={Row}>
                                            <Col sm="4"/>
                                            <Col sm="4" className="text-center">
                                                <Button variant="link" onClick={this.regClick}>??????????????????????</Button>
                                            </Col>
                                            <Col sm="4"/>
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}/>
                    </Row>
                    <Row className="justify-content-md-center pt-2">
                        <Col md={3}/>
                        <Col md={5}>
                            <Alert variant='success' show={this.state.mess_show} onClose={this.messShow.bind(false)}
                                   dismissible>
                                ?????????? ?????????????? {this.state.token}

                            </Alert>
                        </Col>
                        <Col md={3}/>
                    </Row>
                </Container>
            </div>

        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setUserTokenAction: (token) => dispatch(setUserToken(token)),
        setUserAuth: (authentication) => dispatch(setUserAuth(authentication)),
        setUserData: (data) => dispatch(setUserData(data)),

    }
}


export default connect(null, mapDispatchToProps)(withRouter(LoginForm));
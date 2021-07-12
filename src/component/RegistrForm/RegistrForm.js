import React, {Component} from 'react'
import axios from 'axios';
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {withRouter} from 'react-router-dom';

class RegistrForm extends Component {

    constructor(props) {
        super(props);
        const id = Math.floor(Math.random() * Math.floor(99999999999));
        this.state = {
            username: `test_${id}`,
            email: `test_${id}@gmail.com`,
            password: "39689794aa",
            password_second: "39689794aa",
            username_invalid: false,
            password_invalid: false,
            password_second_invalid: false,
            email_invalid: false,
            mess_show: false
        };

        this.loginChange = this.loginChange.bind(this);
        this.passwordFirstChange = this.passwordFirstChange.bind(this);
        this.passwordSecondChange = this.passwordSecondChange.bind(this);
        this.homeClick = this.homeClick.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.registrClick = this.registrClick.bind(this);
        this.messShow = this.messShow.bind(this);
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/user/last_id/`)
            .then(res => {
                const id = res.data.user_id + 1;
                this.setState({
                    username: `test_${id}`,
                    email: `test_${id}@gmail.com`,
                })
            })
    }

    loginChange(e) {
        this.setState(state => ({
            username: e.target.value,
            username_invalid: false
        }));
    }

    emailChange(e) {
        this.setState(state => ({
            email: e.target.value,
            email_invalid: false
        }));
    }

    passwordFirstChange(e) {
        this.setState(state => ({
            password: e.target.value,
            password_invalid: false
        }));
    }

    passwordSecondChange(e) {
        this.setState(state => ({
            password_second: e.target.value,
            password_second_invalid: false
        }));
    }

    registrClick() {
        const data = {
            "username": this.state.username,
            "email": this.state.email,
            "password": this.state.password,
        }

        axios.post(`http://127.0.0.1:8000/api/user/`, data)
            .then(res => {
                this.setState({
                    mess_show: true,
                })

            }).catch(error => {
            if ("username" in error.response.data) {
                this.setState({username_invalid: true})
            }

            if ("email" in error.response.data) {

                this.setState({email_invalid: true});
            }

            if ("password" in error.response.data) {
                this.setState({password_invalid: true});
                this.setState({password_second_invalid: true});
            }
        });
    }

    homeClick() {
        this.props.history.push('/');
    }

    messShow(flag) {
        this.setState({
            mess_show: flag,
        })
    }

    render() {
        return (
            <div>
                <Container className="pt-sm-2">
                    <Row className="justify-content-md-center">
                        <Col md={3}/>
                        <Col className="text-center">
                            <h1>Регистрация</h1>
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
                                        <Form.Group as={Row} controlId="formPlaintextLogin">
                                            <Form.Label column sm="3">
                                                Логин
                                            </Form.Label>
                                            <Col sm="9">
                                                <Form.Control type="text" isInvalid={this.state.username_invalid}
                                                              value={this.state.username}
                                                              onChange={this.loginChange}/>
                                            </Col>
                                        </Form.Group>


                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="3">
                                                Почта
                                            </Form.Label>
                                            <Col sm="9">
                                                <Form.Control type="text"
                                                              value={this.state.email}
                                                              isInvalid={this.state.email_invalid}
                                                              onChange={this.emailChange}/>
                                            </Col>
                                        </Form.Group>


                                        <Form.Group as={Row} controlId="formPlaintextPassword_1">
                                            <Form.Label column sm="3">
                                                Пароль #1
                                            </Form.Label>
                                            <Col sm="9">
                                                <Form.Control type="password" isInvalid={this.state.password_invalid}
                                                              onChange={this.passwordFirstChange}
                                                              value={this.state.password}
                                                />
                                            </Col>
                                        </Form.Group>


                                        <Form.Group as={Row} controlId="formPlaintextPassword_2">
                                            <Form.Label column sm="3">
                                                Пароль #2
                                            </Form.Label>
                                            <Col sm="9">
                                                <Form.Control type="password"
                                                              isInvalid={this.state.password_second_invalid}
                                                              onChange={this.passwordSecondChange}
                                                              value={this.state.password_second}
                                                />
                                            </Col>
                                        </Form.Group>


                                        <Form.Group as={Row} controlId="formButton">

                                            <Col sm="5" className="text-center">
                                                <Button variant="primary" type="button"
                                                        onClick={this.homeClick}
                                                >
                                                    Назад
                                                </Button>
                                            </Col>

                                            <Col sm="5" className="text-right">
                                                <Button variant="primary" type="button" onClick={this.registrClick}>
                                                    Регистрация
                                                </Button> </Col>
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
                                Пользователь зарегестрирован.
                                <Alert.Link href="/login"> Перейти на страницу логина</Alert.Link>
                            </Alert>
                        </Col>
                        <Col md={3}/>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default withRouter(RegistrForm);

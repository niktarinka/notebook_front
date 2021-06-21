import React, {Component} from 'react'
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {withRouter} from 'react-router-dom';
import axios from "axios";
import {connect} from "react-redux";

class ProfileUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_data: {},
        };
    }


    componentDidMount() {
        axios.post(`http://127.0.0.1:8000/api/user/get_data/`, {}, {
            headers: {'Authorization': `Token ${this.props.userToken}`}
        })
            .then(res => {
                console.log(res.data);
                this.setState({
                    user_data: res.data,
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

                            <h1>Профиль пользователя</h1>
                        </Col>
                        <Col md={3}/>
                    </Row>
                </Container>

                <Container className="pt-sm-5">
                    <Row className="justify-content-md-center">
                        <Col md={3}/>
                        <Col md={6}>
                            <Card>
                                <Card.Body>
                                    <Form>
                                        {Object.keys(this.state.user_data).map((value, key) => {
                                            const html = <Form.Group as={Row}>
                                                                <Form.Label column sm="3">{value}</Form.Label>
                                                                <Col sm="9">
                                                                    <Form.Control type="text" value={this.state.user_data[value]}/>
                                                                </Col>
                                                            </Form.Group>
                                            return (html);
                                        })}

                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}/>
                    </Row>
                </Container>
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    userToken: state.user.token
})
export default connect(mapStateToProps)(withRouter(ProfileUser));

// export default (withRouter(ProfileUser);

import React, {Component} from 'react'
import {Card, Col, Container, Form, Row} from "react-bootstrap";
import {withRouter} from 'react-router-dom';
import axios from "axios";
import {connect} from "react-redux";

class ProfileUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_data: {},
        };
       if (!this.props.authentication){
            this.props.history.push('/home');}
    }

    async componentDidMount() {
        if (!this.props.authentication) return;

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
                                            let te = this.state.user_data[value];
                                            if (te === null) te = "";
                                            const html = <Form.Group as={Row} key={key}>
                                                <Form.Label column sm="3">{value}</Form.Label>
                                                <Col sm="9">
                                                    <Form.Control type="text" defaultValue={te}/>
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
    authentication: state.user.authentication,
    userToken: state.user.token
})
export default connect(mapStateToProps)(withRouter(ProfileUser));

// export default (withRouter(ProfileUser);

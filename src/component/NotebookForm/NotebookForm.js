import React, {Component} from 'react'
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {withRouter} from 'react-router-dom';
import axios from "axios";
import {connect} from 'react-redux'


class NotebookForm extends Component {
    state = {
        notebooks: []
    }

    async componentDidMount() {
        await axios.get(`http://127.0.0.1:8000/api/notebook/list`, {
            headers: {'Authorization': `Token ${this.props.userToken}`}
        })
            .then(res => {
                console.log(res.data.results);
                this.setState({
                    notebooks: res.data.results,
                })
            })
            .catch(error => {
            })
    }

    render() {
        console.log(this.state.notebooks);
        const noteBoooksHTML = this.state.notebooks.map((notebook,key) =>
            <h1 key={key}>{notebook.name}</h1>
        );


        return (
            <div>
                <Container className="pt-sm-2">
                    <Row className="justify-content-md-center">
                        <Col md={3}/>
                        <Col className="text-center">
                            {noteBoooksHTML}
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

export default connect(mapStateToProps)(withRouter(NotebookForm));

import React, {Component} from 'react'
import {Card, CloseButton, Col, Container, ListGroup, Row} from "react-bootstrap";
import {withRouter} from 'react-router-dom';
import axios from "axios";
import {connect} from 'react-redux'


class NotebookForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notebooks: [],
            notes: [],
            note_body: [],
        }
        if (!this.props.authentication) {
            this.props.history.push('/home');
        }
        this.notebookClick = this.notebookClick.bind(this);
        this.noteClick = this.noteClick.bind(this);
        this.notebookDell = this.notebookDell.bind(this);

    }

    async componentDidMount() {
        if (!this.props.authentication) return;
        await axios.get(`http://127.0.0.1:8000/api/notebook/list`, {
            headers: {'Authorization': `Token ${this.props.userToken}`}
        })
            .then(res => {
                console.log(res.data);

                this.setState({
                    notebooks: res.data,
                })
            })
            .catch(error => {
            })
    }

    async notebookDell(id) {
        await axios.delete(`http://127.0.0.1:8000/api/notebook/${id}`, {
            headers: {'Authorization': `Token ${this.props.userToken}`}
        })
            .then(res => {
                const result = this.state.notebooks.filter(notebook => notebook.id !== id);
                this.setState({
                    notebooks: result,
                    notes: [],
                })

            })
            .catch(error => {
                console.log(error);
            })

    }

    async notebookClick(notes_url) {
        await axios.get(notes_url, {
            headers: {'Authorization': `Token ${this.props.userToken}`}
        })
            .then(res => {
                this.setState({
                    notes: res.data,
                })
                console.log(res.data);
            })
            .catch(error => {
            })
    }

    async noteClick(url) {
        await axios.get(url, {
            headers: {'Authorization': `Token ${this.props.userToken}`}
        })
            .then(res => {
                this.setState({
                    note_body: res.data,
                })
            })
            .catch(error => {
            })
    }

    render() {

        const noteBoooksHTML = this.state.notebooks.map((notebook, key) =>
            <ListGroup.Item onClick={this.notebookClick.bind(this, notebook.notes_url)} key={key}>
                <span className="visually-hidden">{notebook.name}</span>
                <CloseButton onClick={this.notebookDell.bind(this, notebook.id)}/>
            </ListGroup.Item>
        );


        const notesHTML = this.state.notes.map((note, key) =>

                <ListGroup.Item onClick={this.noteClick.bind(this, note.url)} key={key}>
                    <span className="visually-hidden">{note.name}</span>
                    <CloseButton onClick={this.notebookDell.bind(this, note.id)}/>
                </ListGroup.Item>
            )
        ;

        const noteBodyHTML = (
            <Row className="justify-content-md-center">
                <div className="card">
                    <div className="card-body">
                        {this.state.note_body.body}
                    </div>
                </div>
            </Row>
        );

        return (
            <div>
                <Container className="pt-sm-2" fluid>
                    <Row>
                        <Col className="text-center" md={2}>
                            <Card style={{width: '18rem'}}>
                                <Card.Header>Блокноты</Card.Header>
                                <ListGroup variant="flush">
                                    {noteBoooksHTML}
                                </ListGroup>
                            </Card>

                        </Col>
                        <Col className="text-center" md={2}>
                            <Card style={{width: '18rem'}}>
                                <Card.Header>Заметки</Card.Header>
                                <ListGroup variant="flush">

                                    {notesHTML}
                                </ListGroup>
                            </Card>


                        </Col>
                        <Col md={8} className="text-left">
                            <Container className="pt-sm-2" fluid>
                                {noteBodyHTML}
                            </Container>
                        </Col>
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

export default connect(mapStateToProps)(withRouter(NotebookForm));

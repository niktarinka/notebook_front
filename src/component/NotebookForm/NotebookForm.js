import React, {Component} from 'react'
import {Col, Container, Row} from "react-bootstrap";
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
    }

    async componentDidMount() {
        await axios.get(`http://127.0.0.1:8000/api/notebook/list`, {
            headers: {'Authorization': `Token ${this.props.userToken}`}
        })
            .then(res => {
                this.setState({
                    notebooks: res.data,
                })
            })
            .catch(error => {
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
            <div className="card" key={key}>
                <div className="card-body" onClick={this.notebookClick.bind(this, notebook.notes_url)}>
                    {notebook.name}
                </div>
            </div>
        );

        const notesHTML = this.state.notes.map((note, key) =>
            <div className="card" key={key} onClick={this.noteClick.bind(this, note.url)}>
                <div className="card-body">
                    {note.name}
                </div>
            </div>
        );

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
                            {noteBoooksHTML}
                        </Col>
                        <Col className="text-center" md={2}>
                            {notesHTML}
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

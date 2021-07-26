import React, {Component} from 'react'
import {Button, Card, CloseButton, Col, Container, FormControl, InputGroup, ListGroup, Row} from "react-bootstrap";
import {withRouter} from 'react-router-dom';
import axios from "axios";
import {connect} from 'react-redux'
import ModalName from "../ModelName/ModelName";

class NotebookForm_v1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notebooks: [],
            notes: [],
            noteBody: [],
            noteBookName: "",
            noteName: "",
            noteBookID: null,
            modalShow: false,
        }
        if (!this.props.authentication) {
            this.props.history.push('/home');
        }
        this.notebookClick = this.notebookClick.bind(this);
        this.noteClick = this.noteClick.bind(this);
        this.notebookDell = this.notebookDell.bind(this);
        this.addNoteBook = this.addNoteBook.bind(this);
        this.noteBookNameChange = this.noteBookNameChange.bind(this);
        this.noteNameChange = this.noteNameChange.bind(this);
        this.addNote = this.addNote.bind(this);
        this.noteDell = this.noteDell.bind(this);
        this.noteBodyChange = this.noteBodyChange.bind(this);
        this.noteSave = this.noteSave.bind(this);
        this.shouModalName = this.shouModalName.bind(this);
    }

    async componentDidMount() {
        if (!this.props.authentication) return;
        await axios.get(`http://127.0.0.1:8000/api/notebook/list`, {
            headers: {'Authorization': `Token ${this.props.userToken}`}
        })
            .then(res => {
                this.setState({
                    notebooks: res.data,
                })
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
            })
    }

    async noteDell(id) {
        await axios.delete(`http://127.0.0.1:8000/api/note/${id}`, {
            headers: {'Authorization': `Token ${this.props.userToken}`}
        })
            .then(res => {
                const result = this.state.notes.filter(note => note.id !== id);
                this.setState({
                    notes: result,
                })

            })
            .catch(error => {
            })
    }

    async notebookClick(notes_url, noteBookID) {
        this.setState({
            noteBookID: noteBookID,
            noteBody: [],
        })

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

    componentDidUpdate(prevProps) {
        console.log(this.state);

    }

    shouModalName() {
        this.setState({modalShow: true});
    }

    async noteSave() {
        const data = {body: this.state.noteBody.body};
        await axios.put(`http://127.0.0.1:8000/api/note/${this.state.noteBody.id}`, data, {
            headers: {'Authorization': `Token ${this.props.userToken}`}
        })
            .then(res => {
            })
            .catch(error => {
                console.log(error.response.data);
            })
    }

    noteBodyChange(e) {
        let noteBody = this.state.noteBody;
        noteBody.body = e.target.value;

        this.setState({
            noteBody: noteBody
        });
        this.noteSave();
    }

    async noteClick(url) {

        await axios.get(url, {
            headers: {'Authorization': `Token ${this.props.userToken}`}
        })
            .then(res => {
                this.setState({
                    noteBody: res.data,
                })
            })
            .catch(error => {
            })

    }

    async addNoteBook() {
        const data = {name: this.state.noteBookName}
        await axios.post("http://127.0.0.1:8000/api/notebook/", data, {
            headers: {'Authorization': `Token ${this.props.userToken}`}
        })
            .then(res => {
            })
            .catch(error => {
            })

        await axios.get(`http://127.0.0.1:8000/api/notebook/list`, {
            headers: {'Authorization': `Token ${this.props.userToken}`}
        })
            .then(res => {
                this.setState({
                    notebooks: res.data,
                })
            })
    }

    async addNote(name) {
        const data = {
            name: name,
            note_book_id: this.state.noteBookID,
            body: ""
        }

        await axios.post("http://127.0.0.1:8000/api/note/", data, {
            headers: {'Authorization': `Token ${this.props.userToken}`}
        })
            .then(res => {
            })
            .catch(error => {
            })

        await axios.get(`http://127.0.0.1:8000/api/note/list/${this.state.noteBookID}`, {
            headers: {'Authorization': `Token ${this.props.userToken}`}
        })
            .then(res => {
                this.setState({
                    notes: res.data,
                })
            })


    }

    noteBookNameChange(e) {
        this.setState({
            noteBookName: e.target.value
        });

    }

    noteNameChange(e) {
        this.setState(state => ({
            noteName: e.target.value
        }));
    }

    render() {

        const noteBoooksHTML = this.state.notebooks.map((notebook, key) =>
            <ListGroup.Item onClick={this.notebookClick.bind(this, notebook.notes_url, notebook.id)} key={key}>
                <a className="visually-hidden">{notebook.name}</a>
                <CloseButton onClick={this.notebookDell.bind(this, notebook.id)}/>
            </ListGroup.Item>);

        const notesHTML = this.state.notes.map((note, key) =>
            <ListGroup.Item onClick={this.noteClick.bind(this, note.url)} key={key}>
                <span className="visually-hidden">{note.name}</span>
                <CloseButton onClick={this.noteDell.bind(this, note.id)}/>
            </ListGroup.Item>);

        let noteBodyHTML = "";

        if (this.state.noteBody.body !== undefined) {
            noteBodyHTML = (
                <>
                    <InputGroup className="mb-3">
                        <FormControl value={this.state.noteBody.body} onChange={this.noteBodyChange} as="textarea"
                                     rows={20}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        {/*<Button variant="outline-secondary" onClick={this.noteSave}>*/}
                        {/*    Сохранить*/}
                        {/*</Button>*/}
                    </InputGroup>
                </>
            );
        }

        return (
            <div>
                <ModalName show={this.state.modalShow} addNote={this.addNote}/>
                <Container className="pt-sm-2" fluid>
                    <Row>
                        <Col className="text-center" md={2}>
                            <Card style={{width: '18rem'}}>
                                <Card.Header className="justify-content-between">Блокноты
                                    {/*<Button variant='success' onClick={this.addNoteBook} size="sm"></Button>*/}
                                </Card.Header>
                                <ListGroup variant="flush">
                                    {noteBoooksHTML}
                                    <ListGroup.Item>
                                        <InputGroup className="mb-3">
                                            <FormControl onChange={this.noteBookNameChange}
                                                         value={this.state.noteBookName}/>
                                            {/*<Button variant="outline-secondary" onClick={this.addNoteBook}>*/}
                                            {/*    Добавить*/}
                                            {/*</Button>*/}
                                            <Button variant="outline-secondary" onClick={this.shouModalName}>
                                                Добавить
                                            </Button>

                                        </InputGroup>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>

                        </Col>

                        <Col className="text-center" md={2}>
                            <Card style={{width: '18rem'}}>
                                <Card.Header>Заметки</Card.Header>
                                <ListGroup variant="flush">
                                    {notesHTML}
                                    <ListGroup.Item>
                                        <InputGroup className="mb-3">
                                            {/*<FormControl onChange={this.noteNameChange}*/}
                                            {/*             value={this.state.noteName}/>*/}
                                            <Button variant="outline-secondary" onClick={this.shouModalName}>
                                                Добавить
                                            </Button>


<></>

                                        </InputGroup>
                                    </ListGroup.Item>
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

export default connect(mapStateToProps)(withRouter(NotebookForm_v1));

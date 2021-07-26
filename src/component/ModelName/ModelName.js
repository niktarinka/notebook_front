import React, {Component} from 'react'
import {Button, Form, Modal} from "react-bootstrap";

class ModalName extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: props.show,
            nameInvalid: false,
            noteName: "",
        };
        console.log(this.state);
        this.show = this.show.bind(this);
        this.nameChange = this.nameChange.bind(this);

    }

    show(flag) {
        this.setState({show: flag});
    }

    nameChange(e) {
        this.setState({noteName: e.target.value})
    }

    noteSave() {
        this.props.addNote(this.state.noteName);
        this.show(false);
    }

    render() {
        return (
            <Modal show={this.state.show}>
                <Modal.Header closeButton>
                    <Modal.Title>Название заметки</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control type="text" isInvalid={this.state.nameInvalid} value={this.state.noteName}
                                      onChange={this.nameChange}/>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.show.bind(this, false)}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={this.noteSave}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ModalName;

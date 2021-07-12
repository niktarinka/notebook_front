import React, {Component} from 'react'
import { Col, Container, Row} from "react-bootstrap";

class Home extends Component {

    render() {

        return (

            <div>
                <Container className="pt-sm-2">
                    <Row className="justify-content-md-center">
                        <Col md={3}/>
                        <Col className="text-center">
                            <h1>Главная страница</h1>
                        </Col>
                        <Col md={3}/>
                    </Row>
                </Container>

            </div>

        )
    }
}



export default Home
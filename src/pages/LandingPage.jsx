import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap'; 

function LandingPage() {
    const [nickname, setNickname] = useState("");

    const handleNicknameChange = (event) => {
      setNickname(event.target.value);
    };

    const handleCreateClick = () => {
      console.log("Nickname:", nickname);
    };


    return (
        <>
            <Container>
                <Row className="vh-100 justify-content-left align-items-center">
                  <Col xs={12} lg={6} className="text-left">
                    <p className="heading heading-lg fw-bold">To-Do List App</p>

                    <InputGroup className="mb-3 mt-lg-2 mt-xl-4">
                      <FormControl
                        placeholder="What's your nickname?"
                        aria-label="Nickname"
                        aria-describedby="basic-addon2"
                        value={nickname}
                        onChange={handleNicknameChange}
                        className="nickname-input"
                      />
                      <Button as={Link} to="todo" className="primary-button button-create" onClick={handleCreateClick}>
                        Create
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
            </Container>
        </>
    )
}

export default LandingPage
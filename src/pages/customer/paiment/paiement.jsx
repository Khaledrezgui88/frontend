import React from "react";
import { Card, Container, Row, Col, Form, Button, Collapse } from "react-bootstrap";

const Paiement = () => {
    return (
            <Container>
                <Row>
                    {["Visa", "MasterCard", "Discover"].map((card, index) => (
                        <Col lg={4} className="mb-3" key={index}>
                            <Card className="p-3">
                                <div className="text-center mb-3">
                                    <img
                                        src={
                                            card === "Visa"
                                                ? "https://www.freepnglogos.com/uploads/visa-logo-download-png-21.png"
                                                : card === "MasterCard"
                                                ? "https://www.freepnglogos.com/uploads/mastercard-png/file-mastercard-logo-svg-wikimedia-commons-4.png"
                                                : "https://www.freepnglogos.com/uploads/discover-png-logo/credit-cards-discover-png-logo-4.png"
                                        }
                                        alt={card}
                                        style={{ width: "60px" }}
                                    />
                                </div>
                                <div className="number text-center">
                                    <strong>**** **** **** 1060</strong>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mt-2">
                                    <small>
                                        <span className="fw-bold">Expiry date: </span>
                                        <span>10/16</span>
                                    </small>
                                    <small>
                                        <span className="fw-bold">Name: </span>
                                        <span>Kumar</span>
                                    </small>
                                </div>
                            </Card>
                        </Col>
                    ))}

                    <Col xs={12} className="mt-4">
                        <Card className="p-3">
                            <h4 className="mb-0 fw-bold">Payment Methods</h4>
                        </Card>
                    </Col>

                    {/* <Col xs={12}>
                        <Card className="p-3">
                            <Card.Body className="border p-0">
                                <Button className="w-100 mb-3" variant="primary">
                                    PayPal
                                </Button>
                                <Collapse in={false}>
                                    <div >
                                        <h4>Summary</h4>
                                        <p>
                                            <span className="fw-bold">Product: </span>
                                            <span className="text-success">Name of product</span>
                                        </p>
                                        <p>
                                            <span className="fw-bold">Price: </span>
                                            <span className="text-success">$452.90</span>
                                        </p>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
                                            nihil neque quisquam aut repellendus, dicta vero.
                                        </p>
                                    </div>
                                </Collapse>
                            </Card.Body>

                            <Card.Body className="border p-0 mt-3">
                                <Button className="w-100 mb-3" variant="primary">
                                    Credit Card
                                </Button>
                                <Collapse in={true}>
                                    <div className="p-3">
                                        <h4>Summary</h4>
                                        <p>
                                            <span className="fw-bold">Product: </span>
                                            <span className="text-success">Name of product</span>
                                        </p>
                                        <p>
                                            <span className="fw-bold">Price: </span>
                                            <span className="text-success">$452.90</span>
                                        </p>
                                        <Form>
                                            <Row className="mb-3">
                                                <Col>
                                                    <Form.Group>
                                                        <Form.Label>Card Number</Form.Label>
                                                        <Form.Control type="text" placeholder="Card Number" />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row className="mb-3">
                                                <Col>
                                                    <Form.Group>
                                                        <Form.Label>MM/YY</Form.Label>
                                                        <Form.Control type="text" placeholder="MM/YY" />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group>
                                                        <Form.Label>CVV</Form.Label>
                                                        <Form.Control type="password" placeholder="CVV" />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Name on Card</Form.Label>
                                                <Form.Control type="text" placeholder="Name on Card" />
                                            </Form.Group>
                                            <Button className="w-100" variant="primary">
                                                Submit
                                            </Button>
                                        </Form>
                                    </div>
                                </Collapse>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xs={12} >
                        <Button className="w-100" variant="primary">
                            Make Payment
                        </Button>
                    </Col> */}
                </Row>
            </Container>
    );
};

export default Paiement;

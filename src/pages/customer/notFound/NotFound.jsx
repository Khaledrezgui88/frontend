import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const NotFoundPage = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Row className="text-center">
        <Col>
          <Card className="shadow p-5 rounded">
            <Card.Body>
              <Card.Title as="h1" className="display-1 text-danger">
                404
              </Card.Title>
              <Card.Subtitle as="h2" className="mb-4">
                Page Not Found
              </Card.Subtitle>
              <Card.Text>
                The page you are looking for does not exist or has been moved.
              </Card.Text>
              <Link to="/">
                <Button variant="primary" size="lg">
                  Go to Home
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;

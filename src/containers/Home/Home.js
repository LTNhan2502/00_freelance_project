import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Level_Member from './Level_Member';
import Info from "./Info";
import Recipients from "./Recipients";
import './Home.scss';

const Home = () => {
  return (
    <Container className="custom-container">
      <Row className="my-4 justify-content-center">
        <Col lg={4} md={6} xs={12} className="mb-4">
          {/* Info */}
          <Info/>

          {/* Cấp thành viên */}
          <Level_Member />
        </Col>

        <Col lg={8} md={6} xs={12} className="mb-4">
          <div className="d-flex flex-column flex-lg-row">
            <Recipients/>

            <Card className="h-100 blur-card">
              <Card.Body>
                <Card.Title>Hiển thị người trúng thưởng</Card.Title>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Level_Member from './Level_Member';
import Info from './Info.jsx'
import Video from './Video';
import Recipients from "./Recipients";
import HotProduct from "./HotProduct";
import './Home.scss';

const Home = () => {
  const [userAmount, setUserAmount] = useState(0)
  const [thisUser, setThisUser] = useState(null);

  return (
    <Container className="custom-container py-5">
      <Row className="my-4 justify-content-center">
        <Col lg={4} md={6} xs={12} className="mb-4">
          {/* Info */}
          <Info userAmount={userAmount} setUserAmount={setUserAmount} thisUser={thisUser}/>
          
          {/* Cấp thành viên */}
          <Level_Member userAmount={userAmount}/>
        </Col>

        <Col lg={8} md={6} xs={12} className="mb-4">
          <Row className="h-100">
            {/* Cột cho danh sách sản phẩm hot */}
            <Col lg={6} className="mb-4"> 
              <Card className="h-100 blur-card">
                <Card.Body>
                  <HotProduct thisUser={thisUser} setThisUser={setThisUser} userAmount={userAmount} setUserAmount={setUserAmount}/>
                </Card.Body>
              </Card>
            </Col>

            {/* Cột chứa Video và Recipients */}
            <Col lg={6} className="d-flex flex-column">
              {/* Video sẽ nằm trên Level_Member khi ở điện thoại */}
              <div className="mb-4 d-none d-lg-block">
                <Video />
              </div>
              <div className="mb-4 d-lg-none">
                <Video />
              </div>
              <div>
                <Recipients />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

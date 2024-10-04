import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Level_Member from './Level_Member';
import Info from "./Info";
import Video from './Video';
import Recipients from "./Recipients";
import './Home.scss';

const Home = () => {
  return (
    <Container className="custom-container py-5">
      <Row className="my-4 justify-content-center">
        <Col lg={4} md={6} xs={12} className="mb-4">
          {/* Info */}
          <Info />
          
          {/* Cấp thành viên */}
          <Level_Member />
        </Col>

        <Col lg={8} md={6} xs={12} className="mb-4">
          <Row className="h-100"> {/* Sử dụng Row để giữ cột này cho các phần tử con */}
            {/* Cột cho danh sách sản phẩm hot */}
            <Col lg={6} className="mb-4"> 
              <Card className="h-100 blur-card">
                <Card.Body>
                  <Card.Title>Hiển thị các sản phẩm hot</Card.Title>
                  {/* Thêm danh sách sản phẩm ở đây */}
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

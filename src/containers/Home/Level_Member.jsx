import React from "react";
import { Card, Container, Row, Col } from 'react-bootstrap';
import './Level_Member.scss';

class Level_Member extends React.Component{
    state = ({
        levels:[
            {name: "Bạc", upgradeFee: "0", discount: "0.24% - 0.3%", distribution: 60, currentLevel: true},
            {name: "Vàng", upgradeFee: "1000", discount: "0.24% - 0.5%", distribution: 80, currentLevel: false},
            {name: "Bạch kim", upgradeFee: "5000", discount: "0.24% - 0.7%", distribution: 120, currentLevel: false},
            {name: "Kim cương", upgradeFee: "10000", discount: "0.24% - 0.9%", distribution: 150, currentLevel: false},
        ]
    })
    render(){
        let {levels} = this.state
        return(
          <Container className="full-height-container p-0 mt-3">
            <h3 className="text-white fs-4 fw-bold">Cấp thành viên</h3>
            {levels.map((level, index) => (
              <Row key={index} className="mb-3">
                <Col>
                  <Card className="text-white blur-card position-relative">
                    <Card.Body className="non-padding">
                      <Row>
                        <Col sm={12}>
                          <div className="d-flex align-items-center justify-content-between">
                            <span className="unlock-title">{level.current ? "Cấp hiện tại" : "Mở khóa"}</span>
                            <span className={`badge badge-${level.name.toLowerCase()} position-absolute top-0 end-0`}>
                              {level.name}
                            </span>
                          </div>
                          <Card.Text>
                            <div className="d-flex justify-content-around text-center">
                              <div>
                                <div>Phí nâng cấp</div>
                                <div>{level.upgradeFee}</div>
                              </div>
                              <div>
                                <div>Chiết khấu</div>
                                <div>{level.discount}</div>
                              </div>
                              <div>
                                <div>Lượt phân phối</div>
                                <div>{level.distribution}</div>
                              </div>
                            </div>
                          </Card.Text>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            ))}
          </Container>
        )
    }
}

export default Level_Member;
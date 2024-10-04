import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col } from "react-bootstrap";
import { faArrowsDownToLine, faArrowsUpToLine, faBuilding, faEnvelopeOpenText, faWallet } from "@fortawesome/free-solid-svg-icons";
import videoSrc from '../../assets/video.mp4';
import './Info.scss';

class Info extends React.Component{
    onClickClick = () => {
        alert("Click click")
    }

    render(){
        return(
            <Container className="p-0">
                <Row className="mb-3 font-medium">
                    {/* Info */}
                    <Col xs={6}>
                        <div className="box">
                            <div className="d-flex justify-content-start align-items-center">
                            <FontAwesomeIcon icon={faWallet} size="2x"/>
                            <span className="p">Số dư khả dụng</span>
                            </div>
                            <div className="d-flex justify-content-start">1000€</div>
                        </div>
                    </Col>
                    <Col xs={3}>
                        <div className="box box-click" onClick={() => this.onClickClick()}>
                            <div>
                                <FontAwesomeIcon icon={faArrowsDownToLine} size="2x"/>
                            </div>
                            <div>Rút tiền</div>
                        </div>
                    </Col>
                    <Col xs={3}>
                        <div className="box box-click" onClick={() => this.onClickClick()}>
                            <div>
                                <FontAwesomeIcon icon={faArrowsUpToLine} size="2x"/>
                            </div>
                            <div>Nạp tiền</div>
                        </div>
                    </Col>
                    <Col xs={12}>
                        <div className="box">
                            <Row className="top-left-box">
                                <Col xs={6}>
                                    <div><FontAwesomeIcon icon={faBuilding} size="2x"/></div>
                                    <div>Hồ sơ công ty</div>
                                </Col>
                                <Col xs={6}>
                                    <div><FontAwesomeIcon icon={faEnvelopeOpenText} size="2x"/></div>
                                    <div>Thư thông báo</div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Info;
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col } from "react-bootstrap";
import { faArrowsDownToLine, faArrowsUpToLine, faBuilding, faEnvelopeOpenText, faWallet } from "@fortawesome/free-solid-svg-icons";
import './Info.scss';
import { getOneUserByUsername } from "../../utils/userAPI";

export default function Recipients() {
    const defaultAmount = 0
    const [userAmount, setUserAmount] = useState(defaultAmount);
    const userName = localStorage.getItem("user_name");

    const fetchUserAmount = async () => {
        if (!userName) {
            setUserAmount(defaultAmount);
            return;
        }

        try {
            const res = await getOneUserByUsername(userName);
            console.log(res.data);
            // Đảm bảo luôn có giá trị hợp lệ
            setUserAmount(res.data.data || defaultAmount); 
        } catch (error) {
            console.error("Error fetching user amount:", error);
            setUserAmount(defaultAmount);
        }
    };

    useEffect(() => {
        fetchUserAmount();
    }, [userName]);
    
    const onClickClick = () => {
        alert("Click click")
    }

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
                        <div className="d-flex justify-content-start">{`${userAmount} €`}</div>
                    </div>
                </Col>
                <Col xs={3}>
                    <div className="box box-click" onClick={() => onClickClick()}>
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
import React, { useState } from 'react';
import { Button, Card, Collapse, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import avatar from '../../assets/icon-5355896_1920.png';
import './Profiles.scss';

export default function UserInfo() {
  const [open, setOpen] = useState(false);

    const onClickNap = () => {
        alert("Click Nạp tiền")
    }

  return (
    <Container>
        <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
                {/* Button Avatar */}
                <div className="d-flex justify-content-end"> {/* Sử dụng d-flex và justify-content-end để căn phải */}
                    <Button onClick={() => setOpen(!open)} className="avatar-btn">
                        <img src={avatar} alt="Avatar" className="avatar-img" />
                    </Button>
                </div>

                {/* Card Info */}
                <Collapse in={open}>
                    <Card className="mt-3 blur-card-profiles">
                        <Card.Body>
                            <ul className="list-unstyled">
                                <li className='py-3 px-3'>
                                    {/* Ở đây sau này sẽ dùng thẻ Link của react-router-dom để điều hướng */}
                                    <p onClick={() => onClickNap()}>Nạp tiền</p>
                                </li>
                                <li className='py-3 px-3'>
                                    <p>Rút tiền</p>
                                </li>
                                <li className='py-3 px-3'>
                                    <p>Lịch sử rút tiền</p>
                                </li>
                                <li className='py-3 px-3'>
                                    <p>Lịch sử nhận thưởng</p>
                                </li>
                                <li className='py-3 px-3'>
                                    <p>Thông tin ngân hàng</p>
                                </li>
                                <li className='py-3 px-3'>
                                    <p>Địa chỉ</p>
                                </li>
                                <li className='py-3 px-3'>
                                    <p>Chuyển đổi ngôn ngữ</p>
                                </li>
                                <li className='py-3 px-3'>
                                    <p>Đăng xuất</p>
                                </li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Collapse>
            </Col>
        </Row>
    </Container>
  );
}

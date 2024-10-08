import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Button } from 'react-bootstrap'
import './Warehouse.scss';
import { toast } from 'react-toastify';

function Warehouse() {
    const userName = localStorage.getItem("user_name")
    const [savedProduct, setSavedProduct] = useState(null);

    useEffect(() => {
        const productData = localStorage.getItem('savedProduct');
        if (productData) {
            setSavedProduct(JSON.parse(productData));
        }
    }, []);

    // Handle phân phối
    const handleDistribute = () => {
        // Tạo logic cho hành động phân phối
        toast.success("Phân phối thành công")
    };

    return (
        <Container className="mt-1 py-5 warehouse-container">
            <Row className="h-100 mt-3 justify-content-center align-items-center">
                <Col lg={6} className="mb-4">
                <Card className="h-100 blur-card justify-content-center align-items-center w-100">
                    <Card.Body>
                    {savedProduct ? (
                        <>
                        <h4>Thông tin sản phẩm đã nhận</h4>
                        <Card
                            key={savedProduct._id}
                            className="received-product-card"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "30rem",
                                margin: "0"
                            }}
                        >
                            <Card.Img
                            variant="left"
                            src={savedProduct.image}
                            style={{
                                width: "150px",
                                height: "150px",
                                objectFit: "cover",
                            }}
                            />
                            <Card.Body className='warehouse-info'>
                                <Card.Title style={{ fontSize: '14px' }}>
                                    <div style={{ fontSize: '12px' }}>Mã: {savedProduct._id}</div>
                                    <div>{savedProduct.productName}</div>
                                    
                                </Card.Title>
                                <Row>
                                    <Col>
                                        <Card.Text>{savedProduct.price.toFixed(2)} €</Card.Text>
                                    </Col>
                                    <Col className="text-end">
                                        <Card.Text>X{savedProduct.quantity}</Card.Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Card.Text>Tổng tiền phân phối</Card.Text>
                                    </Col>
                                    <Col className="text-end">
                                        <Card.Text>{(savedProduct.price * savedProduct.quantity).toFixed(2)} €</Card.Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Card.Text>Lợi nhuận</Card.Text>
                                    </Col>
                                    <Col className="text-end">
                                        <Card.Text>... €</Card.Text>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>

                        {/* Nút Phân phối nằm bên phải */}
                        <div className="text-end">
                            <Button variant="primary" className="mt-3" onClick={handleDistribute}>
                                Phân phối
                            </Button>
                        </div>
                        </>
                    ) : (
                        <Card.Title>Chưa nhận sản phẩm nào</Card.Title>
                    )}
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Warehouse;

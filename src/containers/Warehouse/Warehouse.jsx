import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Table } from 'react-bootstrap'
import './Warehouse.scss';

function Warehouse() {
    const [savedProduct, setSavedProduct] = useState(null);

    useEffect(() => {
        const productData = localStorage.getItem('receivedProduct');
        if (productData) {
            setSavedProduct(JSON.parse(productData));
        }
    }, []);
    return (
        <Container className='mt-1 py-5 warehouse-container'>
            <Row className="h-100 mt-3 justify-content-center align-items-center">
                <Col lg={6} className="mb-4"> 
                    <Card className="h-100 blur-card justify-content-center align-items-center">
                        <Card.Body>
                            {savedProduct ? (
                                <>
                                    <h4>Thông tin sản phẩm đã nhận</h4>
                                    <Card key={savedProduct.id} className="m-2 received-product-card" style={{ display: 'flex', flexDirection: 'row', width: '30rem' }}>
                                        <Card.Img 
                                            variant="left" 
                                            src={savedProduct.image} 
                                            style={{ width: '150px', height: '150px', objectFit: 'cover' }} // Đặt chiều cao và chiều rộng cố định
                                        />
                                        <Card.Body>
                                            <Card.Title>{savedProduct.name}</Card.Title>
                                            <Card.Text>Đơn giá: {savedProduct.price.toFixed(2)} €</Card.Text>
                                        </Card.Body>
                                    </Card>
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

export default Warehouse
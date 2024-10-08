import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Table } from 'react-bootstrap'
import './Warehouse.scss';

function Warehouse() {
    const userName = localStorage.getItem("user_name")
    const [savedProduct, setSavedProduct] = useState(null);

    useEffect(() => {
        const productData = localStorage.getItem('receivedProduct');
        if (productData) {
            setSavedProduct(JSON.parse(productData));
        }
    }, []);
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
                key={savedProduct.id}
                className="m-2 received-product-card"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "30rem",
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
                  <Card.Title>{savedProduct.name}</Card.Title>
                  <Row>
                    <Col>
                      <Card.Text>{savedProduct.price.toFixed(2)} €</Card.Text>
                    </Col>
                    <Col className="text-end">
                      <Card.Text>X6</Card.Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Card.Text>Tổng tiền phân phối</Card.Text>
                    </Col>
                    <Col className="text-end">
                      <Card.Text>100 €</Card.Text>
                    </Col>
                  </Row>
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
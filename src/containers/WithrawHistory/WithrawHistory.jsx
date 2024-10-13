import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';

function WithrawHistory() {
    // Giả lập lịch sử rút tiền
    const [withrawHistory, setWithrawHistory] = useState([])

    useEffect(() => {
        fetchData()
    })
    
    // Giả lập fetch apit lịch sử rút tiền
    const fetchData = () => {
        setTimeout(() => {
            setWithrawHistory([
                { id: 1, profitOut: '80', amount: 418, status: "pending", withrawTime: "12:00" },
                { id: 2, profitOut: '200', amount: 620, status: "success", withrawTime: "11:34" },
                { id: 3, profitOut: '500', amount: 1321, status: "success", withrawTime: "8:46" },
                { id: 4, profitOut: '1000', amount: 221, status: "success", withrawTime: "10:02" },
                { id: 5, profitOut: '100', amount: 705, status: "success", withrawTime: "17:32" },
                { id: 6, profitOut: '400', amount: 498, status: "success", withrawTime: "13:20" },
                { id: 7, profitOut: '300', amount: 936, status: "success", withrawTime: "12:47" },
                { id: 8, profitOut: '600', amount: 595, status: "success", withrawTime: "05:59" },
            ])
        }, 1000)
    }
    return (
        <Container className="mt-1 py-5 warehouse-container">
            <h4 className="text-start mb-4" style={{ color: "white" }}>Lịch sử rút tiền</h4>
            <Row className="g-4">
                {withrawHistory.length > 0 ? (
                    withrawHistory.map((history) => {
                        return (
                            <Col xs={12} sm={6} md={4} lg={4} key={history.id}>
                                <Card className="h-100 received-product-card"
                                    style={{
                                        backgroundColor: '#9dcff0',
                                        color: "black"
                                    }}
                                >
                                    <Card.Body>
                                        <Card.Title>
                                            <div className='mt-2' style={{ fontSize: "14px" }}>
                                                Thời gian: {history.withrawTime}
                                            </div>                                          
                                        </Card.Title>
                                        <Row className='warehouse-general'>
                                            <Col>
                                                <Card.Text>
                                                    <p style={{ marginBottom: "0" }}>Số tiền: -{history.profitOut} €</p>
                                                    <p style={{ marginBottom: "0" }}>Số dư: {history.amount} €</p>                                                    
                                                </Card.Text>
                                            </Col>
                                            <Col className="text-end">
                                                <Card.Text>{history.status === "pending" ? "Đang chờ xử lí" : "Thành công"}</Card.Text>
                                            </Col>
                                        </Row>                                        
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })
                ) : (
                    <h5 className="text-start">Chưa có lịch sử rút tiền</h5>
                )}
            </Row>
        </Container>
    )
}

export default WithrawHistory
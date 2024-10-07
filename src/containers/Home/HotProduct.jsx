import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import businessImg from '../../assets/076dba666015d94b8004.jpg';
import { toast } from 'react-toastify';
import './HotProduct.scss';
import { getOneUserByUsername } from '../../utils/userAPI';

function HotProduct() {
    //Data sản phẩm
    const distribution_product = {
        id: 1,
        name: "Bàn",
        price: 10.0,
        image: businessImg
    }

    const defaultAmount = 0;
    const [userAmount, setUserAmount] = useState(defaultAmount);
    const userName = localStorage.getItem("user_name");

    const fetchUserAmount = async () => {
        if (!userName) {
            setUserAmount(defaultAmount);
            return;
        }

        try {
            const res = await getOneUserByUsername(userName);
            console.log(res.data.data);
            // Đảm bảo luôn có giá trị hợp lệ
            setUserAmount(res.data.data.amount || defaultAmount);
        } catch (error) {
            console.error("Error fetching user amount:", error);
            setUserAmount(defaultAmount);
        }
    };

    useEffect(() => {
        fetchUserAmount();
    }, [userName]);

    //Handle nhận phân phối
    const handleReceive = () => {
        //Lưu vào localStorage
        localStorage.setItem("receivedProduct", JSON.stringify(distribution_product));
        
        //Kiểm tra xem có lưu thành công hay không
        const savedProduct = localStorage.getItem("receivedProduct");
        if (savedProduct) {
            toast.success("Nhận hàng thành công!");
        } else {
            toast.error("Nhận hàng thất bại!");
        }
    }

    
    return (
        <div className="text-center">
            {/* Hình ảnh */}
            <img className='distribution-img'
                src={businessImg} 
                alt="Business" 
            />

            {/* Nút Nhận */}
            <Button variant="primary" className="mt-3" onClick={() => handleReceive()}>Nhận phân phối</Button>

            {/* Card hiển thị thông tin */}
            <Card className="mt-4 distribution-card">
                <Card.Body>
                    <Row>
                        <Col md={8} className='text-start'>
                            <Card.Text><strong>Số dư:</strong></Card.Text>
                        </Col>
                        <Col md={4} className="text-end">
                            <Card.Text>{`${userAmount} €`}</Card.Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8} className='text-start'>
                            <Card.Text><strong>Cấp hiện tại:</strong></Card.Text>
                        </Col>
                        <Col md={4} className="text-end">
                            <Card.Text>Bạc</Card.Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8} className='text-start'>
                            <Card.Text><strong>Chiết khấu:</strong></Card.Text>
                        </Col>
                        <Col md={4} className="text-end">
                            <Card.Text>0.24%</Card.Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8} className='text-start'>
                            <Card.Text><strong>Đơn hàng đã phân phối:</strong></Card.Text>
                        </Col>
                        <Col md={4} className="text-end">
                            <Card.Text>25</Card.Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8} className='text-start'>
                            <Card.Text><strong>Chiết khấu hôm qua:</strong></Card.Text>
                        </Col>
                        <Col md={4} className="text-end">
                            <Card.Text>1 €</Card.Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8} className='text-start'>
                            <Card.Text><strong>Chiết khấu hôm nay:</strong></Card.Text>
                        </Col>
                        <Col md={4} className="text-end">
                            <Card.Text>100 €</Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

        </div>
    );
}

export default HotProduct;

import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import businessImg from '../../assets/076dba666015d94b8004.jpg';
import { toast } from 'react-toastify';
import './HotProduct.scss';
import { getOneUserByUsername } from '../../utils/userAPI';

function HotProduct() {
    // Data sản phẩm
    const distribution_product = {
        id: 1,
        name: "Bàn",
        price: 10.0,
        image: businessImg
    };

    const [thisUser, setThisUser] = useState(null);
    const [userAmount, setUserAmount] = useState(0);
    const userName = localStorage.getItem("user_name");

    useEffect(() => {
        const fetchUserAmount = async () => {
            if (!userName) {
                setUserAmount(0);
                return;
            }

            try {
                const res = await getOneUserByUsername(userName);
                const userData = res.data.data || {};
                setUserAmount(userData.amount || 0);
                setThisUser(userData);
            } catch (error) {
                console.error("Error fetching user amount:", error);
                setUserAmount(0);
            }
        };

        fetchUserAmount();
    }, [userName]);

    // Handle nhận phân phối
    const handleReceive = () => {
        localStorage.setItem("receivedProduct", JSON.stringify(distribution_product));

        if (localStorage.getItem("receivedProduct")) {
            toast.success("Nhận hàng thành công!");
        } else {
            toast.error("Nhận hàng thất bại!");
        }
    };

    const handleReject = () => {
        toast.error("Bạn chưa mua gói")
    }

    return (
        <div className="text-center">
            {/* Hình ảnh */}
            <img className='distribution-img' src={businessImg} alt="Business" />

            {/* Nút Nhận */}
            <Button variant="primary" className="mt-3" onClick={() => !!thisUser.memberId === false ? handleReject() : handleReceive()}>
                Nhận phân phối
            </Button>

            {/* Card hiển thị thông tin */}
            <Card className="mt-4 distribution-card">
                <Card.Body>
                    <Row>
                        <Col md={8} className='text-start'><strong>Số dư:</strong></Col>
                        <Col md={4} className="text-end">{`${userAmount} €`}</Col>
                    </Row>
                    <Row>
                        <Col md={8} className='text-start'><strong>Cấp hiện tại:</strong></Col>
                        <Col md={4} className="text-end">{thisUser?.memberId?.packageName || 'Không'}</Col>
                    </Row>
                    <Row>
                        <Col md={8} className='text-start'><strong>Chiết khấu:</strong></Col>
                        <Col md={4} className="text-end">{`${thisUser?.memberId?.discountFrom || 0}% - ${thisUser?.memberId?.discountTo || 0}%`}</Col>
                    </Row>
                    <Row>
                        <Col md={8} className='text-start'><strong>Đơn hàng đã phân phối:</strong></Col>
                        <Col md={4} className="text-end">...</Col>
                    </Row>
                    <Row>
                        <Col md={8} className='text-start'><strong>Chiết khấu hôm nay:</strong></Col>
                        <Col md={4} className="text-end">100 €</Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
}

export default HotProduct;

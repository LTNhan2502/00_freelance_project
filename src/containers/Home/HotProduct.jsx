import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import businessImg from '../../assets/076dba666015d94b8004.jpg';
import { toast } from 'react-toastify';
import './HotProduct.scss';
import { getOneUserByUsername } from '../../utils/userAPI';
import { getProductNoUsername, updateUsernameToProduct } from '../../utils/product';

function HotProduct() {
    const [thisUser, setThisUser] = useState(null);
    const [userAmount, setUserAmount] = useState(0);
    const [distProduct, setDistProduct] = useState([]);
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
        fetchProductsNoUsername();
    }, [userName]);

    // Fetch lấy tất cả hàng cần phân phối
    const fetchProductsNoUsername = async() => {
        try {
            const products = await getProductNoUsername();
            const result = products.data.data
            setDistProduct(result)
        } catch (error) {
            console.error("Fetch thất bại:", error);
        }
    }

    // Handle nhận phân phối
    // Handle nhận phân phối
    const handleReceive = async () => {
        // Filter sản phẩm có price bé hơn userAmount
        const productsCanDist = distProduct.filter((product) => product.price <= userAmount);

        if (productsCanDist.length === 0) {
            toast.error("Không có sản phẩm nào phù hợp với số dư hiện tại");
            return;
        }

        // Lấy ngẫu nhiên một sản phẩm từ danh sách đã lọc
        const randomIndex = Math.floor(Math.random() * productsCanDist.length);
        const selectedProduct = productsCanDist[randomIndex];

        try {
            // Gọi API cập nhật sở hữu mặt hàng
            console.log("ID sản phẩm: ",selectedProduct._id);            
            console.log("Tên sản phẩm: ",selectedProduct.productName);            
            console.log("Tên người dùng: ",userName);            
            const updateUTP = await updateUsernameToProduct(selectedProduct._id, userName);
            console.log(updateUTP);
            
            localStorage.setItem("savedProduct", JSON.stringify(selectedProduct));

            toast.success(`Nhận thành công sản phẩm: ${selectedProduct.productName}`);
        } catch (error) {
            toast.error("Cập nhật sở hữu sản phẩm thất bại");
            console.error("Lỗi cập nhật sở hữu:", error);
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

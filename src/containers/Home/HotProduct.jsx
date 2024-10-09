import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Modal } from 'react-bootstrap';
import businessImg from '../../assets/076dba666015d94b8004.jpg';
import { toast } from 'react-toastify';
import './HotProduct.scss';
import { getOneUserByUsername } from '../../utils/userAPI';
import { getAllProduct, updateUsernameToProduct } from '../../utils/product';
import { getImages } from '../../utils/getImage';

function HotProduct() {
    const [thisUser, setThisUser] = useState(null);
    const [userAmount, setUserAmount] = useState(0);
    const [distProduct, setDistProduct] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isClickReceive, setIsClickReceive] = useState(null)
    const userName = localStorage.getItem("user_name");

    useEffect(() => {        
        fetchUserAmount();
        fetchProductsNoUsername();
        console.log(thisUser);
        
    }, [userName, isClickReceive]);

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
    
    const fetchProductsNoUsername = async () => {
        try {
            const products = await getAllProduct();
            const result = products.data.data;
            setDistProduct(result);
        } catch (error) {
            console.error("Fetch thất bại:", error);
        }
    };

    const fetchImage = async (imageName) => {
        try {
            const result = await getImages(imageName);
            return URL.createObjectURL(result.data);
        } catch (error) {
            console.error("Lỗi khi lấy hình ảnh:", error);
            return null;
        }
    };

    const handleClickReceive = async () => {
        const productsCanDist = distProduct.filter(
            (product) => !product.userName && product.price <= userAmount
        );

        if (productsCanDist.length === 0) {
            toast.error("Không có sản phẩm nào phù hợp với số dư hiện tại");
            return;
        }

        const randomIndex = Math.floor(Math.random() * productsCanDist.length);
        const selectedProduct = productsCanDist[randomIndex];

        // Fetch api img
        const imageUrl = await fetchImage(selectedProduct.imageProduct);

        setSelectedProduct({ ...selectedProduct, imageUrl }); 
        setShowModal(true);
    };

    const handleReceive = async () => {
        try {
            await updateUsernameToProduct(selectedProduct._id, userName);
            toast.success(`Nhận thành công sản phẩm: ${selectedProduct.productName}`);
            setIsClickReceive(thisUser.isDistribute)
            console.log(isClickReceive);
            
            setShowModal(false);
        } catch (error) {
            toast.error("Cập nhật sở hữu sản phẩm thất bại");
            console.error("Lỗi cập nhật sở hữu:", error);
        }
    };

    const handleReceivable = async () => {       
        const isCurrentDist = distProduct.filter(
            (product) => product.userName === userName && product.status === "waiting"
        );
        
        if (isCurrentDist.length !== 0 || isClickReceive === true) {
            toast.error("Có đơn hàng chưa thanh toán, vui lòng thanh toán trước!");
            return;
        }else{
            handleClickReceive(); // Thực hiện nhận phân phối
        }
    };

    const handleReject = () => {
        toast.error("Bạn chưa mua gói");
    };

    const handleCloseDistInfo = () => setShowModal(false);

    return (
        <div className="text-center">
            <img className="distribution-img" src={businessImg} alt="Business" />

            <Button
                variant="primary"
                className="mt-3"
                onClick={() => !thisUser?.memberId ? handleReject() : handleReceivable()}
                style={{
                    backgroundColor: "#0262b0",
                    borderRadius: "0.325rem",
                    fontSize: "15px",
                    width: "150px"
                }} 
            >
                Nhận hàng
            </Button>

            {selectedProduct && (
                <Modal show={showModal} onHide={handleCloseDistInfo} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Thông tin sản phẩm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card className="h-100 received-product-card"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "100%",
                                margin: "0",
                                border: "none",
                                backgroundColor: "transparent",
                                backdropFilter: "blur(6px)",
                            }}
                        >
                            <Card.Img
                                variant="left"
                                src={selectedProduct.imageUrl || ''}
                                style={{ width: '150px', height: '100%', objectFit: 'cover' }}
                            />
                            <Card.Body>
                                <Card.Title>
                                    <div>Mã: {selectedProduct._id}</div>
                                    <div className="mt-2">Tên: {selectedProduct.productName}</div>
                                </Card.Title>
                                <Row>
                                    <Col>
                                        <Card.Text>{selectedProduct.price.toFixed(2)} €</Card.Text>
                                    </Col>
                                    <Col className="text-end">
                                        <Card.Text>X{selectedProduct.quantity}</Card.Text>
                                    </Col>
                                </Row>
                                <Row className='warehouse-info mt-2'>
                                    <Col>
                                        <Card.Text>Tổng phân phối</Card.Text>
                                    </Col>
                                    <Col className="text-end">
                                        <Card.Text>{(selectedProduct.price * selectedProduct.quantity).toFixed(2)} €</Card.Text>
                                    </Col>
                                </Row>
                                <Row className='warehouse-info'>
                                    <Col>
                                        <Card.Text>Lợi nhuận</Card.Text>
                                    </Col>
                                    <Col className="text-end">
                                        <Card.Text>{Number((selectedProduct.price * selectedProduct.quantity * 0.0024).toFixed(2))} €</Card.Text>
                                    </Col>
                                </Row>
                                <Row className='warehouse-info'>
                                    <Col>
                                        <Card.Text>Hoàn nhập</Card.Text>
                                    </Col>
                                    <Col className="text-end">
                                        <Card.Text className='fs-4 text-red'>{(selectedProduct.price * selectedProduct.quantity * 0.0024 + selectedProduct.price).toFixed(2)} €</Card.Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <div className="text-end">
                                        <Button variant="danger" className="mt-3" onClick={() => handleCloseDistInfo()}>
                                            Huỷ
                                        </Button>
                                        <Button variant="primary" className="mt-3 ms-2" onClick={() => handleReceive()}>
                                            Phân phối
                                        </Button>
                                    </div>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Modal.Body>                    
                </Modal>
            )}

            <Card className="mt-4 distribution-card">
                <Card.Body>
                    <Row>
                        <Col md={8} className="text-start"><strong>Số dư:</strong></Col>
                        <Col md={4} className="text-end">{`${userAmount} €`}</Col>
                    </Row>
                    <Row>
                        <Col md={8} className="text-start"><strong>Cấp hiện tại:</strong></Col>
                        <Col md={4} className="text-end">{thisUser?.memberId?.packageName || 'Không'}</Col>
                    </Row>
                    <Row>
                        <Col md={8} className='text-start'><strong>Chiết khấu:</strong></Col>
                        <Col md={4} className="text-end">{`${thisUser?.memberId?.discountFrom || 0}% - ${thisUser?.memberId?.discountTo || 0}%`}</Col>
                    </Row>
                    <Row>
                        <Col md={8} className='text-start'><strong>Đơn hàng đã phân phối:</strong></Col>
                        <Col md={4} className="text-end">{`${thisUser?.distributionTurn || 0}/${thisUser?.memberId?.distribution || 0}`}</Col>
                    </Row>
                    <Row>
                        <Col md={8} className='text-start'><strong>Chiết khấu hôm nay:</strong></Col>
                        <Col md={4} className="text-end">{`${thisUser?.profit || 0}`} €</Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
}

export default HotProduct;

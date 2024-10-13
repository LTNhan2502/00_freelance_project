import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './HotProduct.scss';
import { getOneUserByUsername } from '../../utils/userAPI';
import { getAllProduct, profitDistribution, updateUsernameToProduct } from '../../utils/product';
import { getImages } from '../../utils/getImage';
import businessImg from '../../assets/background-distribute.jpg';

function HotProduct({thisUser, setThisUser, userAmount, setUserAmount}) {
    const [distProduct, setDistProduct] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isClickReceive, setIsClickReceive] = useState(null)
    // State này là để kiểm soát không cho thực hiện hành động 2 lần
    const [isProcessing, setIsProcessing] = useState(false); 
    const userName = localStorage.getItem("user_name");

    useEffect(() => {
        if (userName) {
            fetchUserAmount(); 
            fetchProductsNoUsername();
        } 
    }, [userName]);  

    const fetchUserAmount = async () => {
        if (!userName) {
            setUserAmount(0);
            return;
        }
    
        try {
            const res = await getOneUserByUsername(userName);
            const userData = res.data.data || {};
    
            // Sử dụng phương pháp nhân chia để đảm bảo độ chính xác
            const rawAmount = userData.amount || 0;
            const fixedAmount = Math.round((rawAmount + Number.EPSILON) * 100) / 100;
    
            setUserAmount(fixedAmount);
            setThisUser(userData);
            console.log(thisUser);
    
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

    // Kiểm tra xem user có thể nhận hàng tiếp được không
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

    const handleClickReceive = async () => {
        const productsCanDist = distProduct.filter(
            (product) => !product.userName && product.price <= userAmount
        );
    
        if (productsCanDist.length === 0) {
            toast.error("Không có sản phẩm nào phù hợp với số dư hiện tại");
            return;
        }
    
        // Lấy random 1 sản phẩm trong data
        const randomIndex = Math.floor(Math.random() * productsCanDist.length);
        const selectedProduct = productsCanDist[randomIndex];
    
        // Fetch api img
        const imageUrl = await fetchImage(selectedProduct.imageProduct);
    
        // Cập nhật selectedProduct và mở modal
        setSelectedProduct({ ...selectedProduct, imageUrl }); 
        setShowModal(true);
    };
    
    // Nút huỷ trong modal
    // const handleCancelReceive = () => {
    //     if (selectedProduct && selectedProduct._id) {
    //         const totalDistribution = (selectedProduct.price * selectedProduct.quantity).toFixed(2); // Tổng phân phối
    //         const profit = Math.round((selectedProduct.price * selectedProduct.quantity * 0.0024 + Number.EPSILON) * 100) / 100; // Lợi nhuận
    //         const refund = (parseFloat(profit) + parseFloat(totalDistribution)).toFixed(2); // Hoàn nhập
    
    //         // Gọi handleReceive với các giá trị tính toán
    //         handleReceive(selectedProduct._id, refund, profit);
    //     }
    
    //     // Đóng modal
    //     setShowModal(false);
    // };
    
    // Nhận sản phẩm, gán sở hữu cho user
    const handleCancelReceive = async () => {
        try {
            await updateUsernameToProduct(selectedProduct._id, userName);
            setIsClickReceive(thisUser.isDistribute)

            toast.success(`Nhận thành công sản phẩm: ${selectedProduct.productName}`);
            console.log(isClickReceive);
            
            setShowModal(false);
        } catch (error) {
            toast.error("Cập nhật sở hữu sản phẩm thất bại");
            console.error("Lỗi cập nhật sở hữu:", error);
        }
    };
    
    // Thực hiện phân phối (nút phân phối trong modal)
    // const handleReceiveDist = async (productId, refund, profit) => {
    //     try {
    //         const res = await profitDistribution(productId, userName, refund, profit);
    //         await updateUsernameToProduct(selectedProduct._id, userName);

    //         // Cập nhật số dư user
    //         setUserAmount((prevAmount) => prevAmount - selectedProduct.price + parseFloat(refund));
    //         // Gọi lại fetchThisUser để cập nhật lại thông tin user
    //         await fetchUserAmount();
    //         // Thực hiện phân phối
    //         handleSubmitDist(productId, refund, profit)

    //         console.log(isClickReceive);            
    //     } catch (error) {
    //         toast.error("Cập nhật sở hữu sản phẩm thất bại");
    //         console.error("Lỗi cập nhật sở hữu:", error);
    //     }
    // };

    // Thực hiện phân phối (nút phân phối trong modal)
    const handleReceiveDist = async (productId, refund, profit) => {
        if (isProcessing) return; // Nếu đang trong quá trình xử lý thì không thực hiện nữa
        setIsProcessing(true); // Đặt cờ báo là đang xử lý
    
        try {
            const res = await profitDistribution(productId, userName, refund, profit);
            await updateUsernameToProduct(selectedProduct._id, userName);
    
            // Cập nhật số dư user
            setUserAmount((prevAmount) => prevAmount - selectedProduct.price + parseFloat(refund));
    
            // Gọi lại fetchUserAmount để cập nhật lại thông tin user
            await fetchUserAmount();
    
            // Thực hiện phân phối
            handleSubmitDist(productId, refund, profit);
    
        } catch (error) {
            toast.error("Cập nhật sở hữu sản phẩm thất bại");
            console.error("Lỗi cập nhật sở hữu:", error);
        } finally {
            setIsProcessing(false); // Kết thúc quá trình xử lý
        }
    };
    
    // Phân phối sản phẩm (chuyển trạng thái sang success)
    const handleSubmitDist = async (productId, refund, profit) => {        
        try {
            const res = await profitDistribution(productId, userName, refund, profit);
            if (res?.data?.data === "Lợi nhuận phân phối thành công") {
                toast.success("Phân phối thành công");
            }
            handleCloseDistInfo();
        } catch (error) { 
            console.log("Error fetching: ", error);
            toast.error("Phân phối thất bại");
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
                Nhận
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
                                        <Button variant="danger" className="mt-3" onClick={() => handleCancelReceive()}>
                                            Huỷ
                                        </Button>
                                        <Button variant="primary" className="mt-3 ms-2" 
                                            onClick={() => {
                                                const totalDistribution = (selectedProduct.price * selectedProduct.quantity).toFixed(2); // Tổng phân phối
                                                const profit = Math.round((selectedProduct.price * selectedProduct.quantity * 0.0024 + Number.EPSILON) * 100) / 100; // Lợi nhuận
                                                const refund = (parseFloat(profit) + parseFloat(totalDistribution)).toFixed(2); // Hoàn nhập
                                                const result = (parseFloat(userAmount) - parseFloat(totalDistribution) + parseFloat(refund)).toFixed(2); // Tính toán kết quả
                                                handleReceiveDist(selectedProduct._id, result, profit)}
                                            }
                                        >
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
                        <Col md={8} className='text-start'><strong>Chiết khấu hôm qua:</strong></Col>
                        <Col md={4} className="text-end">1.12 €</Col>
                    </Row>
                    <Row>
                        <Col md={8} className='text-start'><strong>Chiết khấu hôm nay:</strong></Col>
                        <Col md={4} className="text-end">{`${thisUser?.profit || 0}`} €</Col>
                    </Row>
                </Card.Body>
            </Card>

            <Card className="mt-4 app-rules-card">
                <Card.Body>
                    <Row>
                        <Col md={12} className="text-start">
                            <p>Khi bạn trở thành thành viên Mercado Libre, bạn sẽ nhận được các mã sản phẩm có liên quan về đơn đặt hàng , bao gồm thông tin sản phẩm chi tiết đơn hàng , giá trị sản phẩm , số lượng ...vv..</p>
                            <p>Thành viên của Mercado Libre sẽ là nhà trung gian giúp  xác nhận đơn hàng giữa các NHÀ SẢN XUẤT & QUÝ ĐỐI TÁC ( người đặt mua ).</p>
                            <p>Thành viên của Mercado Libre sẽ là nhà trung gian giúp  xác nhận đơn hàng giữa các NHÀ SẢN XUẤT & QUÝ ĐỐI TÁC ( người đặt mua ).</p>
                        </Col>
                    </Row>                    
                </Card.Body>
            </Card>
        </div>
    );
}

export default HotProduct;

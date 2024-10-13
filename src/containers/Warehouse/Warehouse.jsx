import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Button, Modal } from 'react-bootstrap';
import './Warehouse.scss';
import { toast } from 'react-toastify';
import { getImages } from '../../utils/getImage';
import { getProductWaiting, profitDistribution } from '../../utils/product';
import { getOneUserByUsername } from '../../utils/userAPI';

function Warehouse() {
    const userName = localStorage.getItem("user_name");
    const [userAmount, setUserAmount] = useState(0);
    const defaultAmount = 0;
    const [savedProducts, setSavedProducts] = useState([]);
    const [imageURLs, setImageURLs] = useState({});
    const [showModal, setShowModal] = useState(false); 
    const [selectedProduct, setSelectedProduct] = useState({});

    useEffect(() => {
        getDistributedProducts();
        fetchUserAmount();
    }, []);

    const fetchUserAmount = async () => {
        if (!userName) {
          setUserAmount(defaultAmount);
          return;
        }
    
        try {
        //   const res = await getOneUserByUsername(userName);
        //   // console.log(res.data.data);
        //   setUserAmount(res.data.data.amount || defaultAmount);

            const res = await getOneUserByUsername(userName);
            const userData = res.data.data || {};
    
            const rawAmount = userData.amount || 0;
            const fixedAmount = Math.round((rawAmount + Number.EPSILON) * 100) / 100;
    
            setUserAmount(fixedAmount);
        } catch (error) {
          console.error("Error fetching user amount:", error);
          setUserAmount(defaultAmount);
        }
      };

    const fetchImage = async (imageName) => {
        try {
            const result = await getImages(imageName);
            const imageUrl = URL.createObjectURL(result.data);
            return imageUrl;
        } catch (error) {
            console.error("Lỗi khi lấy hình ảnh:", error);
            return null;
        }
    };

    const getDistributedProducts = async () => {
        try {
            const res = await getProductWaiting(userName);
            const result = res?.data?.data;
        
            if (result) {
                const sortedProducts = sortProducts(result);
                setSavedProducts(sortedProducts);
        
                const imageFetchPromises = sortedProducts.map(async (product) => {
                const imageUrl = await fetchImage(product.imageProduct);
                return { [product._id]: imageUrl };
                });
        
                const imageResults = await Promise.all(imageFetchPromises);
                const imagesMap = Object.assign({}, ...imageResults);
                setImageURLs(imagesMap);
            }
        } catch (error) {
            console.error("Lỗi khi lấy sản phẩm:", error);
        }
    };
      
    
    const sortProducts = (products) => {
        return products.sort((a, b) => {
          // Nếu status là 'waiting', đưa lên đầu
          if (a.status === 'waiting') return -1;
          if (b.status === 'waiting') return 1;
      
          // Nếu cả hai đều có receiving_time, sắp xếp theo thời gian
          if (a.receiving_time && b.receiving_time) {
            const dateA = new Date(a.receiving_time.split(" ")[1].split('/').reverse().join('-') + " " + a.receiving_time.split(" ")[0]);
            const dateB = new Date(b.receiving_time.split(" ")[1].split('/').reverse().join('-') + " " + b.receiving_time.split(" ")[0]);
            return dateB - dateA;
          }
      
          // Nếu a không có receiving_time, đưa lên đầu
          if (!a.receiving_time) return -1;
      
          // Nếu b không có receiving_time, đưa lên đầu
          if (!b.receiving_time) return 1;
      
          return 0;
        });
    };
      

    const handleShowDistInfo = (product) => {
        setSelectedProduct(product); // Lưu sản phẩm được chọn
        setShowModal(true); // Mở modal
    };

    const handleCloseDistInfo = () => setShowModal(false); // Đóng modal

    const handleSubmitDist = async (productId, refund, profit) => {        
        try {
            const res = await profitDistribution(productId, userName, refund, profit);
            if (res?.data?.data === "Lợi nhuận phân phối thành công") {
                toast.success("Phân phối thành công");
                getDistributedProducts(); 
            }
            handleCloseDistInfo();
        } catch (error) {
            console.log("Error fetching: ", error);
            toast.error("Phân phối thất bại");
        }
    };

    return (
        <Container className="mt-1 py-5 warehouse-container">
            <h4 className="text-start mb-4" style={{ color: "white" }}>Lịch sử phân phối</h4>
            <Row className="g-4">
                {savedProducts.length > 0 ? (
                    savedProducts.map((product) => {
                        const totalDistribution = (product.price * product.quantity).toFixed(2);
                        const profit = (product.price * product.quantity * 0.0024).toFixed(2);
                        const refund = (parseFloat(profit) + product.price).toFixed(2);

                        return (
                            <Col xs={12} sm={6} md={4} lg={4} key={product._id}>
                                <Card className="h-100 received-product-card">
                                    <div className={`stamp ${product.status === 'waiting' ? 'waiting' : 'success'}`}>
                                        <div className="stamp-inside">
                                            <span>{product.status === 'waiting' ? 'Waiting' : 'Success'}</span>
                                        </div>
                                    </div>

                                    <Card.Img
                                        variant="left"
                                        src={imageURLs[product._id] || 'placeholder-image-url'} 
                                        style={{
                                            width: "150px",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                        onError={(e) => e.target.src = 'placeholder-image-url'}
                                    />
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: '14px' }}>
                                            {product.status !== 'waiting' && (
                                                <div className='mt-2' style={{ fontSize: "12px" }}>
                                                    Thời gian: {product.receiving_time}
                                                </div>
                                            )}
                                            <div style={{ fontSize: '12px', wordWrap: 'break-word' }}>Mã: {product._id}</div>
                                            <div className='mt-2'>{product.productName}</div>
                                        </Card.Title>
                                        <Row className='warehouse-general'>
                                            <Col>
                                                <Card.Text>{product.price.toFixed(2)} €</Card.Text>
                                            </Col>
                                            <Col className="text-end">
                                                <Card.Text>X{product.quantity}</Card.Text>
                                            </Col>
                                        </Row>
                                        <Row className='warehouse-info mt-2'>
                                            <Col>
                                                <Card.Text>Tổng phân phối</Card.Text>
                                            </Col>
                                            <Col className="text-end">
                                                <Card.Text>{totalDistribution} €</Card.Text>
                                            </Col>
                                        </Row>
                                        <Row className='warehouse-info'>
                                            <Col>
                                                <Card.Text>Lợi nhuận</Card.Text>
                                            </Col>
                                            <Col className="text-end">
                                                <Card.Text>{profit} €</Card.Text>
                                            </Col>
                                        </Row>
                                        <Row className='warehouse-info'>
                                            <Col>
                                                <Card.Text>Hoàn nhập</Card.Text>
                                            </Col>
                                            <Col className="text-end">
                                                <Card.Text className='text-red'>{refund} €</Card.Text>
                                            </Col>
                                        </Row>
                                        {product.status === 'waiting' && (
                                            <Row className='warehouse-info'>
                                                <div className="text-end">
                                                    <Button
                                                        className="mt-3 ms-2 custome-btn"
                                                        onClick={() => handleShowDistInfo(product)} // Mở modal
                                                        style={{
                                                            backgroundColor: "#0262b0",
                                                            borderRadius: "0.325rem",
                                                            fontSize: "12px",
                                                            width: "150px"
                                                        }}
                                                    >
                                                        Gửi phân phối
                                                    </Button>
                                                </div>
                                            </Row>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })
                ) : (
                    <h5 className="text-start">Chưa nhận sản phẩm nào</h5>
                )}
            </Row>

            {/* Modal thông tin sản phẩm */}
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
                            src={imageURLs[selectedProduct._id] || ''}
                            style={{ width: '150px', height: '100%', objectFit: 'cover' }}
                        />
                        <Card.Body>
                            <Card.Title>
                                <div>Mã: {selectedProduct._id}</div>
                                <div className="mt-2">Tên: {selectedProduct.productName}</div>
                            </Card.Title>
                            <Row>
                                <Col>
                                    <Card.Text>{selectedProduct.price?.toFixed(2)} €</Card.Text>
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
                                    <Card.Text>{(selectedProduct.price * selectedProduct.quantity)?.toFixed(2)} €</Card.Text>
                                </Col>
                            </Row>
                            <Row className='warehouse-info'>
                                <Col>
                                    <Card.Text>Lợi nhuận</Card.Text>
                                </Col>
                                <Col className="text-end">
                                    <Card.Text>{(selectedProduct.price * selectedProduct.quantity * 0.0024)?.toFixed(2)} €</Card.Text>
                                </Col>
                            </Row>
                            <Row className='warehouse-info'>
                                <Col>
                                    <Card.Text>Hoàn nhập</Card.Text>
                                </Col>
                                <Col className="text-end">
                                    <Card.Text className='fs-4 text-red'>{((selectedProduct.price * selectedProduct.quantity * 0.0024) + selectedProduct.price)?.toFixed(2)} €</Card.Text>
                                </Col>
                            </Row>
                            <Row className='warehouse-info'>
                                <Col className="text-end">
                                    <Button
                                        className="mt-3 custome-btn"
                                        onClick={() => {
                                            const totalDistribution = (selectedProduct.price * selectedProduct.quantity).toFixed(2); // Tổng phân phối
                                            const profit = (selectedProduct.price * selectedProduct.quantity * 0.0024).toFixed(2); // Lợi nhuận
                                            const refund = (parseFloat(profit) + parseFloat(totalDistribution)).toFixed(2); // Hoàn nhập
                                            const result = (parseFloat(userAmount) - parseFloat(totalDistribution) + parseFloat(refund)).toFixed(2); // Tính toán kết quả
                                            handleSubmitDist(selectedProduct._id, result, profit); // Gọi hàm với kết quả tính toán
                                        }}
                                        style={{
                                            backgroundColor: "#0262b0",
                                            borderRadius: "0.325rem",
                                            fontSize: "12px",
                                            width: "150px"
                                        }}
                                    >
                                        Xác nhận phân phối
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default Warehouse;

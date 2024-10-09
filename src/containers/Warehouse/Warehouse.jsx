import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Button, Modal } from 'react-bootstrap';
import './Warehouse.scss';
import { toast } from 'react-toastify';
import { getImages } from '../../utils/getImage';
import { getProductWaiting, profitDistribution } from '../../utils/product';

function Warehouse() {
    const userName = localStorage.getItem("user_name");
    const [savedProducts, setSavedProducts] = useState([]);
    const [imageURLs, setImageURLs] = useState({});

    useEffect(() => {
        getDistributedProducts();
    }, [savedProducts]);

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
        const res = await getProductWaiting(userName);
        const result = res.data.data;        

        if (result && res.data.data) {
            setSavedProducts(result);

            const imageFetchPromises = result.map(async (product) => {
                const imageUrl = await fetchImage(product.imageProduct);
                return { [product._id]: imageUrl };
            });

            const imageResults = await Promise.all(imageFetchPromises);
            const imagesMap = Object.assign({}, ...imageResults);
            setImageURLs(imagesMap);
        }
    }

    const handleSubmitDist = async(productId, refund) => {
        try {
            const res = await profitDistribution(productId, userName, refund);
            if(res.data.data === "Lợi nhuận phân phối thành công"){
                toast.success("Phân phối thành công")
            }            
        } catch (error) {
            console.log("Error fetching: ", error);
            toast.error("Phân phối thất bại")
        }
        
        
    };

    return (
        <Container className="mt-1 py-5 warehouse-container">
            <h4 className="text-center mb-4" style={{ color: "white" }}>Lịch sử phân phối</h4>
            <Row className="g-4">
                {savedProducts.length > 0 ? (
                    savedProducts.map((product) => (
                        <Col xs={12} sm={6} md={4} lg={4} key={product._id}>
                            <Card className="h-100 received-product-card">
                                <div className={`stamp ${product.status === 'waiting' ? 'waiting' : 'success'}`}>
                                    <div className="stamp-inside">
                                        <span>{product.status === 'waiting' ? 'Waiting' : 'Success'}</span>
                                    </div>
                                </div>

                                <Card.Img
                                    variant="left"
                                    src={imageURLs[product._id] || ''}
                                    style={{
                                        width: "150px",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                                <Card.Body>
                                    <Card.Title style={{ fontSize: '14px' }}>
                                        {product.status !== 'waiting' ? (
                                            <div className='mt-2' style={{ fontSize: "12px" }}>Thời gian: {product.receiving_time}</div>
                                        ) : (<></>)}
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
                                            <Card.Text>{(product.price * product.quantity).toFixed(2)} €</Card.Text>
                                        </Col>
                                    </Row>
                                    <Row className='warehouse-info'>
                                        <Col>
                                            <Card.Text>Lợi nhuận</Card.Text>
                                        </Col>
                                        <Col className="text-end">
                                            <Card.Text>{Number((product.price * product.quantity * 0.0024).toFixed(2))} €</Card.Text>
                                        </Col>
                                    </Row>
                                    <Row className='warehouse-info'>
                                        <Col>
                                            <Card.Text>Hoàn nhập</Card.Text>
                                        </Col>
                                        <Col className="text-end">
                                            <Card.Text className='text-red'>{(product.price * product.quantity * 0.0024 + product.price).toFixed(2)} €</Card.Text>
                                        </Col>
                                    </Row>  
                                    {product.status === 'waiting' ? (
                                        <Row className='warehouse-info'>
                                            <div className="text-end">
                                                <Button className="mt-3 ms-2 custome-btn" onClick={() => handleSubmitDist(product._id, ((product.price * product.quantity * 0.0024 + product.price).toFixed(2)))}
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
                                    ) : (<></>)} 
                                </Card.Body>
                            </Card>                            
                        </Col>
                    ))
                ) : (
                    <h5 className="text-center">Chưa nhận sản phẩm nào</h5>
                )}
            </Row>
        </Container>
    );
}

export default Warehouse;

import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { getImages } from '../../utils/getImage';
import { getProductWaiting } from '../../utils/product';
import './Warehouse.scss';

function Warehouse() {
    const userName = localStorage.getItem("user_name");
    const [savedProducts, setSavedProducts] = useState([]);
    const [imageURLs, setImageURLs] = useState({});

    useEffect(() => {
        getDistributedProducts();
    }, []);

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
      
    return (
        <Container className="mt-1 py-5 warehouse-container">
            <h4 className="text-center mb-4" style={{ color: "white" }}>Lịch sử phân phối</h4>
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
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })
                ) : (
                    <h5 className="text-center">Chưa nhận sản phẩm nào</h5>
                )}
            </Row>
        </Container>
    );
}

export default Warehouse;

import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import './Warehouse.scss';
import { toast } from 'react-toastify';
import { getImages } from '../../utils/getImage';
import { getProductWaiting } from '../../utils/product';

function Warehouse() {
    const userName = localStorage.getItem("user_name");
    const [savedProducts, setSavedProducts] = useState([]); // Thay đổi để lưu danh sách sản phẩm
    const [imageURLs, setImageURLs] = useState({});

    useEffect(() => {
        getDistributedProducts();
    }, []);

    // Hàm fetch hình ảnh và lưu URL vào state
    const fetchImage = async (imageName) => {
        try {
            const result = await getImages(imageName);
            const imageUrl = URL.createObjectURL(result.data); // Tạo URL từ blob
            return imageUrl; // Chỉ trả về URL mà không tạo thẻ img
        } catch (error) {
            console.error("Lỗi khi lấy hình ảnh:", error);
            return null;
        }
    };

    // Hàm fetch lấy sản phẩm đã nhận phân phối
    const getDistributedProducts = async () => {
        const res = await getProductWaiting(userName);
        const result = res.data.data;

        if (result && res.data.data) {
            setSavedProducts(result);

            // Fetch hình ảnh cho mỗi sản phẩm và lưu URL vào state
            const imageFetchPromises = result.map(async (product) => {
                const imageUrl = await fetchImage(product.imageProduct);
                return { [product._id]: imageUrl }; // Sử dụng product._id làm key
            });

            const imageResults = await Promise.all(imageFetchPromises);
            const imagesMap = Object.assign({}, ...imageResults); // Tạo object chứa image URLs
            setImageURLs(imagesMap);
        }
    }

    // Handle phân phối
    const handleDistribute = () => {
        // Tạo logic cho hành động phân phối
        toast.success("Phân phối thành công");
    };

    return (
        <Container className="mt-1 py-5 warehouse-container">
            <Row className="h-100 mt-3 justify-content-center align-items-center">
                <Col lg={6} className="mb-4">
                    <Card className="h-100 blur-card justify-content-center align-items-center w-100">
                        <Card.Body>
                            {savedProducts.length > 0 ? (
                                <>
                                    <h4>Thông tin sản phẩm đã nhận</h4>
                                    {savedProducts.map((product) => (
                                        <Card
                                            key={product._id}
                                            className="received-product-card mb-3"
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                width: "100%",
                                                margin: "0"
                                            }}
                                        >
                                            <Card.Img
                                                variant="left"
                                                src={imageURLs[product._id] || ''} // Sử dụng URL hình ảnh từ state
                                                style={{
                                                    width: "150px",
                                                    height: "150px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                            <Card.Body className='warehouse-info'>
                                                <Card.Title style={{ fontSize: '14px' }}>
                                                    <div style={{ fontSize: '12px' }}>Mã: {product._id}</div>
                                                    <div>{product.productName}</div>
                                                </Card.Title>
                                                <Row>
                                                    <Col>
                                                        <Card.Text>{product.price.toFixed(2)} €</Card.Text>
                                                    </Col>
                                                    <Col className="text-end">
                                                        <Card.Text>X{product.quantity}</Card.Text>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Card.Text>Tổng tiền phân phối</Card.Text>
                                                    </Col>
                                                    <Col className="text-end">
                                                        <Card.Text>{(product.price * product.quantity).toFixed(2)} €</Card.Text>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Card.Text>Lợi nhuận</Card.Text>
                                                    </Col>
                                                    <Col className="text-end">
                                                        <Card.Text>{Number((product.price * product.quantity * 0.0024).toFixed(2))} €</Card.Text>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    ))}

                                    <div className="text-end">
                                        <Button variant="primary" className="mt-3" onClick={handleDistribute}>
                                            Phân phối
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <Card.Title>Chưa nhận sản phẩm nào</Card.Title>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Warehouse;

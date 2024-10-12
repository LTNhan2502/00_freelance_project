import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';

export default function Recipients() {
    // Giả lập state dữ liệu người dùng
    const [recipients, setRecipients] = useState([
        { id: 1, name: 'John Doe', profit: 8000 },
        { id: 2, name: 'Jane Smith', profit: 2000 },
        { id: 3, name: 'Bob Johnson', profit: 1500 },
        { id: 4, name: 'Alice Williams', profit: 2500 },
        { id: 5, name: 'Jane Doe', profit: 200 },
        { id: 6, name: 'Henry Garfield', profit: 100 },
        { id: 7, name: 'Lily Downdsey', profit: 400 },
        { id: 8, name: 'Charlie Puth', profit: 900 },
        { id: 9, name: 'Alex Braham', profit: 10 },
    ]);

    // Hàm định dạng tên
    const formatName = (name) => {
        if (name.length <= 2) return name; // Nếu tên quá ngắn, không ẩn ký tự
        return `${name.slice(0, 2)}****${name.slice(-2)}`; // Ẩn các ký tự giữa
    };

    // Hàm định dạng ngày-tháng-năm
    const formatDate = () => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = now.getFullYear();
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        // Giả lập như đang fetch API
        const simulateFetchRecipients = () => {
            // Không cần fetch thật, chỉ giữ nguyên state ban đầu
            return;
        };

        simulateFetchRecipients();
    }, []);

    useEffect(() => {
        // Cập nhật danh sách người dùng trúng thưởng mỗi giây (giả lập real-time)
        const updateRecipients = () => {
            setRecipients((prevRecipients) => {
                if (prevRecipients.length > 0) {
                    const lastRecipient = prevRecipients[prevRecipients.length - 1];
                    const updatedRecipients = [lastRecipient, ...prevRecipients.slice(0, -1)];
                    return updatedRecipients;
                }
                return prevRecipients;
            });
        };

        const interval = setInterval(updateRecipients, 1000); // Cập nhật mỗi giây

        return () => clearInterval(interval); // Clear khi component bị unmount
    }, []);

    return (
        <Container className="full-height-container p-0 mt-3">
            <h3 className="text-white fs-6 fw-bold"
                style={{
                    paddingLeft: "16px"
                }}
            >Danh sách lợi nhuận thành viên toàn cầu</h3>
            <Card className="h-100 blur-card ms-lg-3 mb-3 mb-lg-0 text-center">
                <Card.Body>
                    <div style={{
                        fontSize: "14px"
                    }}>
                        {recipients && recipients.length > 0 ? (
                            recipients.map((recipient) => (
                                <div key={recipient.id}>
                                    {formatDate()} chúc mừng {formatName(recipient.name)} nhận {recipient.profit} €
                                </div>
                            ))
                        ) : (
                            <p>Đang cập nhật...</p>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

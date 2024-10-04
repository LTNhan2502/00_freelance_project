import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import axios from 'axios';

export default function Recipients() {
    const [recipients, setRecipients] = useState([]);

    const fetchRecipients = async () => {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users');
        setRecipients(res.data)
    }

    useEffect(() => {
        fetchRecipients();
        // const fetchInterval = setInterval(() => {
        //     fetchRecipients();
        // }, 200000)

        // return () => clearInterval(fetchInterval);
    }, []);

    useEffect(() => {
        console.log(">>> Current recipients state: ", recipients);
      }, [recipients]);

    return (
        <Card className="h-100 blur-card me-lg-3 mb-3 mb-lg-0">
            <Card.Body>
                <Card.Title>Người dùng trúng thưởng</Card.Title>
                <div>
                    {recipients && recipients.length > 0 &&                    
                        recipients.map((recipients, index) => {
                            return(
                                <div key={recipients.id}>{recipients.name} - {recipients.email}</div>
                            )
                        })
                    }
                </div>
            </Card.Body>
        </Card>
    )
}

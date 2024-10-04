import React from "react";
import { Card, Row } from "react-bootstrap";
import videoSrc from '../../assets/video.mp4';
import './Info.scss';

class Video extends React.Component{
    onClickClick = () => {
        alert("Click click")
    }

    render(){
        return(
            
            <Card className="h-100 blur-card ms-lg-3 mb-3 mb-lg-0">
                <Card.Body>
                    {/* Video */}
                    <Row>
                        <video width="100%" controls autoPlay loop muted>
                            <source src={videoSrc} type="video/mp4" />
                        </video>
                    </Row>
                </Card.Body>
            </Card>
                
            
        )
    }
}

export default Video;
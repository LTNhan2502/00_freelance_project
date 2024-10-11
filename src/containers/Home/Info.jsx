import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import {
  faArrowsDownToLine,
  faArrowsUpToLine,
  faBuilding,
  faEnvelopeOpenText,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import "./Info.scss";
import { getOneUserByUsername } from "../../utils/userAPI";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

export default function Info({ userAmount, setUserAmount, thisUser }) {
  const defaultAmount = 0;
  const userName = localStorage.getItem("user_name");
  const navigate = useNavigate()
  const [showCompanyInfo, setShowCompanyInfo] = useState(false);

  const fetchUserAmount = async () => {
    if (!userName) {
      setUserAmount(defaultAmount);
      return;
    }

    try {
      const res = await getOneUserByUsername(userName);
      // console.log(res.data.data);
      setUserAmount(res.data.data.amount || defaultAmount);
    } catch (error) {
      console.error("Error fetching user amount:", error);
      setUserAmount(defaultAmount);
    }
  };

  useEffect(() => {
    fetchUserAmount();
  }, [userName, userAmount]);

  const handleWithraw = () => {
    navigate("/withraw")
  }

  const handleCloseCompanyInfo = () => setShowCompanyInfo(false);
  const handleShowCompanyInfo = () => setShowCompanyInfo(true);

  return (
    <Container className="p-0">
      <Row className="mb-3 font-medium">
        {/* Info */}
        <Col xs={6}>
          <div className="box">
            <div className="d-flex justify-content-start align-items-center">
              <FontAwesomeIcon icon={faWallet} size="2x" />
              <span className="p">Số dư khả dụng</span>
            </div>
            <div className="d-flex justify-content-start">{`${userAmount} €`}</div>
          </div>
        </Col>
        <Col xs={3}>
          <div className="box box-click" onClick={() => handleWithraw()}>
            <div>
              <FontAwesomeIcon icon={faArrowsDownToLine} size="2x" />
            </div>
            <div>Rút tiền</div>
          </div>
        </Col>
        <Col xs={3}>
          <div className="box box-click" onClick={() => onClickClick()}>
            <div>
              <FontAwesomeIcon icon={faArrowsUpToLine} size="2x" />
            </div>
            <div>Nạp tiền</div>
          </div>
        </Col>
        <Col xs={12}>
          <div className="box">
            <Row className="top-left-box">
              <Col xs={6}>
                <div onClick={handleShowCompanyInfo} className="box-click">
                  <FontAwesomeIcon
                    icon={faBuilding}
                    size="2x"
                    className="company-info"
                  />
                </div>
                <div>Hồ sơ công ty</div>
              </Col>
              <Col xs={6}>
                <div>
                  <FontAwesomeIcon
                    icon={faEnvelopeOpenText}
                    size="2x"
                    className="noti-mail"
                  />
                </div>
                <div>Thư thông báo</div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {/* Modal hiển thị thông tin công ty */}
      <Modal show={showCompanyInfo} onHide={handleCloseCompanyInfo} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thông tin công ty</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Thêm nội dung thông tin công ty tại đây */}
          <p>
          Mercado Libre được thành lập bởi Marcos Galperín. Ông đã ý tưởng nền tảng này vào tháng 3 năm 1999, khi đang làm việc để có được bằng thạc sĩ quản trị kinh doanh tại trường kinh doanh Đại học Stanford, Hoa Kỳ. Ông được YPF tài trợ để thực hiện chương trình sau đại học này trong khi làm việc trong ngành tài chính của công ty. Tuy nhiên, trong thời gian ông học tại đại học, công ty Repsol đã mua lại YPF, và bộ phận mà Galperín làm việc đã đóng cửa. Đó là lúc Galperín bắt đầu quá trình nghiên cứu và tư vấn trong ba tháng với các giáo sư khác, trong đó ông phân tích khả năng tạo ra một thị trường trực tuyến tại Châu Mỹ Latinh. Giáo sư tài chính của ông, Jack McDonald, là người giúp ông có được nhà đầu tư đầu tiên: John Muse.
          </p>
          <p>
          Sau khi nhận được bằng cử nhân của mình, ông đã dành thời gian để thành lập công ty, được giới thiệu với công chúng vào ngày 2 tháng 8 năm 1999, mở rộng nhanh chóng đến các quốc gia sau đây: Argentina, Brasil, Colombia, Chile, Ecuador, México, Peru, Uruguay và Venezuela.
          </p>
          <p>
          Mercado Libre đã có hai vòng tài trợ, mặc dù không phải là không gặp khó khăn. Theo Galperin: “Không có các công ty mạo hiểm địa phương và các công ty quốc tế cũng không muốn nhìn về Châu Mỹ Latinh”. Vòng tài trợ đầu tiên diễn ra vào tháng 11 năm 1999 và thứ hai vào tháng 5 năm 2000. Các vòng này bao gồm các đối tác sau: JP Morgan Partners, Flatiron Fund, Hicks, John Muse, Tate & Furst, Goldman Sachs, Fondo CRI, Banco Santander Central Hispano và GE Equity. Theo lời của Galperin trên Tạp chí Time: “Chúng tôi đã phải tạo ra tất cả từ đầu. Logistics cho thương mại điện tử và cơ sở hạ tầng cho thanh toán kỹ thuật số: chúng tôi đã phải tạo ra tất cả. Một số đối thủ quốc tế của chúng tôi, như eBay và Amazon, đã phát triển từ đầu. Thú vị là, chúng tôi bắt đầu phát triển nhanh hơn nhiều sau kỷ niệm 21 năm của chúng tôi. Chúng tôi đang làm cho tài chính và thương mại ở Châu Mỹ Latinh trở nên dân chủ hơn. Đây là một câu chuyện thành công qua đêm mà đã mất hơn hai thập kỷ”.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseCompanyInfo}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

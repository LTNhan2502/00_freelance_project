import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Card, Modal } from "react-bootstrap";
import logo from '../../assets/logo.jpg';
import avatar from '../../assets/icon-5355896_1920.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { getOneUserByUsername } from "../../utils/userAPI";
import "./Navi.scss";

const Navi = () => {
  const userName = localStorage.getItem("user_name")
  const isAuthenticated = !!localStorage.getItem("access_token");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openNoti, setOpenNoti] = useState(false)
  const [thisUser, setThisUser] = useState(null)
  const [dataNoti, setDataNoti] = useState([
    {id: 1, noti: "Hệ thống đã thanh toán 100.00€ cho bạn!"},
    {id: 2, noti: "Bạn đã đặt lệnh rút 100.00€.Yêu cầu của bạn đang được xét duyệt"},
    {id: 3, noti: "Hệ thống đã thanh toán 61.00€ cho bạn!"},
    {id: 4, noti: "Bạn đã đặt lệnh rút 61.00€.Yêu cầu của bạn đang được xét duyệt"},
    {id: 5, noti: "Hệ thống đã thanh toán 62.00€ cho bạn!"},
    {id: 6, noti: "Bạn đã đặt lệnh rút 62.00€.Yêu cầu của bạn đang được xét duyệt"},
  ])

  useEffect(() => {
    fetchThisUser()
  }, [])

  const fetchThisUser = async() => {
    try {
      const res = await getOneUserByUsername(userName)
      const result = res.data.data
  
      setThisUser(result)      
    } catch (error) {
      console.log("Error fetching: ", error);
      
    }
  }

  const toggleCard = () => {
    setOpen(!open);
  };

  const toggleNoti = () => {
    setOpenNoti(!openNoti)
  }

  const handleGoToBankAccount = () => {
    navigate("/bank-account")
    toggleCard()
  }

  const handleGoToWithrawHistory = () => {
    navigate("/withraw-history")
    toggleCard()
  }

  const onClickLogout = () => {
    localStorage.removeItem("user_name");
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="topnav">
          {/* Logo Section */}
          <div className="text-white p-2">
            <Link to="/home">
              <img src={logo} className="logo-img" alt="Logo" />
            </Link>
          </div>

          {/* Navigation Links */}
          <NavLink to="/home">Trang chủ</NavLink>
          <NavLink to="/events">Sự kiện</NavLink>
          <NavLink to="/warehouse">Kho</NavLink>
      
          <div className={`profiles-container ${isAuthenticated ? '' : 'd-none'}`}
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
            {/* Notification */}
            <FontAwesomeIcon icon={faBell} 
              style={{
                fontSize: "1.8rem",
                color: "white",
                paddingRight: "10px",
                cursor: "pointer"
              }}
              onClick={() => toggleNoti()}
            />
            
            <Modal
              show={openNoti} 
              onHide={toggleNoti}
              size="lg"
              className="responsive-modal"
            >
              <Modal.Header closeButton>
                <Modal.Title>Thư thông báo</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {dataNoti.map((noti) => (
                  <Card key={noti.id} className="mb-2"
                    style={{
                      backgroundColor: "transparent",
                      color: "white",
                      border: "1px solid #7a797d"
                    }}
                  >
                    <Card.Body>
                      {noti.noti}
                    </Card.Body>
                  </Card>
                ))}
              </Modal.Body>
            </Modal>


            {/* Profile Avatar Container */}
            <Button onClick={toggleCard} className="avatar-btn">
              <img src={avatar} alt="Avatar" className="avatar-img" />
            </Button>

            {/* Slide-In Panel */}
            <div className={`info-panel ${open ? 'open' : ''}`}>
              <Card className="info-card">
                <Card.Body>
                  {/* Username, ID */}
                  <div className="info-card-top">
                    <span>{thisUser?.userName}</span>
                    <span>ID: {thisUser?._id}</span>
                  </div>

                  {/* Card general info */}
                  <div className="info-card-mid p-4">
                    <div className="left-card-column">
                      <span>Số dư</span>
                      <span>{thisUser?.amount || 0} €</span>
                    </div>
                    <div className="right-card-column">
                      <span>Cấp thành viên</span>
                      <span className="text-center">{thisUser?.memberId?.packageName || "Không"}</span>
                    </div>
                  </div>

                  {/* List navigate */}
                  <ul className="list-unstyled">
                    <li><p onClick={() => alert("Nạp tiền")}>Nạp tiền</p></li>
                    <li><p onClick={() => alert("Rút tiền")}>Rút tiền</p></li>
                    <li><p onClick={() => alert("Lịch sử nạp tiền")}>Lịch sử nạp tiền</p></li>
                    <li><p onClick={() => handleGoToWithrawHistory()}>Lịch sử rút tiền</p></li>
                    <li><p onClick={() => alert("Lịch sử đơn hàng")}>Lịch sử đơn hàng</p></li>
                    <li><p onClick={() => alert("Lịch sử nhận thưởng")}>Lịch sử nhận thưởng</p></li>
                    <li><p onClick={() => alert("Báo cáo nhóm")}>Báo cáo nhóm</p></li>
                    <li><p onClick={() => handleGoToBankAccount()}>Thông tin ngân hàng</p></li>
                    <li><p onClick={() => alert("Địa chỉ")}>Địa chỉ</p></li>
                    <li><p onClick={() => alert("Chuyển đổi ngôn ngữ")}>Chuyển đổi ngôn ngữ</p></li>
                    <li><p onClick={onClickLogout}>Đăng xuất</p></li>
                  </ul>
                </Card.Body>
              </Card>
            </div>

            {/* Overlay */}
            {open && <div className="overlay" onClick={toggleCard}></div>}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Navi;

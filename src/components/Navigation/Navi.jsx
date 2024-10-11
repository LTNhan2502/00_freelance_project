import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import logo from '../../assets/logo.jpg';
import avatar from '../../assets/icon-5355896_1920.png';
import "./Navi.scss";

const Navi = () => {
  const isAuthenticated = !!localStorage.getItem("access_token");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleCard = () => {
    setOpen(!open);
  };

  const onClickBtn = (info) => {
    alert(">>> ", info);
  };

  const handleGoToBankAccount = () => {
    navigate("/bank-account")
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
          <NavLink to="/warehouse">Kho</NavLink>

          {/* Profile Avatar Container */}
          <div className={`profiles-container ${isAuthenticated ? '' : 'd-none'}`}>
            <Button onClick={toggleCard} className="avatar-btn">
              <img src={avatar} alt="Avatar" className="avatar-img" />
            </Button>

            {/* Slide-In Panel */}
            <div className={`info-panel ${open ? 'open' : ''}`}>
              <Card className="info-card">
                <Card.Body>
                  <ul className="list-unstyled">
                    <li><p onClick={() => alert("Lịch sử rút tiền")}>Lịch sử rút tiền</p></li>
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

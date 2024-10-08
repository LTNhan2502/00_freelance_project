import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Collapse, Card } from "react-bootstrap";
import logo from '../../assets/logo.jpg';
import avatar from '../../assets/icon-5355896_1920.png';
import "./Navi.scss";

class Navi extends React.Component {
  state = {
    open: false,
  };

  toggleCard = () => {
    this.setState((prevState) => ({ open: !prevState.open }));
  };

  onClickBtn = (info) => {
    alert(">>> ", info)
  }

  onClickLogout = () => {
    localStorage.removeItem("user_name")
    localStorage.removeItem("access_token")
    window.location.href = "/login";
  }

  render() {
    let isAuthenticated = !!localStorage.getItem("access_token");
    return (
      <>
        {isAuthenticated ? (
          <div className="topnav">
            <div className="text-white p-2">
              <Link to="/home">
                <img src={logo} className="logo-img"/>
              </Link>
            </div>
            <NavLink to="/home">Trang chủ</NavLink>

            {/* Không hiển thị đăng nhập đăng kí khi đã đăng nhập */}
            {!isAuthenticated ? (
              <>
                <NavLink to="/login">Đăng nhập</NavLink>
                <NavLink to="/register">Đăng ký</NavLink>
              </>
            ) : (<></>)}

            <NavLink to="/warehouse">Kho</NavLink>

            {/* Avatar Container */}
            <div className={`profiles-container ${isAuthenticated ? '' : 'd-none'}`}>
              <Button onClick={this.toggleCard} className="avatar-btn">
                <img src={avatar} alt="Avatar" className="avatar-img" />
              </Button>
              
              {/* Card Info */}
              <Collapse in={this.state.open}>
                <Card className="info-card">
                  <Card.Body>
                    <ul className="list-unstyled">
                      <li><p onClick={() => alert("Nạp tiền")}>Nạp tiền</p></li>
                      <li><p onClick={() => alert("Rút tiền")}>Rút tiền</p></li>
                      <li><p onClick={() => alert("Lịch sử rút tiền")}>Lịch sử rút tiền</p></li>
                      <li><p onClick={() => alert("Thông tin ngân hàng")}>Thông tin ngân hàng</p></li>
                      <li><p onClick={() => alert("Địa chỉ")}>Địa chỉ</p></li>
                      <li><p onClick={() => alert("Chuyển đổi ngôn ngữ")}>Chuyển đổi ngôn ngữ</p></li>
                      <li><p onClick={() => this.onClickLogout()}>Đăng xuất</p></li>
                    </ul>
                  </Card.Body>
                </Card>
              </Collapse>
            </div>
          </div>

        ) : (<></>)}
      </>
    );
  }
}

export default Navi;

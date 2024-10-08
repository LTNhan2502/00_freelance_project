import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "./Login.scss";
import { loginUser } from "../../utils/userAPI";

export default function Login (){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [isShowPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Ẩn hoặc hiện mật khẩu đã nhập
  const onShowOrHide = () => {
    setShowPassword(!isShowPassword);
  };

  // Kiểm tra điều kiện form
  const validateForm = () => {
    let valid = true;
    let newErrors = { username: "", password: "" };

    if (username.trim() === "") {
      newErrors.username = "Tên đăng nhập không được để trống";
      valid = false;
    }
    if (password.trim() === "") {
      newErrors.password = "Mật khẩu không được để trống";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Submit form
  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        let loginAPI = await loginUser(username, password);
        console.log(loginAPI.data);

        if (loginAPI && loginAPI.data.EC === 0) {
          // Đăng nhập thành công
          localStorage.setItem("access_token", loginAPI.data.access_token);
          localStorage.setItem("user_name", loginAPI.data.info);
          toast.success("Đăng nhập thành công!");

          // Chuyển hướng về trang home
          navigate("/home");
          window.location.reload()
        } else {
          // Đăng nhập không thành công 
          toast.error(loginAPI.data.message || "Đăng nhập không thành công");
        }

      } catch (error) {
        console.error(error);
        toast.error("Đã xảy ra lỗi trong quá trình đăng nhập.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-title">Đăng nhập vào website</div>
      {/* Start form */}
      <form onSubmit={onSubmitForm}>
        {/* Start username input */}
        <div className="_input-group">
          <div className="input-container">
            <span className="icon">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <input
              type="text"
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <small className={errors.username ? "visible" : ""}>
            {errors.username}
          </small>
        </div>
        {/* End username input */}

        {/* Start password input */}
        <div className="_input-group">
          <div className="input-container">
            <span className="icon">
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              type={isShowPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="eye-icon" onClick={onShowOrHide}>
              <FontAwesomeIcon icon={faEye} />
            </span>
          </div>
          <small className={errors.password ? "visible" : ""}>
            {errors.password}
          </small>
        </div>
        {/* End password input */}

        {/* Start Register navigator */}
        <div className="register-navigator">
          <div>
            Chưa có tài khoản? <Link to="/register" className="register">Đăng ký</Link>
          </div>
        </div>
        {/* End Register navigator */}

        <input
          className="btn-login"
          type="submit"
          value="ĐĂNG NHẬP"
        />
      </form>
      {/* End form */}
    </div>
  );
}

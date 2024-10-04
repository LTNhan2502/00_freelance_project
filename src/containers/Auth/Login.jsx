import React from "react";
import "./Login.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

class Login extends React.Component {
  state = {
    // users là dữ liệu lấy từ api
    user: [{ id: 1, username: "trongnhan000", password: "123123" }],
    // username, password là dữ liệu nhập vào
    username: "",
    password: "",
    errors: {
      username: "",
      password: "",
    },
    isShowPassword: false,
  };

  //Làm input username có thể nhập liệu
  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  //Làm input password có thể nhập liệu
  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  //Ẩn hoặc hiện mật khẩu đã nhập
  onShowOrHide = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  //Kiểm tra điều kiện form
  validateForm = () => {
    const { username, password, errors } = this.state;

    let valid = true;

    if (username.trim() === "") {
      errors.username = "Tên đăng nhập không được để trống";
      valid = false;
    }
    if (password.trim() === "") {
      errors.password = "Mật khẩu không được để trống";
      valid = false;
    }

    this.setState({ errors });
    return valid;
  };

  //Submit form
  onSubmitForm = (e) => {
    e.preventDefault();

    if (this.validateForm()) {
      // Lấy data từ form
      console.log(">>Check data login: ", this.state);
      
      this.setState({
        errors: {
          username: "",
          password: "",
        },
      });

      toast.success("Đăng nhập thành công!");
    }
  };

  render() {
    let { username, password, errors } = this.state;
    return (
      <>
        <div className="login-container">
          <div className="login-title">Đăng nhập vào website</div>
          {/* Start form */}
          <form>
            {/* Start username input */}
            <div className="input-group">
              <div className="input-container">
                <span className="icon">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <input
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                  value={username}
                  onChange={(e) => this.onChangeUsername(e)}
                />
              </div>
              <small className={errors.username ? "visible" : ""}>
                {errors.username}
              </small>
            </div>
            {/* End username input */}

            {/* Start password input */}
            <div className="input-group">
              <div className="input-container">
                <span className="icon">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  type={
                    this.state.isShowPassword === false ? "password" : "text"
                  }
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => {
                    this.onChangePassword(e);
                  }}
                />
                <span className="eye-icon" onClick={() => this.onShowOrHide()}>
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
                Chưa có tài khoản? <span className="register">Đăng ký</span>
              </div>
            </div>
            {/* End Register navigator */}

            <input
              className="btn-login"
              type="submit"
              value="ĐĂNG NHẬP"
              onClick={(e) => this.onSubmitForm(e)}
            />
          </form>
          {/* End form */}
        </div>
      </>
    );
  }
}

export default Login;

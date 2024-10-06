import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faEye, faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock, faPhone } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Register.scss";
import { registerUser } from "../../utils/userAPI";

const Register = () => {
  const navigate = useNavigate()
  const [isShowPass, setShowOrHidePass] = useState(false);
  const [isShowRePass, setShowOrHideRePass] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      phoneNumber: "",
      password: "",
      retypePassword: "",
      code: "",
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .matches(/^[a-zA-Z0-9]*$/, "Không được chứa ký tự đặc biệt")
        .min(6, "Username phải có ít nhất 6 kí tự")
        .max(25, "Username không được quá 25 ký tự")
        .required("Không được để trống"),
      phoneNumber: Yup.string()
        .matches(/^0\d{1,9}$/, "Số điện thoại không hợp lệ")
        .required("Không được để trống"),
      password: Yup.string()
        .min(6, "Mật khẩu của bạn quá ngắn")
        .required("Không được để trống"),
      retypePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Mật khẩu không trùng khớp")
        .required("Không được để trống"),
      code: Yup.string().required("Không được để trống"),
    }),

    // Gửi submit về server
    onSubmit: async (values) => {
      const registerAPI = await registerUser(
        values.username,
        values.phoneNumber,
        values.password,
        values.code
      );

      // Xem dữ liệu ở đây
      console.log(registerAPI);

      if(registerAPI && registerAPI.data.EC === 0) {
        toast.success("Đăng kí thành công")
        //Chuyển về trang login
        navigate("/login")
      }else {
        if(registerAPI.data.data === "Tên đăng nhập đã tồn tại"){
          toast.error("Tên đăng nhập này đã tồn tại")
        }else if(registerAPI.data.data === "Mã giới thiệu không hợp lệ"){
          toast.error("Mã giới thiệu không hợp lệ")
        }else if(registerAPI.data.data === "Số điện thoại đã tồn tại"){
          toast.error("Số điện thoại đã tồn tại")
        }
      }
    },
  });

  //Ẩn hoặc hiện mật khẩu
  const onShowOrHidePass = () => {
    setShowOrHidePass((prevState) => !prevState);
  };

  //Ẩn hoặc hiện nhập lại mật khẩu
  const onShowOrHideRePass = () => {
    setShowOrHideRePass((prevState) => !prevState);
  };

  return (
    <>
      <div className="login-container">
        <div className="login-title">Tham gia vào website ngay</div>
        {/* Start form */}
        <form onSubmit={formik.handleSubmit}>
          {/* Start username input */}
          <div className="_input-group">
            <div className="input-container">
              <span className="icon">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                type="text"
                name="username"
                placeholder="Nhập tên đăng nhập"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
            </div>
            {formik.touched.username && formik.errors.username ? (
              <small className="error">{formik.errors.username}</small>
            ) : (
              <small>&nbsp;</small>
            )}
          </div>
          {/* End username input */}

          {/* Start phone number input */}
          <div className="_input-group">
            <div className="input-container">
              <span className="icon">
                <FontAwesomeIcon icon={faPhone} />
              </span>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Nhập số điện thoại"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
              />
            </div>
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <small className="error">{formik.errors.phoneNumber}</small>
            ) : (
              <small>&nbsp;</small>
            )}
          </div>
          {/* End phone number input */}

          {/* Start password input */}
          <div className="_input-group">
            <div className="input-container">
              <span className="icon">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                type={isShowPass === false ? "password" : "text"}
                name="password"
                placeholder="Nhập mật khẩu"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <span className="eye-icon" onClick={onShowOrHidePass}>
                <FontAwesomeIcon icon={faEye} />
              </span>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <small className="error">{formik.errors.password}</small>
            ) : (
              <small>&nbsp;</small>
            )}
          </div>
          {/* End password input */}

          {/* Start retype password input */}
          <div className="_input-group">
            <div className="input-container">
              <span className="icon">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                type={isShowRePass === false ? "password" : "text"}
                name="retypePassword"
                placeholder="Nhập lại mật khẩu"
                value={formik.values.retypePassword}
                onChange={formik.handleChange}
              />
              <span className="eye-icon" onClick={() => onShowOrHideRePass()}>
                <FontAwesomeIcon icon={faEye} />
              </span>
            </div>
            {formik.touched.retypePassword && formik.errors.retypePassword ? (
              <small className="error">{formik.errors.retypePassword}</small>
            ) : (
              <small>&nbsp;</small>
            )}
          </div>
          {/* End retype password input */}

          {/* Start code input */}
          <div className="_input-group">
            <div className="input-container">
              <span className="icon">
                <FontAwesomeIcon icon={faBookmark} />
              </span>
              <input
                type="text"
                name="code"
                placeholder="Nhập mã mời"
                value={formik.values.code}
                onChange={formik.handleChange}
              />
            </div>
            {formik.touched.code && formik.errors.code ? (
              <small className="error">{formik.errors.code}</small>
            ) : (
              <small>&nbsp;</small>
            )}
          </div>
          {/* End code input */}

          {/* Start Register navigator */}
          <div className="register-navigator">
            <div>
              Đã có tài khoản?{" "}
              <Link to="/login" className="register">
                Đăng nhập
              </Link>
            </div>
          </div>
          {/* End Register navigator */}

          <input className="btn-login" type="submit" value="ĐĂNG KÝ" />
        </form>
        {/* End form */}
      </div>
    </>
  );
};

export default Register;

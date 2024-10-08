import React from "react";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import Navi from "../components/Navigation/Navi";

class App extends React.Component {
  render() {
    return (
      <>
        <div className="main-container-image"></div>
        <div className="main-container">
          <div className="content-container">            
            <div className="navigation">
              <Navi/>
            </div>
            <div className="content">
              <Outlet/>
            </div>
          </div>
        </div>

        {/* Toastify dùng để hiển thị thông báo */}
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </>
    );
  }
}

export default App;

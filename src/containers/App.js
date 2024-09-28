import React from "react";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "../components/Navigation/Nav";
import { Outlet } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <>
        <div className="navigation">
          <Nav/>
        </div>
        <div className="content">
          <Outlet/>
        </div>

        {/* Toastify dùng để hiển thị thông báo */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
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

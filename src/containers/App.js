import React from "react";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profiles from './Profiles/Profiles';
import Home from './Home/Home';

class App extends React.Component {
  render() {
    return (
      <>
        <Profiles/>
        <Home/>

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

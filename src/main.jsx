import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { ToastContainer } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import "sweetalert2/src/sweetalert2.scss";
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <App />
      <ToastContainer
        position="top-center"
        autoClose={1250}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </Provider>
  </>
);

import Swal from "sweetalert2";
import network_err from "/image/network-error.png";
import { QRCodeCanvas } from "qrcode.react";
import { customFetch } from "../../utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CarouseView from "../report/CarouseView";
import PostList from "../posts/PostList";
import LoginTest from "../LoginTest";
import gambar from "/image/sultra.png";

const First = () => {
  return (
    <>
      {/* <SipReportView /> */}
      {/* <CarouseView /> */}
      {/* <PostList /> */}
      {/* <LoginTest /> */}
    </>
  );
};

export default First;

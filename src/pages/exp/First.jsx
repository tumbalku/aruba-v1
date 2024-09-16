import Swal from "sweetalert2";
import network_err from "/image/network-error.png";
import { QRCodeCanvas } from "qrcode.react";
import { customFetch } from "../../utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SipReportView from "../report/SipReportView";
import CarouseView from "../report/CarouseView";

const First = () => {
  return (
    <>
      {/* <SipReportView /> */}
      <CarouseView />
    </>
  );
};

export default First;

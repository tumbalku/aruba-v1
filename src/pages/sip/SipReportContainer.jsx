import { Link } from "react-router-dom";
import Kop from "../report/Kop";
import SipReportScroll from "./components/SipReportScroll";

const SipReportContainer = () => {
  return (
    <div className="md:px-16 px-4">
      <div className="my-5">
        <Kop />
      </div>
      <SipReportScroll />
      <div className="flex justify-end my-10">
        <Link to="/" className="btn btn-primary btn-xs">
          Kembali
        </Link>
      </div>
    </div>
  );
};

export default SipReportContainer;

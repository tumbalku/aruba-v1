import React from "react";
import TitleSection from "../../components/TitleSection";
import CutiReportView from "./CutiReportView";
import { Link } from "react-router-dom";

const CutiReportViewScroll = () => {
  return (
    <div className="px-16">
      <div className="my-14">
        <TitleSection
          title={"Laporan Cuti Pegawai"}
          desc={
            "Pantau status dan riwayat cuti pegawai secara lengkap dan akurat melalui laporan ini."
          }
        />
      </div>
      <CutiReportView />
      <div className="flex justify-end my-10">
        <Link to="/" className="btn btn-primary btn-xs">
          Kembali
        </Link>
      </div>
    </div>
  );
};

export default CutiReportViewScroll;

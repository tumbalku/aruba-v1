import { Link } from "react-router-dom";
import { Hero } from "../components";
import TitleSection from "../components/TitleSection";
import { CutiReportView } from "./cuti";

const Landing = () => {
  return (
    <section>
      <Hero />

      <div className="mt-24 mb-12">
        <TitleSection
          title={"Laporan Cuti Pegawai"}
          desc={
            "Pantau status dan riwayat cuti pegawai secara lengkap dan akurat melalui laporan ini."
          }
        />
      </div>
      <div className="flex justify-end my-10">
        <Link to="/view/report/cuti" className="btn btn-primary btn-xs">
          Lihat detail cuti
        </Link>
        <Link to="/view/report/sip" className="btn btn-primary btn-xs">
          Lihat detail sip
        </Link>
      </div>
    </section>
  );
};
export default Landing;

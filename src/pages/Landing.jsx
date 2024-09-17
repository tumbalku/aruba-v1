import { Hero } from "../components";
import TitleSection from "../components/TitleSection";
import CutiReportView from "./report/CutiReportView";
const Landing = () => {
  return (
    <section>
      <Hero />

      <TitleSection
        title={"Laporan Cuti Pegawai"}
        desc={
          "Pantau status dan riwayat cuti pegawai secara lengkap dan akurat melalui laporan ini."
        }
      />
      <CutiReportView />
    </section>
  );
};
export default Landing;

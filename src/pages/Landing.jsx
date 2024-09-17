import { Hero } from "../components";
import TitleSection from "../components/TitleSection";
import SipReportView from "./report/SipReportView";
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
      <SipReportView />
    </section>
  );
};
export default Landing;

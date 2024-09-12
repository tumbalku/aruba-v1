import { LiaFileMedicalAltSolid } from "react-icons/lia";
import { FaMoneyBillTrendUp, FaListCheck } from "react-icons/fa6";
import { GrCertificate } from "react-icons/gr";
import { GiSoapExperiment } from "react-icons/gi";
import { Card } from "../components";

const Letter = () => {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <Card
        title="Cuti"
        color="bg-purple-400 hover:bg-purple-500 transition duration-500 text-black"
        url="/cuti"
      >
        <LiaFileMedicalAltSolid className="w-14 h-14 " />
      </Card>
      <Card
        title="SIP"
        color="bg-yellow-400 hover:bg-yellow-500 transition duration-500 text-black"
        url="/sip"
      >
        <GiSoapExperiment className="w-14 h-14" />
      </Card>
      <Card
        title="KGB"
        color="bg-emerald-400 hover:bg-emerald-500 transition duration-500 text-black"
        url="/kgb"
      >
        <FaMoneyBillTrendUp className="w-14 h-14" />
      </Card>
      <Card
        title="SPMT "
        color="bg-orange-400 hover:bg-orange-500 transition duration-500 text-black"
        url="/spmt"
      >
        <FaListCheck className="w-14 h-14" />
      </Card>
      <Card
        title="Akreditasi"
        color="bg-cyan-400 hover:bg-cyan-500 transition duration-500 text-black"
        url="/akreditasi"
      >
        <GrCertificate className="w-14 h-14" />
      </Card>
    </section>
  );
};

export default Letter;

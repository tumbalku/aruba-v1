import { LiaFileMedicalAltSolid } from "react-icons/lia";
import { FaMoneyBillTrendUp, FaListCheck } from "react-icons/fa6";
import { GrCertificate } from "react-icons/gr";
import { GiSoapExperiment } from "react-icons/gi";
import { Card } from "../components";

const Letter = () => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      <Card title="Cuti" color="bg-purple-400" url="/letters/cuti">
        <LiaFileMedicalAltSolid className="w-14 h-14 text-black" />
      </Card>
      <Card title="SIP" color="bg-yellow-400 text-black" maintenance>
        <GiSoapExperiment className="w-14 h-14" />
      </Card>
      <Card title="KGB" color="bg-emerald-400 text-black" url="/letters/kgb">
        <FaMoneyBillTrendUp className="w-14 h-14" />
      </Card>
      <Card title="SPMT " color="bg-orange-400 text-black" maintenance>
        <FaListCheck className="w-14 h-14" />
      </Card>
      <Card title="Akreditasi" color="bg-cyan-400 text-black" maintenance>
        <GrCertificate className="w-14 h-14" />
      </Card>
    </section>
  );
};

export default Letter;

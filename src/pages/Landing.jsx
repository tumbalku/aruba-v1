import { Hero } from "../components";
import SipReportView from "./report/SipReportView";
const Landing = () => {
  return (
    <section>
      <Hero />
      <div className="mt-24">
        <SipReportView />
      </div>
    </section>
  );
};
export default Landing;

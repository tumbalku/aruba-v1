import { Hero } from "../components";

import HeroReport from "../components/HeroReport";

const Landing = () => {
  return (
    <section>
      <Hero />
      <div className="my-24">
        <HeroReport />
      </div>
    </section>
  );
};
export default Landing;

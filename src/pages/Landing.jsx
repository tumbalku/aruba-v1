import { Hero } from "../components";
import HeroBlogs from "../components/hero/HeroBlogs";
import HeroDirection from "../components/hero/HeroDirection";
import HeroFeatures from "../components/hero/HeroFeatures";
import HeroUsers from "../components/hero/HeroUsers";

import HeroReport from "../components/HeroReport";

const Landing = () => {
  return (
    <section>
      <Hero />
      <div className="my-24">
        <HeroReport />
      </div>
      <div className="my-24">
        <HeroBlogs />
      </div>
      <div className="my-24">
        <HeroDirection />
      </div>
      <div className="my-24">
        <HeroUsers />
      </div>
      <div className="py-24 bg-base-300 px-5">
        <HeroFeatures />
      </div>
    </section>
  );
};
export default Landing;

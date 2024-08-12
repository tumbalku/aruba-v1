import { useRouteError, Link } from "react-router-dom";
import { GrHostMaintenance } from "react-icons/gr";
const Maintenance = () => {
  return (
    <main className="grid min-h-screen place-items-center px-8">
      <div className="text-center">
        <div className="flex justify-center">
          <GrHostMaintenance className="text-9xl font-bold text-primary" />
        </div>
        <h4 className="text-3xl font-bold mt-4 tracking-tight sm:text-5xl capitalize">
          page is under maintenance
        </h4>
        <p className="text-lg mt-6 leading-7">
          Sorry we currently updating servers to improve service.
        </p>
        <div className="mt-10">
          <Link to="/" className="btn btn-secondary capitalize">
            please go back home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Maintenance;

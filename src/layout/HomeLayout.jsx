import { Outlet, useLocation, useNavigation } from "react-router-dom";
import { Loading, Navbar, PrevLinks } from "../components";
import { useSelector } from "react-redux";

const HomeLayout = () => {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";
  return (
    <>
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <section className="align-element py-20 font-poppins">
          <PrevLinks />
          <Outlet />
        </section>
      )}
    </>
  );
};

export default HomeLayout;

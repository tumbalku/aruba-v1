import { Link, Outlet, useNavigation } from "react-router-dom";
import { Loading } from "../components";
import LatestNews from "../pages/news/LatestNews";

const NewsLayout = () => {
  const navigation = useNavigation();
  console.log(navigation);
  const isLoading = navigation.state === "loading";
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-[5]">{isLoading ? <Loading /> : <Outlet />}</div>

      <div className="h-fit flex-[2]">
        <div
          className="md:h-[150px] p-5 flex flex-col justify-center gap-2 bg-cover bg-center relative"
          style={{ backgroundImage: "url('/image/hero1.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-55 "></div>
          <h1 className="font-bold text-2xl text-white z-10">
            Kunjungi Profile ARUBA
          </h1>
          <Link
            to="/about"
            className="text-primary text-xs md:text-sm z-10 hover:text-secondary"
          >
            Lihat RSUD Bahteramas lebih dekat
          </Link>
        </div>
        <div className="flex flex-row gap-1 justify-center items-center my-2">
          <h1 className="font-bold text-xl text-nowrap">Info terkini</h1>
          <span className="border border-black w-full h-fit"></span>
        </div>
        <LatestNews />
      </div>
    </div>
  );
};

export default NewsLayout;

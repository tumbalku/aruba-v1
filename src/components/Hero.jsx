import { Link } from "react-router-dom";
import hero1 from "/image/hero1.jpg";
import hero2 from "/image/hero2.jpg";
import hero3 from "/image/hero3.jpg";
import hero4 from "/image/hero4.jpg";
const carouselImageList = [hero1, hero2, hero4, hero3];
import CarouseView from "../pages/report/CarouseView";
import Carousel from "./Carousel";

const Hero = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-24 items-center">
      <div className="text-center sm:text-left">
        <h3 className="text-lg font-bold mb-4">
          Optimalkan Produktivitas Anda
        </h3>

        <h1 className="font-bold text-4xl sm:text-5xl tracking-tight max-w-2xl">
          Jadikan Proses Administrasi Bebas Hambatan dan Terorganisir
        </h1>
        <p className="mt-4 leading-8 max-w-xl text-sm capitalize">
          Prosedur mudah dan cepat, sehingga Anda bisa lebih fokus pada
          pekerjaan penting dalam pelayanan kesehatan
        </p>
        <div className="mt-6">
          <Link to="/news" className="btn btn-primary btn-wide text-sm">
            Pelajari lebih lanjut
          </Link>
        </div>
      </div>

      <CarouseView />
      {/* <Carousel carouselImageList={carouselImageList} /> */}
      {/* <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
        {carouselImageList.map((image) => {
          return (
            <div key={image} className="carousel-item">
              <img
                src={image}
                className="object-cover rounded-box h-full w-80"
              />
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

export default Hero;

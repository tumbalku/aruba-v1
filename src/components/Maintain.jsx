import { Link } from "react-router-dom";
import maintain from "/image/maintain.svg";

const Maintain = ({ url }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={maintain} alt="" className="w-72 h-72" />
      <div className="text-center flex flex-col gap-4 items-center">
        <h1 className="font-bold text-2xl capitalize">Segera hadir</h1>
        <p className="max-w-[40rem]">
          Halaman baru ini akan hadir dengan berbagai fitur dan layanan terbaru.
          Pastikan Anda menjadi yang pertama tahu.
        </p>
        <Link to={url} className="btn btn-primary btn-sm w-fit">
          Kembali
        </Link>
      </div>
    </div>
  );
};

export default Maintain;

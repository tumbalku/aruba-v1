import { Link } from "react-router-dom";
import network_err from "/image/network-error.png";

const NetworkError = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={network_err} alt="" className="w-80 h-80" />
      <div className="text-center flex flex-col gap-4 items-center">
        <h1 className="font-bold text-2xl capitalize">
          Maaf, Terjadi Gangguan Server 🚧
        </h1>
        <p className="max-w-[40rem]">
          Jika masalah berlanjut, silakan hubungi tim dukungan kami atau coba
          muat ulang halaman utama beberapa saat lagi.
        </p>
        <Link to="/" className="btn btn-primary btn-sm w-fit">
          Kembali
        </Link>
      </div>
    </div>
  );
};

export default NetworkError;

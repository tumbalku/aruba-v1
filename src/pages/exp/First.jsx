import network_err from "/image/network-error.png";

const First = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={network_err} alt="" className="w-72 h-72" />
      <div className="text-center flex flex-col gap-4">
        <h1 className="font-bold text-2xl capitalize">
          Maaf, Terjadi Gangguan Server 🚧
        </h1>
        <p className="max-w-[40rem]">
          Jika masalah berlanjut, silakan hubungi tim dukungan kami atau coba
          muat ulang halaman ini beberapa saat lagi.
        </p>
      </div>
    </div>
  );
};

export default First;

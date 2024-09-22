import gambar from "/image/sultra.png";

const Kop = () => {
  return (
    <section className="border-b-2 border-black flex flex-col sm:flex-row justify-center items-center lg:gap-4 py-4">
      <img
        src={gambar}
        alt=""
        className="w-16 h-16 sm:w-24 sm:h-24 lg:w-36 lg:h-36 object-cover"
      />
      <div className="text-center flex flex-col ">
        <h2 className="font-semibold lg:text-2xl sm:text-lg text-xs">
          PEMERINTAH PROVINSI SULAWESI TENGGARA
        </h2>
        <h1 className="font-semibold lg:text-4xl sm:text-2xl text-base">
          RUMAH SAKIT UMUM DAERAH BAHTERAMAS
        </h1>
        <p className="lg:text-base sm:text-sm text-[10px] ">
          Jalan Kapten Piere Tandean No. 50 Telp. (0401) 3195611 Baruga Kendari
        </p>
        <p className="lg:text-base sm:text-sm text-[10px]">
          Email: admin@rsud-bahteramas.go.id Website: www.rsud-bahteramas.go.id
        </p>
      </div>
    </section>
  );
};

export default Kop;

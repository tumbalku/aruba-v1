import SectionHeader from "../section/SectionHeader";
import SectionTitle from "../section/SectionTitle";

import { FcNews } from "react-icons/fc";
import { FcOpenedFolder } from "react-icons/fc";
import { FcComboChart } from "react-icons/fc";

import { FcCalendar } from "react-icons/fc";

const HeroFeatures = () => {
  return (
    <div>
      <div className="space-y-4">
        <div className="flex justify-center">
          <SectionHeader text="Fitur Unggulan Kami" />
        </div>
        <div className="text-center">
          <SectionTitle text="Menghadirkan Solusi Terbaik" />
        </div>
        <div className="mt-2 mb-4 flex items-center justify-center">
          <p className="text-sm opacity-75 max-w-xl text-center">
            Kami memberikan kemudahan untuk Anda dalam melakukan hal-hal yang
            seharusnya dapat dikerjakan dalam waktu yang sesingkat singkatnya.
          </p>
        </div>
      </div>
      {/* content */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-12">
        <CardFeature
          title={"Membuat Cuti"}
          desc={"Cukup dengan waktu 2 - 3 menit untuk mengajukan cuti."}
        >
          <FcCalendar className="w-10 h-10" />
        </CardFeature>

        <CardFeature
          title={"Melihat Laporan Cuti & SIP"}
          desc={"Mendapatkan informasi real-time."}
        >
          <FcComboChart className="w-10 h-10" />
        </CardFeature>
        <CardFeature
          title={"Dokumen bebas download"}
          desc={"Sekali klik satu dokumen."}
        >
          <FcOpenedFolder className="w-10 h-10" />
        </CardFeature>
        <CardFeature
          title={"Membaca Artikel & Berita"}
          desc={"Menjadi orang yang pertama mengetahui informasi terupdate."}
        >
          <FcNews className="w-10 h-10" />
        </CardFeature>
      </div>
    </div>
  );
};

export default HeroFeatures;

const CardFeature = ({ title, desc, children }) => {
  return (
    <div className="rounded-lg flex flex-col items-center px-2 py-6 gap-2 md:gap-4 hover:bg-primary/20 transition-all duration-700 ease-in-out">
      <div className="w-20 h-20 rounded-full bg-secondary/30 flex items-center justify-center">
        {children}
      </div>
      <h3 className="text-sm md:text-base font-semibold text-center">
        {title}
      </h3>
      {/* Menggunakan title dari props */}
      <p className="text-center text-xs">
        {desc} {/* Menggunakan desc dari props */}
      </p>
    </div>
  );
};

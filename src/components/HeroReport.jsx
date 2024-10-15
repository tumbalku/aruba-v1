import { Link } from "react-router-dom";
import SectionHeader from "./section/SectionHeader";
import pic from "/image/hero1.jpg";
import { useEffect, useRef, useState } from "react";
import { animateCounter, customFetch } from "../utils";
import SectionTitle from "./section/SectionTitle";

const HeroReport = () => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  // const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await customFetch("/stats/count/cuti-and-sip");
        const sipCount = response.data.data.sip;
        const cutiCount = response.data.data.cuti;
        setCount(sipCount);
        setCount2(cutiCount);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Memulai animasi ketika elemen terlihat
          observer.unobserve(entry.target); // Hentikan pengamatan setelah terlihat
        }
      },
      { threshold: 1 } // Mulai saat 50% dari elemen terlihat
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const first = 100;
      const second = 50;
      const detik = first + second > 100 ? 1000 : 5000;
      const runCounter = async () => {
        await animateCounter(0, count, detik, setCount); // Hitung dengan durasi 5 detik
      };
      const runCounter2 = async () => {
        await animateCounter(0, count2, detik, setCount2); // Hitung dengan durasi 5 detik
      };

      runCounter();
      runCounter2();
    }
  }, [isVisible]);

  return (
    <div className="grid md:grid-cols-2 gap-24" ref={sectionRef}>
      <div className="flex flex-col">
        <div className="flex flex-col gap-4 max-w-[350px]">
          <SectionHeader text="Laporan Real-time" />
          <SectionTitle text="Kami memberikan informasi secara real-time" />
        </div>

        <div className="mt-2 mb-4">
          <p className="text-sm opacity-75">
            Pantau dan kelola informasi Cuti serta Surat Izin Peraktek Anda
            secara real-time, sehingga Anda selalu terinformasi dan dapat
            membuat keputusan tepat waktu. Layanan kami memastikan informasi
            akurat setiap saat.
          </p>
        </div>
        <div className="flex flex-row gap-5 h-full">
          <Link
            to="/view/report/cuti"
            className="bg-teal-500 flex justify-center items-center flex-[1] rounded-lg min-h-[150px] hover:bg-teal-600 transition duration-500"
          >
            <div className="text-center">
              <h1 className="font-bold text-5xl">{count2}</h1>
              <p className="text-lg">Cuti</p>
            </div>
          </Link>
          <Link
            to="/view/report/sip"
            className="bg-purple-500 flex justify-center items-center flex-[1] rounded-lg min-h-[150px] hover:bg-purple-600 transition duration-500"
          >
            <div className="text-center">
              <h1 className="font-bold text-5xl">{count}</h1>
              <p className="text-lg">SIP</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="hidden md:inline-block mt-16 relative after:content-[''] after:w-full after:h-full after:bg-custom-gradient-primary after:absolute after:top-[20px] after:left-[-20px] after:z-[1] ">
        <img
          src={pic}
          alt=""
          className="w-full h-[350px] object-cover relative z-[2]"
        />
      </div>
    </div>
  );
};

export default HeroReport;

import React, { useEffect, useRef } from "react";
import hero1 from "/image/hero1.jpg";
import hero2 from "/image/hero2.jpg";
import hero3 from "/image/hero3.jpg";
import hero4 from "/image/hero4.jpg";
const carouselImageList = [hero1, hero2, hero4, hero3];

const CarouseView = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    let scrollInterval;

    const startScroll = () => {
      scrollInterval = setInterval(() => {
        if (
          carousel.scrollLeft + carousel.offsetWidth >=
          carousel.scrollWidth
        ) {
          // Reset scroll ke awal jika sudah mencapai akhir
          carousel.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Scroll ke kanan secara otomatis
          carousel.scrollBy({ left: 300, behavior: "smooth" });
        }
      }, 3000); // Scroll setiap 3 detik
    };

    startScroll();

    // Bersihkan interval saat komponen tidak aktif
    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div>
      <div
        ref={carouselRef}
        className="carousel carousel-center bg-neutral rounded-box max-w-full space-x-4 p-4"
      >
        {carouselImageList.map((image, index) => (
          <div key={index} className="carousel-item">
            <img
              src={image}
              className="rounded-box  h-[400px] w-[300px] object-cover"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouseView;

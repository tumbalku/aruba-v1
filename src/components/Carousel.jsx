import { useEffect, useRef } from "react";

const Carousel = ({ carouselImageList }) => {
  const carouselRef = useRef(null);
  let currentIndex = 0;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (carouselRef.current) {
        const items = carouselRef.current.children;
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex].scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
      }
    }, 4000);

    return () => clearInterval(intervalId);
  }, [carouselImageList]);

  return (
    <div
      ref={carouselRef}
      className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box"
    >
      {carouselImageList.map((image) => (
        <div key={image} className="carousel-item">
          <img src={image} className="object-cover rounded-box h-full w-80" />
        </div>
      ))}
    </div>
  );
};

export default Carousel;

import { useState, useEffect } from "react";

function Counter({ limit }) {
  const [count, setCount] = useState(0);
  console.log("counter");
  useEffect(() => {
    // Set interval untuk memperbarui nilai count setiap 50ms
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount < limit) {
          return prevCount + 1;
        } else {
          clearInterval(interval); // Hentikan interval setelah mencapai 100
          return prevCount;
        }
      });
    }, 5); // Interval 50ms untuk kecepatan animasi

    // Bersihkan interval saat komponen di-unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Hitung: {count}</h1>
    </div>
  );
}

export default Counter;

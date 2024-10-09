import React, { useState, useEffect } from "react";
import { animateCounter } from "../../utils";

function Second() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const runCounter = async () => {
      await animateCounter(0, 100, 5000, setCount); // Hitung dengan durasi 5 detik
    };

    runCounter(); // Jalankan animasi saat komponen dimount
  }, []);

  console.log("hola");

  return (
    <div>
      <h1>Hitungan: {count}</h1>
    </div>
  );
}

export default Second;

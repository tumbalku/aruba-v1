import { useState } from "react";
// import { formatPriceUSD } from "../utils";

const FormRange = ({ name, label, size, price }) => {
  const step = 10000;
  const maxPrice = 100000;
  // const [selectedPrice, setSelectedPrice] = useState(price || maxPrice);

  return (
    <div className="form-control">
      {/* <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
        <span>{formatPriceUSD(selectedPrice)}</span>
      </label>
      <input
        type="range"
        name={name}
        min={0}
        max={maxPrice}
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(e.target.value)}
        step={step}
        className={`range range-primary ${size}`}
      />
      <div className="w-full flex justify-between text-xs px-2 mt-2">
        <span className="font-bold">0</span>
        <span className="font-bold">Max : {formatPriceUSD(maxPrice)}</span>
      </div> */}
    </div>
  );
};

export default FormRange;

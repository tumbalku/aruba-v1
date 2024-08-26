import React from "react";
import InputField from "./input-v2/InputField";

const Kop = () => {
  return (
    <div className="p-5 bg-base-200 ">
      <h1 className="text-center text-2xl font-semibold">Cuti Sakit</h1>
      <div className="grid grid-cols-3 gap-4">
        <InputField
          label="Nomor"
          name="uniKop"
          extClass="input-sm"
          type="number"
        />
        <InputField label="romawi" name="uniKop" extClass="input-sm" />
        <InputField
          label="Tahun"
          name="tahun"
          extClass="input-sm"
          type="number"
        />
      </div>
    </div>
  );
};

export default Kop;

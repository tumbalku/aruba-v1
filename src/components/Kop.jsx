import React from "react";
import InputField from "./input-v2/InputField";
import { years, romawis } from "../data";
import SelectInput from "./SelectInput";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
import { Form } from "react-router-dom";
const Kop = ({ name, romawi, year, id, nomor }) => {
  return (
    <div className="px-4 py-6 bg-base-200 rounded-lg hover:shadow-xl transition duration-500">
      <h1 className="text-center lg:text-2xl text-lg  font-semibold mb-4">
        {name}
      </h1>
      <Form
        method="POST"
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-2"
      >
        <div className="grid grid-cols-3 xs:gap-4 gap-2 flex-1">
          <input type="hidden" name="id" value={id} />
          <InputField
            label="Nomor"
            name="uniKop"
            extClass="md:input-sm input-xs"
            type="number"
            value={nomor}
          />
          <SelectInput
            label="Romawi"
            list={romawis}
            name="romawi"
            labelSize="text-xs"
            size="md:select-sm select-xs"
            defaultValue={romawi}
          />
          <SelectInput
            label="Years"
            list={years}
            name="year"
            labelSize="text-xs"
            size="md:select-sm select-xs"
            defaultValue={year}
          />
        </div>
        <div className="text-right">
          <button type="submit" className="small-btn btn-primary">
            Update
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Kop;

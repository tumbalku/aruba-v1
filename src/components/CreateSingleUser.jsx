import FormCheckbox from "./FormCheckbox";
import FormInput from "./FormInput";
import SelectInput from "./SelectInput";
import SelectInputForId from "./SelectInputForId";

import { Form, useLoaderData } from "react-router-dom";
import SubmitButton from "./SubmitButton";
import { gologanPPPK, ranks, genders } from "../data";
import { useState } from "react";
import SelectInputForIdByType from "./SelectInputForIdByType";
import SelectInputPangkatGolongan from "./SelectInputPangkatGolongan";
const CreateSingleUser = () => {
  const [isPNS, setIsPNS] = useState(false);
  const [isPPPK, setIsPPPK] = useState(false);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (name === "PNS") {
      setIsPNS(checked);
      if (checked) {
        setIsPPPK(false); // Menonaktifkan PPPK jika PNS dicentang
      }
    } else if (name === "PPPK") {
      setIsPPPK(checked);
      if (checked) {
        setIsPNS(false); // Menonaktifkan PNS jika PPPK dicentang
      }
    }
  };

  const { addresses } = useLoaderData();
  return (
    <Form method="POST" className="bg-base-200 rounded-md px-8 py-4 shadow-lg">
      <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 items-end ">
        <FormInput
          name="username"
          label="Username"
          size="input-sm"
          type="text"
        />
        <FormInput name="name" label="Name" size="input-sm" type="text" />
        <FormInput name="phone" label="No. HP" size="input-sm" type="text" />
        <SelectInput
          label="Alamat"
          name="address"
          list={addresses}
          defaultValue={addresses[0]}
          size="select-sm"
        />
        <FormInput name="email" label="Email" size="input-sm" type="email" />

        <SelectInput
          label="Jenis Kelamin"
          name="jenisKelamin"
          list={genders}
          defaultValue={genders[0]}
          size="select-sm"
        />

        <div className="flex justify-center items-center">
          <FormCheckbox label="Admin" name="ADMIN" size="checkbox-sm" />
          <FormCheckbox
            label="Karyawan"
            name="EMPLOYEE"
            size="checkbox-sm"
            defaultChecked={true}
          />
          <FormCheckbox
            label="Pejabat"
            name="OFFICEHOLDER"
            size="checkbox-sm"
          />
          <FormCheckbox
            label="P3K"
            name="PPPK"
            size="checkbox-sm"
            checked={isPPPK}
            onChange={handleCheckboxChange}
          />
          <FormCheckbox
            label="PNS"
            name="PNS"
            size="checkbox-sm"
            checked={isPNS}
            onChange={handleCheckboxChange}
          />
        </div>
        {isPNS || isPPPK ? (
          <>
            <FormInput name="nip" label="NIP" size="input-sm" type="text" />
          </>
        ) : null}
        <FormInput
          name="position"
          label="Jabatan"
          size="input-sm"
          type="text"
        />
        {isPPPK && (
          <SelectInput
            label="Golongan"
            name="golongan"
            list={gologanPPPK}
            defaultValue={gologanPPPK[0].name}
            size="select-sm"
          />
        )}

        {isPNS && (
          <SelectInputPangkatGolongan
            label="Pangkat"
            name="rank"
            list={ranks}
            defaultValue={ranks[0]}
            size="select-sm"
          />
        )}

        <FormInput
          name="workUnit"
          label="Unit Kerja"
          size="input-sm"
          type="text"
        />
      </div>
      <div className="flex justify-end mt-5">
        <SubmitButton text="Tambahkan" size="btn-sm" color="btn-primary" />
      </div>
    </Form>
  );
};

export default CreateSingleUser;

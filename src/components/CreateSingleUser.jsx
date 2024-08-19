import FormCheckbox from "./FormCheckbox";
import FormInput from "./FormInput";
import SelectInput from "./SelectInput";
import SelectInputForId from "./SelectInputForId";

import { Form, useLoaderData } from "react-router-dom";
import SubmitButton from "./SubmitButton";
import { gologanPNS, gologanPPPK, pangkat } from "../data";
import { useState } from "react";
const CreateSingleUser = () => {
  const [isPegawai, setIsPegawai] = useState(true);

  const handleCheckboxChange = (event) => {
    setIsPegawai(event.target.checked);
  };

  const gender = [
    { id: 1, name: "MALE" },
    { id: 2, name: "FEMALE" },
  ];
  const address = [
    { id: 1, name: "Kendari" },
    { id: 2, name: "Wakatobi" },
    { id: 3, name: "Raha" },
  ];

  const { addresses } = useLoaderData();
  return (
    <Form method="POST" className="bg-base-200 rounded-md px-8 py-4 shadow-lg">
      <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 items-end ">
        <FormInput name="id" label="NIP" size="input-sm" type="text" />
        <FormInput
          name="username"
          label="Username"
          size="input-sm"
          type="text"
        />
        <FormInput name="name" label="Name" size="input-sm" type="text" />
        <FormInput name="phone" label="No. HP" size="input-sm" type="text" />
        <SelectInputForId
          label="Alamat"
          name="address"
          list={addresses}
          defaultValue={addresses[0]}
          size="select-sm"
        />
        <FormInput name="email" label="Email" size="input-sm" type="email" />

        <SelectInput
          label="Jenis Kelamin"
          name="gender"
          list={gender}
          defaultValue={gender[0]}
          size="select-sm"
        />

        <FormCheckbox
          defaultChecked={true}
          label="PNS"
          name="isPegawai"
          size="checkbox-sm"
          onChange={handleCheckboxChange}
        />
        {isPegawai ? (
          <>
            <SelectInput
              label="Gologan"
              name="group"
              list={gologanPNS}
              defaultValue={gologanPNS[0].name}
              size="select-sm"
            />
            <SelectInput
              label="Pangkat"
              name="rank"
              list={pangkat}
              defaultValue={pangkat[0].name}
              size="select-sm"
            />
            <FormInput
              name="position"
              label="Jabatan"
              size="input-sm"
              type="text"
            />
          </>
        ) : (
          <SelectInput
            label="Gologan"
            name="group"
            list={gologanPPPK}
            defaultValue={gologanPPPK[0].name}
            size="select-sm"
          />
        )}

        {/* <FormInput name="rank" label="Pangkat" size="input-sm" type="text" />
        <FormInput name="group" label="Golongan" size="input-sm" type="text" /> */}
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

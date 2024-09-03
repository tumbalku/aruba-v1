import FormCheckbox from "./FormCheckbox";
import FormInput from "./FormInput";
import SelectInput from "./SelectInput";
import SelectInputForId from "./SelectInputForId";

import { Form, useLoaderData } from "react-router-dom";
import SubmitButton from "./SubmitButton";
import { gologanPPPK, ranks, genders } from "../data";
import { useEffect, useState } from "react";
const CreateSingleUser = () => {
  const [isPegawai, setIsPegawai] = useState(true);
  const [isPPPK, setIsPPPK] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsPegawai(event.target.checked);
  };
  const handleCheckboxChangePPPK = (event) => {
    setIsPPPK(event.target.checked);
  };

  useEffect(() => {
    // Jika `isPegawai` adalah false, maka `isPPPK` otomatis menjadi false
    if (!isPegawai) {
      setIsPPPK(false);
    }
  }, [isPegawai]);
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
          <FormCheckbox
            defaultChecked={true}
            label="ASN"
            name="isPegawai"
            size="checkbox-sm"
            onChange={handleCheckboxChange}
          />
          {isPegawai && (
            <FormCheckbox
              defaultChecked={false}
              label="PPPK"
              name="isPPPK"
              size="checkbox-sm"
              onChange={handleCheckboxChangePPPK}
            />
          )}
        </div>
        {isPegawai && (
          <>
            <FormInput name="nip" label="NIP" size="input-sm" type="text" />
            <FormInput
              name="position"
              label="Jabatan"
              size="input-sm"
              type="text"
            />
            {isPPPK ? (
              <SelectInput
                label="Golongan"
                name="golongan"
                list={gologanPPPK}
                defaultValue={gologanPPPK[0].name}
                size="select-sm"
              />
            ) : (
              <SelectInput
                label="Pangkat"
                name="rank"
                list={ranks}
                defaultValue={ranks[0].name}
                size="select-sm"
              />
            )}
          </>
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

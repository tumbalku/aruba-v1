import FormCheckbox from "./FormCheckbox";
import FormInput from "./FormInput";
import SelectInput from "./SelectInput";
import SelectInputForId from "./SelectInputForId";

import { Form, useLoaderData } from "react-router-dom";
import SubmitButton from "./SubmitButton";
import { genders } from "../data";

const UpdateSingleUser = () => {
  const { addresses, userDetail } = useLoaderData();
  const {
    id,
    nip,
    name,
    email,
    phone,
    gender,
    username,
    address,
    status,
    pangkat,
    golongan,
    position,
    workUnit,
    roles,
    createdAt,
    updatedAt,
  } = userDetail;
  const selectedGender = genders.find((item) => item.desc === gender);

  console.log(userDetail);
  return (
    <Form method="POST" className="bg-base-200 rounded-md px-8 py-4 shadow-lg">
      <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 items-end ">
        <FormInput
          name="nip"
          label="NIP"
          size="input-sm"
          type="text"
          defaultValue={nip}
        />
        <FormInput
          name="username"
          label="Username"
          size="input-sm"
          type="text"
          defaultValue={username}
        />
        <FormInput
          name="name"
          label="Name"
          size="input-sm"
          type="text"
          defaultValue={name}
        />
        <FormInput
          name="phone"
          label="No. HP"
          size="input-sm"
          type="text"
          defaultValue={phone}
        />

        <FormInput
          name="pangkat"
          label="Pangkat"
          size="input-sm"
          type="text"
          defaultValue={pangkat}
        />
        <FormInput
          name="golongan"
          label="Golongan"
          size="input-sm"
          type="text"
          disabled
          defaultValue={golongan}
        />
        <FormInput
          name="workUnit"
          label="Unit Kerja"
          size="input-sm"
          type="text"
          defaultValue={workUnit}
        />
        <FormInput
          name="position"
          label="Jabatan"
          size="input-sm"
          type="text"
          defaultValue={position}
        />

        <SelectInput
          label="Alamat"
          name="address"
          list={addresses}
          defaultValue={address}
          size="select-sm"
        />
        <FormInput
          name="email"
          label="Email"
          size="input-sm"
          type="email"
          defaultValue={email}
        />

        <SelectInput
          label="Jenis Kelamin"
          name="jenisKelamin"
          list={genders}
          defaultValue={selectedGender.name}
          size="select-sm"
        />
      </div>
      <div className="flex justify-end mt-5">
        <SubmitButton text="Update" size="btn-sm" color="btn-primary" />
      </div>
    </Form>
  );
};

export default UpdateSingleUser;

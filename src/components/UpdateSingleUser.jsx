import FormCheckbox from "./FormCheckbox";
import FormInput from "./FormInput";
import SelectInput from "./SelectInput";
import SelectInputForId from "./SelectInputForId";

import { Form, useLoaderData } from "react-router-dom";
import SubmitButton from "./SubmitButton";

const UpdateSingleUser = () => {
  const genderList = [
    { id: 1, name: "MALE" },
    { id: 2, name: "FEMALE" },
  ];

  const { addresses, userDetail } = useLoaderData();
  const {
    id,
    name,
    email,
    phone,
    gender,
    address,
    status,
    civilServant,
    roles,
    createdAt,
    updatedAt,
  } = userDetail;
  const {
    group = "",
    rank = "",
    position = "",
    workUnit = "",
  } = civilServant || {};

  return (
    <Form method="POST" className="bg-base-200 rounded-md px-8 py-4 shadow-lg">
      <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 items-end ">
        <FormInput
          name="id"
          label="NIP"
          size="input-sm"
          type="text"
          defaultValue={id}
          disabled={true}
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
          name="rank"
          label="Pangkat"
          size="input-sm"
          type="text"
          defaultValue={rank}
        />
        <FormInput
          name="group"
          label="Golongan"
          size="input-sm"
          type="text"
          defaultValue={group}
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

        <SelectInputForId
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
          name="gender"
          list={genderList}
          defaultValue={gender}
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

import FormCheckbox from "./FormCheckbox";
import FormInput from "./FormInput";
import SelectInput from "./SelectInput";
import SelectInputForId from "./SelectInputForId";

import { Form, useLoaderData, useNavigate } from "react-router-dom";
import SubmitButton from "./SubmitButton";
import { genders, gologanPPPK, ranks } from "../data";
import { errorHandleForFunction } from "../utils/exception";
import { customFetch } from "../utils";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useState } from "react";
import SelectInputPangkatGolongan from "./SelectInputPangkatGolongan";

const UpdateSingleUser = () => {
  const { addresses, userDetail } = useLoaderData();
  const { user } = useSelector((state) => state.userState);
  const navigate = useNavigate();
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
  const selectedRanks = ranks.find((item) => item.name === pangkat);

  const [isPNS, setIsPNS] = useState(roles.includes("PNS"));
  const [isPPPK, setIsPPPK] = useState(roles.includes("PPPK"));

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
  async function handleResetPwd() {
    Swal.fire({
      title: "Apakah Anda yakin mereset password?",
      text: "Password yang di reset akan sama dengan username pengguna",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reset!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Menghapus data menggunakan customFetch
          const response = await customFetch.patch(
            `/auth/reset/pwd/${id}`,
            null,
            {
              headers: {
                "X-API-TOKEN": user.token,
              },
            }
          );

          Swal.fire({
            title: "Berhasil melakukan reset password",
            text: response.data?.message || "ok",
            icon: "success",
          });
          navigate("/users");
        } catch (error) {
          return errorHandleForFunction(error, navigate);
        }
      }
    });
  }
  return (
    <Form method="POST" className="bg-base-200 rounded-md px-8 py-4 shadow-lg">
      <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 items-end ">
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
          defaultValue={phone}
          type="text"
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

        <div className="flex justify-center items-center">
          <FormCheckbox
            label="Admin"
            name="ADMIN"
            size="checkbox-sm"
            defaultChecked={roles.includes("ADMIN")}
          />
          <FormCheckbox
            label="Pegawai"
            name="EMPLOYEE"
            size="checkbox-sm"
            defaultChecked={roles.includes("EMPLOYEE")}
          />
          <FormCheckbox
            label="Pejabat"
            name="OFFICEHOLDER"
            size="checkbox-sm"
            defaultChecked={roles.includes("OFFICEHOLDER")}
          />
          <FormCheckbox
            label="PPPK"
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
            <FormInput
              name="nip"
              label="NIP"
              size="input-sm"
              type="text"
              defaultValue={nip}
            />
          </>
        ) : null}
        <FormInput
          name="position"
          label="Jabatan"
          size="input-sm"
          type="text"
          defaultValue={position}
        />

        {isPPPK && (
          <SelectInput
            label="Golongan"
            name="golongan"
            list={gologanPPPK}
            defaultValue={golongan}
            size="select-sm"
          />
        )}

        {isPNS && (
          <SelectInputPangkatGolongan
            label="Pangkat"
            name="rank"
            list={ranks}
            defaultValue={selectedRanks.name}
            size="select-sm"
          />
          // <SelectInput
          //   label="Pangkat"
          //   name="rank"
          //   list={ranks}
          //   defaultValue={pangkat}
          //   size="select-sm"
          // />
        )}
        <FormInput
          name="workUnit"
          label="Unit Kerja"
          size="input-sm"
          type="text"
          defaultValue={workUnit}
        />
      </div>
      <div className="flex gap-4 justify-end mt-5">
        <button
          onClick={handleResetPwd}
          type="button"
          className="btn btn-secondary btn-sm"
        >
          Reset Password
        </button>
        <SubmitButton text="Update" size="btn-sm" color="btn-primary" />
      </div>
    </Form>
  );
};

export default UpdateSingleUser;

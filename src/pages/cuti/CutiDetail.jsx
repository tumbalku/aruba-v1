import React, { useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import {
  convertDateArrayToString,
  customFetch,
  translateGender,
} from "../../utils";
import { useLoaderData } from "react-router-dom";
import {
  FormInput,
  FormTextArea,
  PrevLinks,
  StatusBadge,
} from "../../components";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const loader = async ({ params }) => {
  try {
    const response = await customFetch(`cuti/${params.id}`);
    console.log(response.data.data);
    return { cutiDetail: response.data.data };
  } catch (error) {
    console.log(error);
    return null;
  }
};
const CutiDetail = () => {
  const { cutiDetail } = useLoaderData();
  console.log(cutiDetail);
  const { user } = useSelector((state) => state.userState);

  const { dateStart, dateEnd, id, kop, number, user: owner } = cutiDetail;

  const [isDisabled, setIsDisabled] = useState(false);

  console.log(user);
  const handleDownload = async () => {
    setIsDisabled(true);
    try {
      const response = await customFetch(`/cuti/download/${id}`, {
        responseType: "blob",
        headers: {
          "X-API-TOKEN": user.token,
        },
      });

      const blob = new Blob([response.data], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "cuti.pdf";

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
    } catch (error) {
      toast.error("There something error for download this file!");
      setTimeout(() => {
        toast.error("Try again later");
      }, 2500);
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsDisabled(false);
      }, 1 * 60 * 1000); // 5 menit
    }
  };

  return (
    <>
      <div className="flex md:justify-end">
        <button
          className="btn btn-outline btn-secondary btn-sm"
          onClick={handleDownload}
          disabled={isDisabled}
        >
          <span>Export </span>
          <FaFilePdf className="text-error" />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <div className="md:col-span-2"></div>

        <>
          {/* Cuti */}
          <div className="md:order-2 order-1">
            <h1 className="font-semibold text-sm pb-5 text-center">
              Detail Cuti
            </h1>
            <FormInput
              label="ID"
              disabled={true}
              defaultValue={id}
              name="ID"
              size="input-sm"
              type="text"
            />
            <FormInput
              label="Jenis Cuti"
              disabled={true}
              defaultValue={kop.name}
              name="type"
              size="input-sm"
              type="text"
            />
            <div className="grid grid-cols-2 gap-2">
              <FormInput
                label="Dari tanggal"
                disabled={true}
                defaultValue={convertDateArrayToString(dateStart)}
                name="type"
                size="input-sm"
                type="text"
              />
              <FormInput
                label="Sampai tanggal"
                disabled={true}
                defaultValue={convertDateArrayToString(dateEnd)}
                name="type"
                size="input-sm"
                type="text"
              />
            </div>
          </div>

          {/* Pegawai */}
          <div className="md:order-1 order-2">
            <h1 className="font-semibold text-sm pb-5 text-center">
              Detail Pegawai
            </h1>

            <FormInput
              label="NIP"
              disabled={true}
              defaultValue={owner.nip}
              name="userId"
              size="input-sm"
              type="text"
            />
            <FormInput
              label="Nama Pegawai"
              disabled={true}
              defaultValue={owner.name}
              name="name"
              size="input-sm"
              type="text"
            />

            <FormInput
              label="No. HP"
              disabled={true}
              defaultValue={owner.phone}
              name="phone"
              size="input-sm"
              type="text"
            />
            <FormInput
              label="Email"
              disabled={true}
              defaultValue={owner.email}
              name="type"
              size="input-sm"
              type="text"
            />

            <FormInput
              label="Alamat"
              disabled={true}
              defaultValue={owner.address}
              name="address"
              size="input-sm"
              type="text"
            />
          </div>
        </>
      </div>
    </>
  );
};

export default CutiDetail;

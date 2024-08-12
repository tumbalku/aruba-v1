import React, { useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import {
  convertDateArrayToString,
  customFetch,
  translateGender,
} from "../../utils";
import { useLoaderData, useParams } from "react-router-dom";
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
  const {
    user,
    id: cutiId,
    confirmDate,
    type,
    status,
    message,
    reason,
    dateStart,
    dateEnd,
  } = cutiDetail;
  const { name, id: userId, email, gender, phone, address } = user;
  const bos = "UCUP";
  const pegawai = useSelector((state) => state.userState.user);
  const { id } = useParams();
  const [isDisabled, setIsDisabled] = useState(false);

  console.log(pegawai);
  const handleDownload = async () => {
    setIsDisabled(true);
    try {
      const response = await customFetch(`/cuti/download/${id}`, {
        responseType: "blob",
        headers: {
          "X-API-TOKEN": pegawai.token,
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
    <section className="bg-base-300 p-8 rounded-lg ">
      {pegawai && status === "APPROVED" && (
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
      )}

      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <div className="md:col-span-2">
          <div className="flex flex-col items-center justify-center space-y-5 mb-5">
            <div>
              <StatusBadge status={status} />
            </div>
            {status === "REJECTED" && (
              <div>
                <p className="text-xs">
                  {convertDateArrayToString(confirmDate)} - dari {bos}
                </p>
              </div>
            )}
          </div>
          {pegawai && (
            <FormTextArea
              defaultValue={message}
              disabled={true}
              label="Pesan"
              name="message"
              size="textarea-sm h-32"
            />
          )}
        </div>
        {status === "APPROVED" && (
          <>
            {/* Cuti */}
            <div className="md:order-2 order-1">
              <h1 className="font-semibold text-sm pb-5 text-center">
                Detail Cuti
              </h1>
              <FormInput
                label="ID"
                disabled={true}
                defaultValue={cutiId}
                name="ID"
                size="input-sm"
                type="text"
              />
              <FormInput
                label="Jenis Cuti"
                disabled={true}
                defaultValue={type}
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
              <FormInput
                label="Dikonfirmasi Tanggal"
                disabled={true}
                defaultValue={convertDateArrayToString(confirmDate)}
                name="type"
                size="input-sm"
                type="text"
              />
              {pegawai && (
                <FormTextArea
                  defaultValue={reason}
                  disabled={true}
                  label="Alasan mengajukan"
                  name="reason"
                  size="textarea-sm h-32"
                />
              )}
            </div>

            {/* Pegawai */}
            <div className="md:order-1 order-2">
              <h1 className="font-semibold text-sm pb-5 text-center">
                Detail Pegawai
              </h1>

              <FormInput
                label="NIP"
                disabled={true}
                defaultValue={userId}
                name="userId"
                size="input-sm"
                type="text"
              />
              <FormInput
                label="Nama Pegawai"
                disabled={true}
                defaultValue={name}
                name="name"
                size="input-sm"
                type="text"
              />
              <FormInput
                label="Jenis Kelamin"
                disabled={true}
                defaultValue={translateGender(gender)}
                name="gender"
                size="input-sm"
                type="text"
              />
              {pegawai && (
                <>
                  <FormInput
                    label="No. HP"
                    disabled={true}
                    defaultValue={phone}
                    name="phone"
                    size="input-sm"
                    type="text"
                  />
                  <FormInput
                    label="Email"
                    disabled={true}
                    defaultValue={email}
                    name="type"
                    size="input-sm"
                    type="text"
                  />
                </>
              )}

              <FormInput
                label="Alamat"
                disabled={true}
                defaultValue={address}
                name="address"
                size="input-sm"
                type="text"
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CutiDetail;

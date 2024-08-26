import React from "react";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import {
  convertDateArrayToString,
  customFetch,
  formatFileSize,
} from "../../utils";
import { toast } from "react-toastify";
import { docTypes, fileTypeIcons } from "../../data";
import {
  FormInput,
  SectionInfo,
  SelectInput,
  SubmitButton,
  UnmodifiedField,
} from "../../components";
import noFile from "/icons/no.svg";

import { GoDownload } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { FaWhatsapp } from "react-icons/fa6";

export const loader = async ({ params }) => {
  try {
    const response = await customFetch.get(`letter/${params.id}`);
    console.log(response);
    return { documentDetail: response.data.data };
  } catch (error) {
    console.log(error);
    toast.warn("Terjadi error!");
    return null;
  }
};
export const action =
  (store) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const user = store.getState().userState.user;

    try {
      const response = await customFetch.patch(`/letter/${params.id}`, data, {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });

      toast.success(response.data.message || "Berhasil melalukan update");
      return null;
    } catch (error) {
      console.log(error);
      // if (error) {
      //   toast.warn("Terjadi error!");
      //   return redirect("/login");
      // }
      return null;
    }
  };

const DocumentDetail = () => {
  const { documentDetail } = useLoaderData();
  const { user } = useSelector((state) => state.userState);

  console.log(documentDetail);
  const navigate = useNavigate();

  const handleDownload = async (id, name) => {
    try {
      const response = await customFetch.get(`letter/download/${id}`, {
        responseType: "blob",
      });
      console.log(response);
      console.log(response.headers);
      const contentType = response.headers["content-type"];
      const fileExtension = fileTypeIcons[contentType].ext;
      console.log(fileExtension);
      const filename = name
        ? name + fileExtension
        : `downloaded_file${fileExtension}`;

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  async function handleDelete(id) {
    try {
      const response = await customFetch.delete(`/letter/${id}`, {
        headers: {
          "X-API-TOKEN": `${user.token}`,
        },
      });
      const msg = response.data.message;
      toast.success(msg || "Success delete");
      navigate("/documents");
    } catch (error) {
      const msg = error.response.data.message;
      toast.error(msg || "Something error with the operation");
      console.log(error);
    }
  }

  const {
    id,
    type,
    num,
    size,
    fileType,
    name,
    uploadedAt,
    updatedAt,
    expiredAt,
    user: owner,
  } = documentDetail;
  const { name: ownerName, nip, phone, workUnit } = owner;

  const handelWa = () => {
    const message = `
    *Kepada Yth:*

    ${ownerName}
    ${nip}
  
    Kami ingin mengingatkan bahwa masa berlaku SIP (Surat Izin Praktek ) Anda akan segera berakhir pada *${convertDateArrayToString(
      expiredAt
    )}* . Agar Anda dapat menjalankan praktek sesuai ketentuan, mohon segera lakukan perpanjangan sebelum tanggal tersebut. Terima Kasih
      
    *Detail SIP:*
    •	Nomor SIP: ${num}
    •	Tanggal Kadaluarsa: *${convertDateArrayToString(expiredAt)}*
    `.trim();

    const urlToWa = `https://wa.me/${phone}?text=${encodeURIComponent(
      message
    )}`;

    window.open(urlToWa, "_blank");
  };

  return (
    <div className="grid md:grid-cols-3 md:grid-rows-3 gap-4">
      <div className="flex items-center justify-center p-2 border rounded-md bg-base-200">
        {!fileType ? (
          <img
            src={fileTypeIcons[fileType].url}
            alt={name}
            className="w-24 h-24"
          />
        ) : (
          <img src={noFile} alt={name} className="w-24 h-24" />
        )}
        <div className=" ml-1 ">
          <p className="font-semibold truncate text-xs sm:text-base w-36">
            {name}
          </p>
          <div className="mt-4 flex space-x-1">
            {!fileType ? (
              <button
                className="btn btn-xs md:btn-sm btn-success"
                onClick={() => handleDownload(id, name)}
              >
                <GoDownload />
                Download
              </button>
            ) : null}

            <button
              className="btn btn-xs md:btn-sm btn-error "
              onClick={() => handleDelete(id)}
            >
              <AiOutlineDelete />
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="md:col-span-2 md:row-span-3 p-4 border rounded-md bg-base-200 ">
        <div className="flex flex-col sm:flex-row justify-between lg:items-end">
          <SectionInfo
            title="Detail dokumen"
            info="Manajemen informasi akun anda"
          />

          <button
            className="btn btn-xs md:btn-sm btn-success"
            onClick={handelWa}
          >
            <FaWhatsapp />
            Kirim
          </button>
        </div>
        <Form method="post">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2 mt-8">
            <UnmodifiedField value={ownerName} label="Pemilik" />
            <UnmodifiedField value={nip} label="NIP" />
            <UnmodifiedField value={phone} label="No. Hp" />

            <UnmodifiedField value={workUnit} label="Unit Kerja" />

            <div className="md:col-span-2">
              <FormInput
                size="md:input-sm input-xs "
                labelSize="text-xs"
                type="text"
                label="File name"
                name="name"
                defaultValue={name}
              />

              <SelectInput
                label="Jenis Dokumen"
                size="md:select-sm select-xs"
                labelSize="text-xs"
                list={docTypes}
                name="type"
                defaultValue={type}
              />
            </div>
            {!fileType ? (
              <UnmodifiedField value={size} label="Ukuran file" />
            ) : null}
            <UnmodifiedField
              value={convertDateArrayToString(uploadedAt)}
              label="Dibuat pada"
            />
            <UnmodifiedField
              value={convertDateArrayToString(updatedAt)}
              label="Diperbaruhi pada"
            />
            <UnmodifiedField
              value={convertDateArrayToString(expiredAt)}
              label="Berakhir pada"
            />
          </div>
          <div className="text-right mt-5">
            <SubmitButton color="btn-primary" size="btn-sm" text="Update" />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default DocumentDetail;

import React from "react";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import {
  convertDateArrayToString,
  customFetch,
  formatFileSize,
} from "../../utils";
import { toast } from "react-toastify";
import { docTypes, fileTypeIcons } from "../../data";
import { FormInput, SelectInput, SubmitButton } from "../../components";

import { GoDownload } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";

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

  
      Kami ingin mengingatkan bahwa masa berlaku SIP (Surat Izin Praktek ) Anda akan segera berakhir pada ${convertDateArrayToString(
        expiredAt
      )} . Agar Anda dapat menjalankan praktek sesuai ketentuan, mohon segera lakukan perpanjangan sebelum tanggal tersebut. Terima Kasih
      
      Detail SIP:
      •	Nomor SIP: 29 14 62 21 9 3175286
      •	Tanggal Kadaluarsa: ${convertDateArrayToString(expiredAt)}
    `.trim();

    const urlToWa = `https://wa.me/${phone}?text=${encodeURIComponent(
      message
    )}`;

    window.open(urlToWa, "_blank");
  };

  return (
    <div className="grid md:grid-cols-3 md:grid-rows-3 gap-4">
      <div className="flex items-center justify-center p-2 border rounded-md bg-base-200">
        <img
          src={fileTypeIcons[fileType].url}
          alt={name}
          className="w-24 h-24"
        />
        <div className=" ml-1 ">
          <p className="font-semibold truncate text-xs sm:text-base w-36">
            {name}
          </p>
          <div className="mt-8 flex space-x-1">
            <button
              className="btn btn-xs md:btn-sm btn-success"
              onClick={() => handleDownload(id, name)}
            >
              <GoDownload />
              Download
            </button>
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
      <div className="md:col-span-2 md:row-span-3 p-2 border rounded-md bg-base-200">
        <h2 className="md:text-2xl font-semibold mb-4">Document Detail</h2>
        <Form method="post">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            <FormInput
              size="md:input-sm input-xs "
              labelSize="text-xs"
              type="text"
              label="Owner"
              name="owner"
              disabled
              defaultValue={ownerName}
            />
            {nip ? (
              <FormInput
                size="md:input-sm input-xs "
                labelSize="text-xs"
                type="text"
                label="NIP"
                name="nip"
                disabled
                defaultValue={nip}
              />
            ) : null}
            {phone ? (
              <FormInput
                size="md:input-sm input-xs "
                labelSize="text-xs"
                type="text"
                label="No. Hp"
                name="phone"
                disabled
                defaultValue={phone}
              />
            ) : null}
            {workUnit ? (
              <FormInput
                size="md:input-sm input-xs "
                labelSize="text-xs"
                type="text"
                label="Unit Kerja"
                name="workUnit"
                disabled
                defaultValue={workUnit}
              />
            ) : null}

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
            <FormInput
              size="md:input-sm input-xs  "
              labelSize="text-xs"
              type="text"
              label="Size"
              name="size"
              disabled={true}
              defaultValue={formatFileSize(size)}
            />
            <FormInput
              size="md:input-sm input-xs "
              labelSize="text-xs"
              type="text"
              label="uploaded at"
              name="uploadedAt"
              disabled={true}
              defaultValue={convertDateArrayToString(uploadedAt)}
            />
            <FormInput
              size="md:input-sm input-xs "
              labelSize="text-xs"
              type="text"
              label="Updated at"
              name="updatedAt"
              disabled={true}
              defaultValue={convertDateArrayToString(updatedAt)}
            />
            <FormInput
              size="md:input-sm input-xs "
              labelSize="text-xs"
              type="text"
              label="Expired at"
              name="expiredAt"
              disabled={true}
              defaultValue={convertDateArrayToString(expiredAt)}
            />
          </div>
          <div className="text-right mt-5">
            <SubmitButton color="btn-primary" size="btn-sm" text="Update" />
          </div>
          <div>
            <button className="btn btn-primary" onClick={handelWa}>
              Send We
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default DocumentDetail;

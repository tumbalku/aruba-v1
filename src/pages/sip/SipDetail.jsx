import React, { useEffect } from "react";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import {
  convertDateArrayToString,
  customFetch,
  formatFileSize,
} from "../../utils";
import { toast } from "react-toastify";
import { fileTypeIcons } from "../../data";
import {
  FormInput,
  SectionInfo,
  SubmitButton,
  UnmodifiedField,
  UserInfoDetail,
} from "../../components";
import noFile from "/icons/no.svg";
import { sipMessage } from "../../utils/message";
import { GoDownload } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { FaWhatsapp } from "react-icons/fa6";
import {
  errorHandleForAction,
  errorHandleForFunction,
} from "../../utils/exception";
import Swal from "sweetalert2";
import SipReport from "./components/SipReport";

export const action =
  (store) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const user = store.getState().userState.user;

    try {
      const response = await customFetch.patch(`/sip/${params.id}`, data, {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });

      toast.success(response.data.message || "Berhasil melalukan update");
      return null;
    } catch (error) {
      return errorHandleForAction(error, "toastify");
    }
  };

export const loader = async ({ params }) => {
  try {
    const response = await customFetch.get(`sip/${params.id}`);
    return { documentDetail: response.data.data };
  } catch (error) {
    return errorHandleForAction(error, "toastify");
  }
};
const SipDetail = () => {
  const { documentDetail } = useLoaderData();
  const { user } = useSelector((state) => state.userState);

  console.log(documentDetail);
  const navigate = useNavigate();

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
    reports,
    user: owner,
  } = documentDetail;
  const { name: ownerName, nip, phone, workUnit } = owner;

  const message = sipMessage(ownerName, nip, num, expiredAt);
  async function handleWa(id) {
    const urlToWa = `https://wa.me/${phone}?text=${encodeURIComponent(
      message
    )}`;

    try {
      const response = await customFetch.post("/sip/report/" + id, null, {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });
      navigate("/sip");

      toast.success(response.data.data.messge);

      window.open(urlToWa, "_blank");
    } catch (error) {
      errorHandleForFunction(error, navigate, "toastify");
    }
  }

  const handleDownload = async (id, name) => {
    try {
      const response = await customFetch.get(`sip/download/${id}`, {
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
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak akan bisa mengembalikan SIP ini apabila sudah terlanjur dihapus.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, hapus",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await customFetch.delete(`/sip/${id}`, {
            headers: {
              "X-API-TOKEN": `${user.token}`,
            },
          });
          Swal.fire({
            title: "Berhasil menghapus SIP",
            text: response.data?.message,
            icon: "success",
          });
          navigate("/sip");
        } catch (error) {
          errorHandleForFunction(error, navigate);
        }
      }
    });
  }

  return (
    <div className="grid md:grid-cols-3 md:grid-rows-3 gap-4">
      <div className="flex items-center justify-center p-2 border rounded-md bg-base-200 h-fit">
        {fileType ? (
          <img
            src={fileTypeIcons[fileType].url}
            alt={name}
            className="w-24 h-24"
          />
        ) : (
          <img src={noFile} alt={name} className="w-24 h-24" />
        )}
        <div>
          <p className="font-semibold truncate text-xs sm:text-base w-36">
            {name}
          </p>
          {size && (
            <p className="font-semibold badge badge-primary badge-xs md:badge-sm">
              {formatFileSize(size)}
            </p>
          )}
          <div className="mt-4 flex space-x-1">
            {fileType && (
              <button
                className="btn btn-xs md:btn-sm btn-success"
                onClick={() => handleDownload(id, name)}
              >
                <GoDownload />
                Download
              </button>
            )}

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
        <div className="flex flex-col sm:flex-row justify-between">
          <SectionInfo
            title="Surat Izin Peraktek"
            info="Detail informasi surat"
          />

          <button
            type="button"
            className="btn btn-xs md:btn-sm btn-success"
            onClick={() => handleWa(id)}
          >
            <FaWhatsapp />
            Kirim
          </button>
        </div>
        <div className="grid place-items-center">
          <UserInfoDetail {...owner} />
        </div>

        <Form method="post">
          <div className="grid md:grid-cols-2 gap-2 mt-8">
            <FormInput
              size="md:input-sm input-xs"
              labelSize="text-xs"
              type="text"
              label="File name"
              name="name"
              defaultValue={name}
            />
            <FormInput
              size="md:input-sm input-xs"
              labelSize="text-xs"
              type="text"
              label="nomor SIP"
              name="num"
              defaultValue={num}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 col-span-2">
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
          </div>
          <div className="text-right mt-5">
            <SubmitButton color="btn-primary" size="btn-sm" text="Update" />
          </div>
        </Form>
        <SipReport reports={reports} />
      </div>
    </div>
  );
};

export default SipDetail;

import React, { useState } from "react";
import { UnmodifiedField, UnmodifiedTextArea } from "../../components";
import { convertDateArrayToString, customFetch } from "../../utils";
import CutiStatusBadge from "./components/CutiStatusBadge";
import { useLoaderData } from "react-router-dom";
import { errorHandleForAction } from "../../utils/exception";
import { toast } from "react-toastify";
import { FaFilePdf } from "react-icons/fa6";
import { useSelector } from "react-redux";

// loader
export const loader =
  (store) =>
  async ({ params }) => {
    const user = store.getState().userState.user;

    try {
      const response = await customFetch("/cuti/" + params.id, {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });

      return {
        cuti: response.data.data,
      };
    } catch (error) {
      return errorHandleForAction(error, "toastify");
    }
  };

const MyCutiDetail = () => {
  const { cuti } = useLoaderData();
  const [isDisabled, setIsDisabled] = useState(false);
  const { user } = useSelector((state) => state.userState);

  const handleDownload = async () => {
    setIsDisabled(true);
    try {
      const response = await customFetch.get(`/cuti/download/${cuti.id}`, {
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
    <div className="w-full bg-base-300 p-4">
      {cuti.status === "Disetujui" && (
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

      <div className="text-center my-4">
        <h1 className="text-xl font-semibold">{cuti.kop.name}</h1>
        <div>
          <CutiStatusBadge status={cuti.status} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UnmodifiedField
          value={convertDateArrayToString(cuti.dateStart)}
          label="Dari tanggal"
        />
        <UnmodifiedField
          value={convertDateArrayToString(cuti.dateEnd)}
          label="Sampai tanggal"
        />
      </div>
      <UnmodifiedField value={cuti.number} label="Nomor Cuti" />
      <UnmodifiedTextArea value={cuti.message} label="Pesan" />
      <UnmodifiedTextArea value={cuti.reason} label="Alasan" />
    </div>
  );
};

export default MyCutiDetail;

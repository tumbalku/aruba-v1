import { useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import { convertDateArrayToString, customFetch } from "../../utils";
import { useLoaderData } from "react-router-dom";
import { FormInput, UserInfoDetail } from "../../components";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FetchPdfPreview from "../documents/FetchPdfPreview";

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
  const {
    dateStart,
    dateEnd,
    id,
    kop,
    document: file,
    user: owner,
  } = cutiDetail;
  const [isDisabled, setIsDisabled] = useState(false);

  const handleDownload = async () => {
    setIsDisabled(true);
    try {
      const response = await customFetch.get(`/cuti/download/${id}`, {
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
          type="button"
          onClick={handleDownload}
          disabled={isDisabled}
        >
          <span>Export </span>
          <FaFilePdf className="text-error" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4">
        <div className="grid place-items-center ">
          <UserInfoDetail {...owner} />
        </div>
        <div>
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
      </div>
      {file && (
        <div className="py-5">
          <FetchPdfPreview fileId={file} />
        </div>
      )}
    </>
  );
};

export default CutiDetail;

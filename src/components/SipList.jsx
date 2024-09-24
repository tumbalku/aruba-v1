import { Link, useLoaderData } from "react-router-dom";
import {
  convertDateArrayToString,
  customFetch,
  formatFileSize,
} from "../utils";
import { FaRegEye } from "react-icons/fa";
import { fileTypeIcons } from "../data";
import { GoDownload } from "react-icons/go";
import { useSelector } from "react-redux";
import noFile from "/icons/no.svg";

const SipList = () => {
  const { roles } = useSelector((state) => state.userState);

  let isADMIN = false;

  if (roles && Array.isArray(roles)) {
    isADMIN = roles.includes("ADMIN");
  }
  const { documents } = useLoaderData();
  const handleDownload = async (id, name) => {
    try {
      const response = await customFetch.get(`letter/download/${id}`, {
        responseType: "blob",
      });

      const contentType = response.headers["content-type"];
      const fileExtension = fileTypeIcons[contentType].ext;

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

  return (
    <div>
      {documents.map(({ id, size, fileType, name, uploadedAt, expiredAt }) => (
        <div
          key={id}
          className="mt-8 flex justify-items-center items-center justify-between mb-6 bg-base-200 rounded-md py-4 pl-4 hover:shadow-xl transition duration-500"
        >
          <div className="flex justify-items-center items-center  overflow-hidden">
            {fileType ? (
              <img
                src={fileTypeIcons[fileType].url}
                alt={name}
                className="w-24 h-24"
              />
            ) : (
              <img src={noFile} alt={name} className="w-24 h-24" />
            )}

            <div className="ml-2 md:ml-5 md:w-72 w-full overflow-hidden">
              <p className="font-semibold truncate text-xs sm:text-base">
                {name}
              </p>

              {size && (
                <p className="mb-5 font-semibold badge badge-primary badge-xs md:badge-sm">
                  {formatFileSize(size)}
                </p>
              )}

              <div className="hidden md:flex gap-2 flex-col mt-2">
                {expiredAt && (
                  <p className="text-xs opacity-70">
                    Expried At: {convertDateArrayToString(expiredAt)}
                  </p>
                )}

                <p className="text-xs opacity-70">
                  Created At: {convertDateArrayToString(uploadedAt)}
                </p>
              </div>
            </div>
          </div>
          {fileType && (
            <div className="hidden sm:flex justify-items-center items-center">
              <p className="text-xs font-semibold badge badge-ghost opacity-70">
                Type: {fileTypeIcons[fileType].docType}
              </p>
              <p className="text-xs font-semibold badge badge-ghost opacity-70">
                Raw Size: {size} bytes
              </p>
            </div>
          )}

          <div className="mr-2 sm:mr-5 -mt-16">
            {!isADMIN ? (
              <button
                className="btn btn-xs btn-success"
                onClick={() => handleDownload(id, name)}
              >
                <GoDownload />
                <span className="hidden md:flex">Download</span>
              </button>
            ) : (
              <Link to={`/sip/${id}`} className="btn btn-xs btn-ghost">
                <FaRegEye className="opacity-70 hover:opacity-100 transition duration-200 w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SipList;

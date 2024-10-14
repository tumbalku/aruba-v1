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

const DocumentList = () => {
  const { roles } = useSelector((state) => state.userState);

  let isADMIN = false;

  if (roles && Array.isArray(roles)) {
    isADMIN = roles.includes("ADMIN");
  }
  const { documents } = useLoaderData();
  console.log(documents);
  const handleDownload = async (path, name) => {
    try {
      const response = await customFetch.get(`/file/download/${path}`, {
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
      {documents.map(
        ({ id, size, type, name, uploadedAt, description, path }) => (
          <div
            key={id}
            className="mt-8 flex justify-items-center items-center justify-between gap-5 mb-6 bg-base-200 rounded-md py-4 pl-4 hover:shadow-xl transition duration-500"
          >
            <div className="flex justify-items-center items-center">
              {type ? (
                <img
                  src={fileTypeIcons[type].url}
                  alt={name}
                  className="w-24 h-24"
                />
              ) : (
                <img src={noFile} alt={name} className="w-24 h-24" />
              )}

              <div className="ml-2 md:ml-5 w-full flex flex-col gap-1">
                <p className="font-semibold line-clamp-2 md:line-clamp-1 text-xs sm:text-base">
                  {name}
                </p>

                {size ? (
                  <p className="font-semibold badge badge-primary badge-xs md:badge-sm">
                    {formatFileSize(size)}
                  </p>
                ) : null}

                {description && (
                  <p className="text-xs opacity-70 line-clamp-5 md:line-clamp-none">
                    {description}
                  </p>
                )}

                <p className="text-[9px] md:text-xs opacity-70">
                  Di buat: {convertDateArrayToString(uploadedAt)}
                </p>
              </div>
            </div>

            <div className="mr-2 sm:mr-5 -mt-16">
              {!isADMIN ? (
                <button
                  className="btn btn-xs btn-success flex flex-row items-center space-x-1 flex-nowrap"
                  onClick={() => handleDownload(path, name)}
                >
                  <GoDownload />
                  <span className="hidden md:flex">Download</span>
                </button>
              ) : (
                <Link to={`/documents/${id}`} className="btn btn-xs btn-ghost">
                  <FaRegEye className="opacity-70 hover:opacity-100 transition duration-200 w-5 h-5" />
                </Link>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default DocumentList;

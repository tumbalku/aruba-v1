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
  FormTextArea,
  SectionInfo,
  SubmitButton,
  UnmodifiedField,
} from "../../components";

import { GoDownload } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import {
  errorHandleForAction,
  errorHandleForFunction,
} from "../../utils/exception";
import Swal from "sweetalert2";

export const loader = async ({ params }) => {
  try {
    const response = await customFetch.get(`/documents/${params.id}`);
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
      const response = await customFetch.patch(
        `/documents/${params.id}`,
        data,
        {
          headers: {
            "X-API-TOKEN": user.token,
          },
        }
      );

      toast.success(response.data.message || "Berhasil melalukan update");
      return null;
    } catch (error) {
      errorHandleForAction(error, "toastify");
    }
  };

const DocumentDetail = () => {
  const { documentDetail } = useLoaderData();
  const { user } = useSelector((state) => state.userState);

  const navigate = useNavigate();

  const handleDownload = async (path, name) => {
    try {
      const response = await customFetch.get(`/file/download/${path}`, {
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
      text: "Anda tidak akan bisa mengembalikan dokumen ini apabila sudah terlanjur dihapus.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, hapus",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await customFetch.delete(`/documents/${id}`, {
            headers: {
              "X-API-TOKEN": `${user.token}`,
            },
          });
          Swal.fire({
            title: "Berhasil menghapus document",
            text: response.data?.message,
            icon: "success",
          });
          navigate("/documents");
        } catch (error) {
          errorHandleForFunction(error, navigate);
        }
      }
    });
  }

  async function handlePriority(id, isChecked) {
    try {
      let response;
      if (isChecked) {
        response = await customFetch.patch(
          "/documents/priority/" + id,
          { priority: 1 },
          {
            headers: {
              "X-API-TOKEN": user.token,
            },
          }
        );
      } else {
        response = await customFetch.patch(
          "/documents/priority/" + id,
          { priority: 0 },
          {
            headers: {
              "X-API-TOKEN": user.token,
            },
          }
        );
      }
      toast.success(response?.data?.message || "update okk");
    } catch (error) {
      console.error("Error updating priority:", error);
    }
  }

  const {
    id,
    type,
    size,
    name,
    description,
    uploadedAt,
    updatedAt,
    path,
    priority,
  } = documentDetail;

  console.log(documentDetail)
  return (
    <div className="grid md:grid-cols-3 md:grid-rows-3 gap-4">
      <div className="flex items-center justify-center p-2 border rounded-md bg-base-200 h-fit">
        <img src={fileTypeIcons[type].url} alt={name} className="w-24 h-24" />

        <div className=" ml-1 ">
          <p className="font-semibold truncate text-xs sm:text-base w-36">
            {name}
          </p>
          <div className="mt-4 flex md:flex-col lg:flex-row gap-1">
            {type && (
              <button
                className="btn btn-xs md:btn-sm btn-success"
                onClick={() => handleDownload(path, name)}
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
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <SectionInfo
            title="Detail dokumen"
            info="Manajemen informasi dokumen"
          />
          <div className="px-10">
            <div className="flex gap-2 justify-center items-center">
              <p className="text-sm font-semibold">PIN</p>
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                defaultChecked={priority}
                onChange={(e) => handlePriority(id, e.target.checked)}
              />
            </div>
          </div>
        </div>

        <Form method="post">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2 mt-8">
            <div className="md:col-span-2">
              <FormInput
                size="md:input-sm input-xs "
                labelSize="text-xs"
                type="text"
                label="File name"
                name="name"
                defaultValue={name}
              />
              <FormTextArea
                size="textarea-sm"
                placeholder="informasi tentang file"
                label="Deskripsi"
                name="description"
                defaultValue={description}
              />
            </div>
          </div>
          <div className="grid grid-cols-3">
            <UnmodifiedField value={formatFileSize(size)} label="Ukuran file" />

            <UnmodifiedField
              value={convertDateArrayToString(uploadedAt)}
              label="Dibuat pada"
            />
            <UnmodifiedField
              value={convertDateArrayToString(updatedAt)}
              label="Diperbaruhi pada"
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

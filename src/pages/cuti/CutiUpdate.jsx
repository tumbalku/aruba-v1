import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import {
  DateInput,
  FileInput,
  FormCheckbox,
  FormInput,
  FormTextArea,
  SelectInput,
  SelectInputForId,
  SubmitButton,
  UserInfoDetail,
} from "../../components";
import { toast } from "react-toastify";
import { arrayToDate, calculateDaysBetween, customFetch } from "../../utils";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import {
  errorHandleForAction,
  errorHandleForFunction,
} from "../../utils/exception";
import SelectInputForIdCuti from "./components/SelectInputForIdCuti";
import { cutiStatus, sign } from "../../data";
import InputNumber from "../../components/input-v2/InputNumber";
import FetchPdfPreview from "../documents/FetchPdfPreview";
import LocalPdfPreview from "../documents/LocalPdfPreview";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
export const action =
  (store) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const user = store.getState().userState.user;
    const tembusan = JSON.parse(data.tembusan);
    const selectStatus = cutiStatus.find((item) => item.name === data.status);
    data.status = selectStatus.id;
    data.people = tembusan;
    console.log(data);
    data.userId = data.user;
    console.log(params);
    try {
      const response = await customFetch.patch(`/cuti/${params.id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-API-TOKEN": user.token,
        },
      });

      toast.success(response.data.message || "Update cuti");
      // window.open(urlToWa, "_blank");
      return redirect("/cuti/report");
    } catch (error) {
      console.log(error);
      return errorHandleForAction(error, "toastify");
    }
  };

export const loader =
  (store) =>
  async ({ params }) => {
    const user = store.getState().userState.user;

    try {
      const [cutiDetail, resKopList, resPejabat] = await Promise.all([
        customFetch.get(`/cuti/${params.id}`, {
          headers: {
            "X-API-TOKEN": `${user.token}`,
          },
        }),
        customFetch.get(`/kops`),
        customFetch.get(`/users/search`, {
          params: {
            roles: "OFFICEHOLDER",
          },
          headers: {
            "X-API-TOKEN": user.token,
          },
        }),
      ]);

      return {
        cuti: cutiDetail.data.data,
        kops: resKopList.data.data,
        pejabat: resPejabat.data.data,
      };
    } catch (error) {
      return errorHandleForAction(error, "toastify");
    }
  };

const CutiUpdate = () => {
  const [name, setName] = useState("");
  const [isWa, setIsWa] = useState(false);
  const { kops, cuti, pejabat } = useLoaderData();
  const [tembusan, setTembusan] = useState(cuti.people);
  const { token } = useSelector((state) => state.userState.user);
  const [kopData, setKopData] = useState(
    kops.find((kop) => kop.id === cuti.kop.id)
  );
  const handleKopChange = (event) => {
    const selectedKop = kops.find(
      (kop) => kop.id === parseInt(event.target.value)
    );
    setKopData(selectedKop || {});
  };

  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();

    if (!name) return;

    const updateTembusan = [...tembusan, name];
    setTembusan(updateTembusan);

    setName("");
  };

  const removeTembusan = (id) => {
    const updatedTembusan = tembusan.filter((_, index) => index !== id);
    setTembusan(updatedTembusan);
  };

  const handleCheckboxChange = (event) => {
    setIsWa(event.target.checked);
  };

  const {
    user: owner,
    kop,
    workUnit,
    status,
    message,
    dateStart,
    dateEnd,
    signedBy,
    mark,
    total,
    number,
    reason,
    address,
    document,
    forYear,
  } = cuti;

  const [startDate, setDateStart] = useState(arrayToDate(dateStart));
  const [endDate, setDateEnd] = useState(arrayToDate(dateEnd));
  const [dateBetween, setDateBetween] = useState(total);

  const handleDateChange = (name, value) => {
    let newDateStart = startDate;
    let newDateEnd = endDate;

    if (name === "dateStart") {
      newDateStart = value;
      setDateStart(value);
    } else if (name === "dateEnd") {
      newDateEnd = value;
      setDateEnd(value);
    }

    setDateBetween(calculateDaysBetween(newDateStart, newDateEnd));
  };
  const [manualDateBetween, setManualDateBetween] = useState(total);

  useEffect(() => {
    setManualDateBetween(dateBetween);
  }, [dateBetween]);

  const handleManualChange = (e) => {
    setManualDateBetween(e.target.value);
  };

  const [file, setFile] = useState(null);
  const constHandleFileChange = (e) => {
    const doc = e.target.files[0];
    setFile(doc);
  };

  const [fileDoc, setFileDoc] = useState(document);
  async function handleFileRemove(path) {
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
          const response = await customFetch.delete(
            `/cuti/remove/doc/${cuti.id}`,
            {
              headers: {
                "X-API-TOKEN": `${token}`,
              },
              data: { path: path },
            }
          );
          Swal.fire({
            title: "Berhasil menghapus document",
            text: response.data?.message,
            icon: "success",
          });
          setFileDoc(null);
        } catch (error) {
          errorHandleForFunction(error, navigate);
        }
      }
    });
  }

  return (
    <Form method="POST" encType="multipart/form-data">
      <div className="grid grid-cols-4 gap-5 ">
        <div className="col-span-4">
          <div className="grid place-items-center ">
            <UserInfoDetail {...owner} />
            <input type="hidden" name="user" value={owner.id} />
          </div>
        </div>
        <div className="col-span-4">
          {fileDoc ? (
            <div className="py-5">
              <div className="flex justify-center">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleFileRemove(fileDoc)}
                >
                  Hapus File
                </button>
              </div>
              <FetchPdfPreview fileId={fileDoc} />
            </div>
          ) : (
            <>
              <div className="flex justify-center items-center">
                <FileInput
                  color="file-input-success"
                  size="file-input-sm w-full"
                  label="Pilih File"
                  name="file"
                  onChange={constHandleFileChange}
                />
              </div>
              <div>
                {file && file.type === "application/pdf" && (
                  <div className="py-5">
                    <LocalPdfPreview file={file} />
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="col-span-4 md:col-span-2">
          <SelectInputForId
            name="kop"
            list={kops}
            defaultValue={kop.id}
            extFun={handleKopChange}
            size="select-sm"
            label="Type"
          />
        </div>

        <div className="col-span-4 md:col-span-2">
          <FormInput
            name="number"
            label="nomor cuti"
            size="input-sm"
            defaultValue={number}
          />
        </div>
        {kopData.type === "TAHUNAN" && (
          <div className="col-span-4">
            <FormInput
              name="forYear"
              label="Untuk Tahun"
              size="input-sm"
              defaultValue={forYear}
            />
          </div>
        )}
        <div className="col-span-4 md:col-span-2">
          <FormInput
            name="address"
            label="Alamat selama cuti"
            size="input-sm"
            defaultValue={address || owner.address}
          />
        </div>
        <div className="col-span-4 md:col-span-2">
          <FormInput
            name="workUnit"
            label="Unit Kerja"
            size="input-sm"
            type="text"
            defaultValue={workUnit}
          />
        </div>
        <div className="col-span-4 md:col-span-2">
          <FormTextArea
            label="Alasan"
            name="reason"
            defaultValue={reason}
            size="textarea-sm"
            disabled
          />
        </div>
        <div className="col-span-4 md:col-span-2">
          <FormTextArea
            label="Pesan"
            name="message"
            size="textarea-sm"
            defaultValue={message}
          />
        </div>

        <div className="col-span-4 md:col-span-2 grid md:grid-cols-3 gap-2 grid-cols-1">
          <DateInput
            label="Dari Tanggal"
            name="dateStart"
            size="date-sm"
            value={startDate}
            onChange={handleDateChange}
          />

          <DateInput
            label="Sampai Tanggal"
            name="dateEnd"
            size="date-sm"
            onChange={handleDateChange}
            value={endDate}
          />
          <InputNumber
            name="total"
            label="total hari"
            size="input-sm"
            value={manualDateBetween}
            onChange={handleManualChange}
          />
        </div>

        <div className="col-span-4 md:col-span-2 grid md:grid-cols-2  gap-2 grid-cols-1">
          <SelectInputForIdCuti
            label="Akan ditandatanganni oleh:"
            list={pejabat}
            defaultValue={signedBy}
            name="signedBy"
            size="select-sm"
          />
          <SelectInput
            label="Jabatan"
            list={sign}
            defaultValue={mark}
            name="mark"
            size="select-sm"
          />
        </div>
        <div className="col-span-4">
          <SelectInput
            label="Status"
            list={cutiStatus}
            name="status"
            defaultValue={status}
            size="select-sm"
          />
        </div>

        <div className="col-span-4 md:col-span-2">
          <FormCheckbox
            defaultChecked={isWa}
            label="Sent to"
            name="isWa"
            size="checkbox-sm"
            onChange={handleCheckboxChange}
          />
        </div>

        {isWa && (
          <div className="col-span-4 md:col-span-2">
            <FormInput name="phone" label="Whatsapp" size="input-sm" />
          </div>
        )}
        <div className="col-span-4">
          <div className="form-control mb-6">
            <label htmlFor="tembusan" className="label">
              <span className="label-text capitalize ">tembusan</span>
            </label>

            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-10">
                <input
                  type="text"
                  className="input input-bordered input-sm w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="tembusan"
                  placeholder="Tambahkan tembusan"
                />
              </div>
              <div className="col-span-2 text-center">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleAdd}
                >
                  <FaPlus />
                  <span className="hidden lg:flex">Tambah</span>
                </button>
              </div>
            </div>
          </div>
          {tembusan &&
            tembusan.map((tem, index) => {
              return (
                <div key={index} className="mt-2 grid grid-cols-12 gap-2">
                  <div className="col-span-10">
                    <input
                      type="text"
                      className="input-sm w-full"
                      disabled
                      defaultValue={tem}
                    />
                  </div>
                  <div className="col-span-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeTembusan(index)}
                      className="btn btn-sm btn-error"
                    >
                      <AiOutlineDelete />
                      <span className="hidden lg:flex">hapus</span>
                    </button>
                  </div>
                </div>
              );
            })}

          <input
            type="hidden"
            name="tembusan"
            value={JSON.stringify(tembusan.map((t) => t))}
          />
        </div>
      </div>
      <div className="text-center md:text-right mt-5">
        <SubmitButton color="btn-primary" size="btn-sm" text="Update" />
      </div>
    </Form>
  );
};

export default CutiUpdate;

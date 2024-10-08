import { Form, redirect, useLoaderData } from "react-router-dom";
import {
  DateInput,
  FileInput,
  FormCheckbox,
  FormInput,
  FormTextArea,
  SelectInputForId,
  SubmitButton,
} from "../../components";
import { useEffect, useState } from "react";
import { calculateDaysBetween, customFetch, daysBetween } from "../../utils";
import { errorHandleForAction } from "../../utils/exception";
import { toast } from "react-toastify";
import InputNumber from "../../components/input-v2/InputNumber";
import LocalPdfPreview from "../documents/LocalPdfPreview";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const user = store.getState().userState.user;

    data.kopData = JSON.parse(data.kopData || "{}");

    const { dateStart, dateEnd } = data;
    const dateCount = daysBetween(dateStart, dateEnd);
    data.file = data.file.size !== 0 ? data.file : null;

    const message = `
    *Permohonan ${data.kopData.name}*

    Kepada Yth. Pimpinan SDM

    Nama       : *${user.name}*
    Unit Kerja : *${user.workUnit}*

    Saya dengan nama di atas bermaksud mengajukan permohonan *${data.kopData.name}* selama *${dateCount}* hari, mulai tanggal *${dateStart}* hingga *${dateEnd}*.

    Demikian permohonan ini diajukan. Atas perhatian dan kebijaksanaannya, kami ucapkan terima kasih.

    Hormat saya,
    *${user.name}*
    `.trim();

    const urlToWa = `https://wa.me/6285336421912?text=${encodeURIComponent(
      message
    )}`;
    console.log(data);
    try {
      const response = await customFetch.post("/cuti/request", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-API-TOKEN": user.token,
        },
      });

      toast.success(response.data.message || "Berhasil membuat cuti");
      if (data.isWa === "on") {
        window.open(urlToWa, "_blank");
      }
      return redirect("/my-cuti");
    } catch (error) {
      return errorHandleForAction(error, "toastify");
    }
  };

export const loader = async () => {
  try {
    const response = await customFetch.get("/kops", {});
    return {
      kops: response.data.data,
    };
  } catch (error) {
    errorHandleForAction(error, "toastify");
  }
};

const MyCutiCreate = () => {
  const date = new Date().toISOString().split("T")[0];
  const [file, setFile] = useState(null);
  const { kops } = useLoaderData();
  const [kopData, setKopData] = useState(kops[0]);
  const handleKopChange = (event) => {
    const selectedKop = kops.find(
      (kop) => kop.id === parseInt(event.target.value)
    );
    setKopData(selectedKop || {});
  };

  const [dateStart, setDateStart] = useState(date);
  const [dateEnd, setDateEnd] = useState(date);
  const [dateBetween, setDateBetween] = useState(1);

  const handleDateChange = (name, value) => {
    let newDateStart = dateStart;
    let newDateEnd = dateEnd;

    if (name === "dateStart") {
      newDateStart = value;
      setDateStart(value);
    } else if (name === "dateEnd") {
      newDateEnd = value;
      setDateEnd(value);
    }

    setDateBetween(calculateDaysBetween(newDateStart, newDateEnd));
  };

  const constHandleFileChange = (e) => {
    const doc = e.target.files[0];
    setFile(doc);
  };
  const [manualDateBetween, setManualDateBetween] = useState(1);

  useEffect(() => {
    setManualDateBetween(dateBetween);
  }, [dateBetween]);

  const handleManualChange = (e) => {
    setManualDateBetween(e.target.value); // Mengizinkan pengguna mengubah nilai secara manual
  };
  return (
    <Form
      method="POST"
      encType="multipart/form-data"
      className="bg-base-300 h-fit lg:rounded-lg p-4 shadow-xl max-w-full"
    >
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-4 md:col-span-2">
          <SelectInputForId
            name="kop"
            list={kops}
            defaultValue={kops[0].name}
            size="select-sm"
            extFun={handleKopChange}
            label="Type"
          />
          <input type="hidden" name="kopData" value={JSON.stringify(kopData)} />
        </div>

        <div className="col-span-4 md:col-span-2">
          <FormInput
            name="address"
            label="Alamat selama cuti"
            size="input-sm"
          />
        </div>
        <div className="col-span-4 md:col-span-2 grid md:grid-cols-3 gap-2 grid-cols-1">
          <DateInput
            label="Dari Tanggal"
            name="dateStart"
            size="date-sm"
            value={dateStart}
            onChange={handleDateChange}
          />

          <DateInput
            label="Sampai Tanggal"
            name="dateEnd"
            size="date-sm"
            onChange={handleDateChange}
            value={dateEnd}
          />
          <InputNumber
            name="total"
            label="Estimasi total hari"
            size="input-sm"
            disabled
            value={manualDateBetween}
            onChange={handleManualChange}
          />
        </div>
        <div className="col-span-4 md:col-span-2">
          <FormInput
            name="workUnit"
            label="Unit Kerja (opsional)"
            size="input-sm"
          />
        </div>
        <div className="col-span-4">
          <FormTextArea
            label="Alasan Mengajuka Cuti"
            name="reason"
            size="textarea-sm"
            placeholder="Berikan keterangan yang mendukung alasan anda untuk mengajukan cuti..."
          />
        </div>

        <div className="col-span-4 md:col-span-2 flex justify-center items-center">
          <FileInput
            color="file-input-success"
            size="file-input-sm w-full"
            label="Pilih File"
            name="file"
            onChange={constHandleFileChange}
          />
        </div>
        <div className="col-span-4 md:col-span-2">
          <FormCheckbox label="Pesan Whatsapp" name="isWa" size="checkbox-sm" />
        </div>
      </div>

      <div>
        {file && file.type === "application/pdf" && (
          <div className="py-5">
            <LocalPdfPreview file={file} />
          </div>
        )}
      </div>
      <div className="text-center md:text-right mt-5">
        <SubmitButton color="btn-primary" size="btn-sm" text="Ajukan Cuti" />
      </div>
    </Form>
  );
};

export default MyCutiCreate;

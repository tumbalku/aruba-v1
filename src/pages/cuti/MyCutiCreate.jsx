import { Form, redirect, useLoaderData } from "react-router-dom";
import {
  DateInput,
  FormCheckbox,
  FormInput,
  FormTextArea,
  SelectInputForId,
  SubmitButton,
} from "../../components";
import { useState } from "react";
import { customFetch, daysBetween } from "../../utils";
import { errorHandleForAction } from "../../utils/exception";
import { toast } from "react-toastify";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const user = store.getState().userState.user;

    data.kopData = JSON.parse(data.kopData || "{}");

    const { dateStart, dateEnd } = data;
    const dateCount = daysBetween(dateStart, dateEnd);

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

    try {
      const response = await customFetch.post("/cuti/request", data, {
        headers: {
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

  const { kops } = useLoaderData();
  const [kopData, setKopData] = useState(kops[0]);
  const handleKopChange = (event) => {
    const selectedKop = kops.find(
      (kop) => kop.id === parseInt(event.target.value)
    );
    setKopData(selectedKop || {});
  };

  return (
    <Form
      method="POST"
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
        <div className="col-span-4 md:col-span-2">
          <DateInput
            label="Dari Tanggal"
            name="dateStart"
            size="date-sm"
            defaultValue={date}
          />
        </div>
        <div className="col-span-4 md:col-span-2">
          <DateInput
            label="Sampai Tanggal"
            name="dateEnd"
            size="date-sm"
            defaultValue={date}
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
        <div className="col-span-4">
          <FormCheckbox label="Pesan Whatsapp" name="isWa" size="checkbox-sm" />
        </div>
      </div>
      <div className="text-center md:text-right mt-5">
        <SubmitButton color="btn-primary" size="btn-sm" text="Ajukan Cuti" />
      </div>
    </Form>
  );
};

export default MyCutiCreate;

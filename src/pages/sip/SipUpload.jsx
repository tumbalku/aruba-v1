import React, { useEffect, useState } from "react";
import { customFetch } from "../../utils";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import { Form } from "react-router-dom";
import {
  DateInput,
  FileInput,
  FormInput,
  SubmitButton,
} from "../../components";
import { errorHandleForAction } from "../../utils/exception";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const user = store.getState().userState.user;

    data.file = data.file.size !== 0 ? data.file : null;
    console.log(data);
    try {
      const response = await customFetch.post("/sip/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-API-TOKEN": user.token,
        },
      });

      console.log(response);
      toast.success("Success upload file");
      return redirect("/sip");
    } catch (error) {
      return errorHandleForAction(error, "toastify");
    }
  };
const SipUpload = () => {
  const [form, setForm] = useState({
    file: null,
    details: {
      name: "",
      num: "",
      nip: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: files ? files[0] : value,
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        details: {
          ...prevForm.details,
          [name]: value,
        },
      }));
    }
  };
  const date = new Date().toISOString().split("T")[0];
  return (
    <div className="bg-base-300 p-4 rounded-md shadow-md">
      <Form method="post" encType="multipart/form-data">
        <FormInput
          size="input-sm"
          type="text"
          label="Name"
          name="name"
          defaultValue={form.details.name}
          onChange={handleInputChange}
        />
        <FormInput
          size="input-sm"
          type="text"
          label="Nomor"
          name="num"
          defaultValue={form.details.num}
          onChange={handleInputChange}
        />

        <FormInput
          size="input-sm"
          type="text"
          label="NIP"
          name="nip"
          defaultValue={form.details.nip}
          onChange={handleInputChange}
        />
        <div className="grid grid-cols-2 gap-5">
          <DateInput
            label="Tanggal Expired"
            name="expiredAt"
            size="date-sm"
            defaultValue={date}
          />
          <FileInput
            color="file-input-success"
            size="file-input-sm w-full"
            label="Pilih File"
            name="file"
            onChange={handleInputChange}
          />
        </div>
        <div className="text-right mt-5">
          <SubmitButton
            color="btn-primary"
            disabled={!form.details.name}
            text="Upload"
          />
        </div>
      </Form>
    </div>
  );
};

export default SipUpload;

import React, { useEffect, useState } from "react";
import { customFetch } from "../../utils";
import { toast } from "react-toastify";
import { redirect, useNavigate } from "react-router-dom";
import { docTypes } from "../../data";
import { Form } from "react-router-dom";
import {
  DateInput,
  FileInput,
  FormInput,
  SelectInput,
  SubmitButton,
} from "../../components";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const user = store.getState().userState.user;

    const userNip = formData.get("nip") || user.id;
    formData.set("nip", userNip);
    console.log(formData);
    try {
      const response = await customFetch.post("/letter/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-API-TOKEN": user.token,
        },
      });

      console.log(response);
      toast.success("Success upload file");
      return "ok";
    } catch (error) {
      console.error(error);
      toast.warn("Terjadi error!");
      return redirect("/documents");
    }
  };
const UploadDocument = () => {
  const [form, setForm] = useState({
    file: null,
    details: {
      name: "",
      num: "",
      nip: "",
      docType: "SIP",
    },
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { file, details } = form;
    setIsFormValid(file && details.name && details.docType);
  }, [form]);

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
        <DateInput
          label="Tanggal Expired"
          name="expiredAt"
          size="date-sm"
          defaultValue={date}
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
          <SelectInput
            label="Jenis Dokumen"
            size="select-sm"
            list={docTypes}
            name="docType"
            defaultValue={form.details.docType}
            onChange={handleInputChange}
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
            disabled={!isFormValid}
            text="Upload"
          />
        </div>
      </Form>
    </div>
  );
};

export default UploadDocument;

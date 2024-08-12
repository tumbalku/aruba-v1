import React, { useEffect, useState } from "react";
import { customFetch } from "../../utils";
import { toast } from "react-toastify";
import { redirect, useNavigate } from "react-router-dom";
import { docTypes } from "../../data";
import { Form } from "react-router-dom";
import {
  FileInput,
  FormInput,
  SelectInput,
  SubmitButton,
} from "../../components";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    try {
      const response = await customFetch.post("/documents/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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

  return (
    <div className="bg-slate-200 p-4 rounded-md shadow-md">
      <Form method="post" encType="multipart/form-data">
        <FormInput
          size="input-sm"
          type="text"
          label="Name"
          name="name"
          defaultValue={form.details.name}
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

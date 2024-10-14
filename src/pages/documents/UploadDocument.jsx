import { useEffect, useState } from "react";
import { customFetch } from "../../utils";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import { Form } from "react-router-dom";
import {
  FileInput,
  FormInput,
  FormTextArea,
  SubmitButton,
} from "../../components";
import { errorHandleForAction } from "../../utils/exception";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const user = store.getState().userState.user;

    console.log(formData);
    try {
      const response = await customFetch.post("/documents", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-API-TOKEN": user.token,
        },
      });

      console.log(response);
      toast.success("Success upload file");
      return redirect("/documents");
    } catch (error) {
      errorHandleForAction(error, "toastfiy");
    }
  };
const UploadDocument = () => {
  const [form, setForm] = useState({
    file: null,
    details: {
      name: "",
      description: "",
    },
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { file, details } = form;
    setIsFormValid(file && details.name);
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
    <div className="bg-base-300 p-4 rounded-md shadow-md">
      <Form method="post" encType="multipart/form-data">
        <FormInput
          size="input-sm"
          type="text"
          label="Nama"
          name="name"
          defaultValue={form.details.name}
          onChange={handleInputChange}
        />
        <FormTextArea
          size="textarea-sm"
          placeholder="informasi tentang file"
          label="Deskripsi"
          name="description"
          defaultValue={form.details.description}
          onChange={handleInputChange}
        />

        <div className="grid grid-cols-2 gap-5 items-end">
          <FileInput
            color="file-input-success"
            size="file-input-sm w-full"
            label="Pilih File"
            name="file"
            onChange={handleInputChange}
          />

          <SubmitButton
            color="btn-primary"
            size="btn-sm"
            disabled={!isFormValid}
            text="Upload"
          />
        </div>
      </Form>
    </div>
  );
};

export default UploadDocument;

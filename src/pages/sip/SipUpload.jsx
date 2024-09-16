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
  UserInfoDetail,
} from "../../components";
import { errorHandleForAction } from "../../utils/exception";
import { useDispatch, useSelector } from "react-redux";
import { clearChooseUser } from "../../features/user/tempSlice";
import SelectUser from "../min/SelectUser";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const user = store.getState().userState.user;
    const chooseUser = store.getState().tempState.chooseUser;

    data.userId = chooseUser.id;
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
      toast.success(response?.data?.message || "Berhasil!");
      store.dispatch(clearChooseUser());
      return redirect("/sip");
    } catch (error) {
      return errorHandleForAction(error, "toastify");
    }
  };
const SipUpload = () => {
  const chooseUser = useSelector((state) => state?.tempState?.chooseUser);
  const [form, setForm] = useState({
    file: null,
    details: {
      num: "",
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
  const dispatch = useDispatch();
  return (
    <div className="bg-base-300 p-4 rounded-md shadow-md">
      {chooseUser ? (
        <>
          <div className="grid place-items-center ">
            <UserInfoDetail {...chooseUser} />
          </div>
          <div className="text-center mt-4">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => {
                dispatch(clearChooseUser());
              }}
            >
              Clear User
            </button>
          </div>
        </>
      ) : (
        <SelectUser />
      )}
      <Form method="post" encType="multipart/form-data">
        <FormInput
          size="input-sm"
          type="text"
          label="Nomor"
          name="num"
          defaultValue={form.details.num}
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
            color="btn-primary btn-sm btn"
            disabled={!chooseUser}
            text="Upload"
          />
        </div>
      </Form>
    </div>
  );
};

export default SipUpload;

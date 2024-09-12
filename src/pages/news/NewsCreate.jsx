import React from "react";
import { clearImage } from "../../features/user/tempSlice";
import { customFetch } from "../../utils";
import { Form, redirect } from "react-router-dom/dist";
import ImageUpload from "../../components/ImageUpload";
import { InputField, SubmitButton } from "../../components";
import ReactQuill from "react-quill/lib";
import { toast } from "react-toastify";
import { useState } from "react";
import { errorHandleForAction } from "../../utils/exception";
import { modules, formats } from "../../utils/reactQuilConfig";
export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    console.log(store.getState());
    const user = store.getState().userState.user;
    const image = store.getState().tempState.imageUrl;
    data.imageUrl = image ? image : null;
    console.log(data);

    try {
      const response = await customFetch.post(`/posts`, data, {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });
      // how to dispatch
      toast.success(response.data.message || "Create post");
      store.dispatch(clearImage());
      return redirect("/news");
    } catch (error) {
      return errorHandleForAction(error);
    }
  };
const NewsCreate = () => {
  const [value, setValue] = useState("");

  return (
    <Form method="POST">
      <div className="flex flex-col sm:flex-row-reverse gap-6">
        <div className="flex-1 h-[300px] rounded-lg flex flex-col gap-4">
          <ImageUpload />
        </div>
        <div className="flex-[2] flex flex-col gap-6">
          <InputField label="title" name="title" type="text" />

          <div>
            <p className="text-xs capitalize p-2">Content</p>
            <div className={`h-[500px] overflow-y-scroll text-wrap`}>
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
                formats={formats}
                placeholder="..."
                className="h-full w-full "
              />
              <input type="hidden" name="content" value={value} />
            </div>
          </div>
          <div className="text-center md:text-right mt-5">
            <SubmitButton color="btn-primary" size="btn-sm" text="Buat Post" />
          </div>
        </div>
      </div>
    </Form>
  );
};

export default NewsCreate;

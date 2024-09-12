import React, { useState } from "react";
import ReactQuill from "react-quill";
import { InputField, SubmitButton } from "../../components";
import { modules, formats } from "../../utils/reactQuilConfig";
import { Form, redirect, useLoaderData } from "react-router-dom";
import ImageUpload from "../../components/ImageUpload";
import { customFetch } from "../../utils";
import { toast } from "react-toastify";
import { clearImage } from "../../features/user/tempSlice";
export const loader = async ({ params }) => {
  try {
    const response = await customFetch.get("/posts/" + params.id);

    console.log(response);
    return {
      post: response.data.data,
    };
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message || "Terjadi error!");
    return null;
  }
};
export const action =
  (store) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    console.log(store.getState());
    const user = store.getState().userState.user;
    const image = store.getState().tempState.imageUrl;
    data.imageUrl = image ? image : null;
    console.log(data);

    try {
      const response = await customFetch.patch(`/posts/${params.id}`, data, {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });
      toast.success(response.data.message || "Update post");
      store.dispatch(clearImage());
      return redirect("/posts");
    } catch (error) {
      if (error) {
        toast.error(error.response.data.message);
        return null;
      }
      return error;
    }
  };
const PostUpdate = () => {
  const { post } = useLoaderData();
  const { content, title, imageUrl } = post;
  const [value, setValue] = useState(content);

  console.log(value);
  return (
    <Form method="POST">
      <div className="flex flex-col sm:flex-row-reverse gap-6">
        <div className="flex-1 h-[300px] rounded-lg flex flex-col gap-4">
          <ImageUpload imageUrl={imageUrl} />
        </div>
        <div className="flex-[2] flex flex-col gap-6">
          <InputField label="title" name="title" type="text" value={title} />

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
            <SubmitButton
              color="btn-primary"
              size="btn-sm"
              text="Update post"
            />
          </div>
        </div>
      </div>
    </Form>
  );
};

export default PostUpdate;

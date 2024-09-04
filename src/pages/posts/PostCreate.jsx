import React, { useState } from "react";
import ReactQuill from "react-quill";
import { InputField, SubmitButton } from "../../components";

import { Form } from "react-router-dom";
import ImageUpload from "../../components/ImageUpload";
import { customFetch } from "../../utils";
import { toast } from "react-toastify";
import { clearImage } from "../../features/user/tempSlice";
export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    console.log(store.getState());
    const user = store.getState().userState.user;
    const image = store.getState().tempState.imageUrl;
    data.imageUrl = image;
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
      return null;
    } catch (error) {
      if (error) {
        toast.error(error.response.data.message);
        return null;
      }
      return error;
    }
  };
const PostCreate = () => {
  const [value, setValue] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }], // Ukuran teks
      ["bold", "italic", "underline", "strike"], // Format teks
      [{ color: [] }, { background: [] }], // Warna teks dan background
      [{ script: "sub" }, { script: "super" }], // Subscript/Superscript
      [{ list: "ordered" }, { list: "bullet" }], // List
      [{ indent: "-1" }, { indent: "+1" }], // Indentasi
      [{ direction: "rtl" }], // Teks Right-to-Left
      [{ align: [] }], // Align teks
      ["blockquote", "code-block"], // Blockquote dan kode
      ["link", "image", "video", "formula"], // Link, gambar, video, dan formula
      ["clean"], // Menghapus format
    ],
  };

  // Format yang didukung editor
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "sub",
    "super",
    "list",
    "bullet",
    "indent",
    "direction",
    "align",
    "blockquote",
    "code-block",
    "link",
    "image",
    "video",
    "formula",
  ];

  console.log(value);
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
            <div className="h-[500px] bg-white overflow-hidden">
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
                formats={formats}
                placeholder="Tambahkan informasi bagi para pembaca..."
                className="h-full  text-black prose"
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

export default PostCreate;

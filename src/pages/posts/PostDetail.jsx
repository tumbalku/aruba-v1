import React from "react";

import DOMPurify from "dompurify";
import { customFetch } from "../../utils";
import { useLoaderData } from "react-router-dom";
export const loader = async ({ params }) => {
  try {
    const response = await customFetch.get("/posts/" + params.id);
    console.log("dipanggil");
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
const PostDetail = () => {
  const { post } = useLoaderData();
  return (
    <div>
      <h1>title</h1>
      <p
        className="prose"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post.content),
        }}
      ></p>
    </div>
  );
};

export default PostDetail;

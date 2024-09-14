import React from "react";

import DOMPurify from "dompurify";
import { customFetch } from "../../utils";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import {
  errorHandleForAction,
  errorHandleForFunction,
} from "../../utils/exception";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
export const loader = async ({ params }) => {
  try {
    const response = await customFetch.get("/posts/" + params.id);
    console.log("dipanggil");
    console.log(response);
    return {
      post: response.data.data,
    };
  } catch (error) {
    return errorHandleForAction(error, "toastify");
  }
};
const PostDetail = () => {
  const user = useSelector((state) => state.userState.user);
  const { post } = useLoaderData();
  const navigate = useNavigate();

  async function handleDelete() {
    try {
      const response = await customFetch.delete("/posts/" + post.id, {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });

      toast.success(response.data.message);
      navigate("/posts");
    } catch (error) {
      return errorHandleForFunction(error, navigate);
    }
  }

  return (
    <div>
      <div className="flex flex-row gap-2 justify-end">
        <Link
          to={`/posts/update/${post.id}`}
          className="btn btn-xs md:btn-sm btn-info"
        >
          Edit
        </Link>
        <button
          className="btn btn-xs md:btn-sm btn-error"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      <h1>title</h1>
      <div
        className="prose w-full max-w-none leading-relaxed content"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post.content, {
            ADD_TAGS: ["iframe"],
            ADD_ATTR: ["allowfullscreen", "frameborder", "src", "className"],
          }),
        }}
      ></div>
    </div>
  );
};

export default PostDetail;

import React from "react";
import { PaginationContainer, Post } from "../../components";
import { customFetch } from "../../utils";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
export const loader = async ({ request }) => {
  try {
    const response = await customFetch.get("/posts");

    return {
      posts: response.data.data,
      pagination: response.data.pagination,
    };
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message || "Terjadi error!");
    return null;
  }
};
const Posts = () => {
  const { posts } = useLoaderData();

  return (
    <>
      <div className="flex flex-col gap-24">
        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </div>
      <PaginationContainer />
    </>
  );
};

export default Posts;

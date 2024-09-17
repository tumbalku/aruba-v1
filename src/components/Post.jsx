import React from "react";
import tempImg from "/image/hero1.jpg";
import { Link } from "react-router-dom";
import { getText } from "../utils";
const Post = ({ post }) => {
  const { title, id, imageUrl, content, createdAt, updatedAt, author } = post;
  return (
    <div className="flex flex-col sm:odd:flex-row-reverse sm:flex-row gap-8 hover:shadow-xl p-4 transition duration-300 ease-in-out">
      <div className="flex-[4]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="object-cover rounded-lg w-full h-[200px]"
          />
        ) : (
          <img
            src={tempImg}
            alt=""
            className="object-cover rounded-lg w-full h-[200px]"
          />
        )}
      </div>
      <div className="flex-[6] h-[200px] flex flex-col gap-4">
        <Link to={`${id}`} className="text-2xl font-bold line-clamp-2">
          {title}
        </Link>
        <p className="line-clamp-5 small-text">{getText(content)}</p>
        <Link
          to={`/news/${id}`}
          className="btn btn-outline btn-sm btn-secondary px-10 w-fit"
        >
          Baca
        </Link>
      </div>
    </div>
  );
};

export default Post;

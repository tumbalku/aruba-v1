import React from "react";
import { Post } from "../../components";

const Posts = () => {
  return (
    <div className="flex flex-col gap-24">
      <Post title={"satu"} id={1} />
      <Post title={"dua"} id={4} />
      <Post title={"tiga"} id={2} />
      <Post title={"empats"} id={3} />
    </div>
  );
};

export default Posts;

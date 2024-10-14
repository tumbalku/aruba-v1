import { PaginationContainer, SearchOnly } from "../../components";
import { customFetch } from "../../utils";
import { toast } from "react-toastify";
import PostList from "./PostList";
export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  params.size = 10;
  try {
    const response = await customFetch.get("/posts", { params });

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
  return (
    <>
      <SearchOnly link="/posts" name="content" />
      <PostList />
      {/* <div className="flex flex-col gap-24">
        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </div> */}
      <PaginationContainer />
    </>
  );
};

export default Posts;

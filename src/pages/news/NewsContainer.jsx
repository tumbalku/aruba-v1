import { useLoaderData } from "react-router-dom";
import { customFetch } from "../../utils";
import { errorHandleForAction } from "../../utils/exception";
import News from "./News";
import { PaginationContainer } from "../../components";
import { MdPostAdd } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/dist";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  params.size = 9;
  console.log(params);
  try {
    const response = await customFetch.get("/posts", { params });
    console.log(response);
    return {
      news: response.data.data,
      pagination: response.data.pagination,
    };
  } catch (error) {
    return errorHandleForAction(error, "toastify");
  }
};

const NewsContainer = () => {
  const { news } = useLoaderData();
  const roles = useSelector((state) => state.userState.roles);
  const isAdmin = roles.includes("ADMIN");
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {isAdmin && (
          <div className="flex justify-center items-center">
            <Link
              to="/news/create"
              className="rounded-full btn w-20 h-20 btn-primary flex justify-center items-center"
            >
              <MdPostAdd className=" w-20 h-20" />
            </Link>
          </div>
        )}
        {news.map((data) => {
          return <News key={data.id} {...data} />;
        })}
      </div>
      <PaginationContainer />
    </>
  );
};

export default NewsContainer;

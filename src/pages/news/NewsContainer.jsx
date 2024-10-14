import { useLoaderData } from "react-router-dom";
import { customFetch } from "../../utils";
import { errorHandleForAction } from "../../utils/exception";
import News from "./News";
import { PaginationContainer, SearchOnly } from "../../components";
import { MdPostAdd } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/dist";
import NewsV2 from "./NewsV2";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  params.size = 9;
  console.log(params);
  try {
    const response = await customFetch.get("/posts", { params });

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
      {news.length !== 0 && (
        <div className="mb-20">
          <SearchOnly name="content" link="/news" />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {isAdmin && (
          <div className="flex justify-center items-center">
            <Link
              to="/news/create"
              className="rounded-full btn w-20 h-20 btn-primary flex justify-center items-center "
            >
              <div className="lg:tooltip" data-tip="Tambah info">
                <MdPostAdd className=" w-12 h-12" />
              </div>
            </Link>
          </div>
        )}
        {news.map((data) => {
          // return <News key={data.id} {...data} />;
          return <NewsV2 key={data.id} {...data} name={data.user.name} />;
        })}
      </div>
      <PaginationContainer />
    </>
  );
};

export default NewsContainer;

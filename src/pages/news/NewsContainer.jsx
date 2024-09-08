import { useLoaderData } from "react-router-dom";
import { customFetch } from "../../utils";
import { errorHandle } from "../../utils/exception";
import News from "./News";
import { PaginationContainer } from "../../components";

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
    console.log(error);
    return errorHandle(error);
  }
};

const NewsContainer = () => {
  const { news } = useLoaderData();
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {news.map((data) => {
          return <News key={data.id} {...data} />;
        })}
      </div>
      <PaginationContainer />
    </>
  );
};

export default NewsContainer;

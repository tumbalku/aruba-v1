import { Link } from "react-router-dom";
import tempImg from "/image/hero1.jpg";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  params.size = 5;
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
const LatestNews = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2 max-h-40 ">
        <Link to="" className="w-20 relative group">
          <img src={tempImg} alt="" className="w-full h-full object-cover" />
          <div className="bg-gray-400 absolute top-0 left-0 right-0 h-5 opacity-80 group-hover:opacity-100 transition-all">
            <p className="text-center font-bold text-xs text-white">AUG 17</p>
          </div>
        </Link>
        <div className="flex-1">
          <Link
            to=""
            className="line-clamp-2 font-bold text-sm text-primary hover:text-secondary"
          >
            amet consectetur adipisicing elit. Totam facere nesciunt illo,
            quibusdam pariatur incidunt harum laborum provident dolorum
            repudiandae.
          </Link>
          <p className="line-clamp-2 text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ullam
            ut ducimus. Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Totam facere nesciunt illo, quibusdam pariatur incidunt harum
            laborum provident dolorum repudiandae.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;

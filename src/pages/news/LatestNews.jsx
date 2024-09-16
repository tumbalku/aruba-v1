import { Link, useNavigate } from "react-router-dom";
import tempImg from "/image/hero1.jpg";
import { convertLocalDateTimeToDate, customFetch, getText } from "../../utils";
import { errorHandleForFunction } from "../../utils/exception";
import { useEffect, useState } from "react";
import moment from "moment";

const LatestNews = () => {
  const naviagete = useNavigate();
  const [latestNews, setLatestNews] = useState([]);
  async function getLatestNews() {
    try {
      const response = await customFetch.get("/posts", {
        params: {
          size: 5,
        },
      });
      setLatestNews(response.data.data);
    } catch (error) {
      errorHandleForFunction(error, naviagete, "toastify");
    }
  }
  useEffect(() => {
    getLatestNews();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {latestNews &&
        latestNews.map((news) => {
          const { imageUrl, title, content, createdAt, id } = news;
          return (
            <div key={id} className="flex flex-row gap-2 h-20">
              <Link
                to={`/news/${id}`}
                className="w-20 relative group overflow-hidden"
              >
                <img
                  src={imageUrl ? imageUrl : tempImg}
                  alt=""
                  className="min-w-full min-h-full object-cover"
                />
                <div className="bg-gray-400 absolute top-0 left-0 right-0 h-5 opacity-80 group-hover:opacity-100 transition-all">
                  <p className="text-center font-bold text-xs text-white">
                    {moment(convertLocalDateTimeToDate(createdAt)).format(
                      "MMM D"
                    )}
                  </p>
                </div>
              </Link>
              <div className="flex-1 ">
                <Link
                  to={`/news/${id}`}
                  className="line-clamp-2 font-bold text-sm text-primary hover:text-secondary"
                >
                  {title}
                </Link>
                <p className="line-clamp-2 text-xs">{getText(content)}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default LatestNews;

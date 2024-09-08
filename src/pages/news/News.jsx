import { Link, useNavigate } from "react-router-dom";
import tempImg from "/image/hero1.jpg";

const News = ({ imageUrl, title, id }) => {
  return (
    <div className="flex flex-col items-center justify-between text-center bg-base-300 shadow-lg rounded-lg pb-2 gap-2">
      <Link to={id} className="w-full">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="object-cover rounded-lg w-full sm:h-[200px] h-[100px]"
          />
        ) : (
          <img
            src={tempImg}
            alt=""
            className="object-cover rounded-lg w-full sm:h-[200px] h-[100px]"
          />
        )}
      </Link>

      <h1 className="text-sm sm:text-base font-semibold line-clamp-2">
        {title}
      </h1>
      <Link to={id} className="btn btn-primary btn-sm">
        Baca info
      </Link>
    </div>
  );
};

export default News;

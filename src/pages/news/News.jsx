import { Link } from "react-router-dom";
import tempImg from "/image/hero1.jpg";
import { getText } from "../../utils";

const News = ({ imageUrl, title, id, content }) => {
  return (
    <div className="flex flex-col bg-base-300 shadow-lg rounded-lg pb-2 gap-2 h-fit overflow-hidden">
      <Link to={id} className="w-full">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="object-cover w-full sm:h-[200px] h-[100px]"
          />
        ) : (
          <img
            src={tempImg}
            alt=""
            className="object-cover w-full sm:h-[200px] h-[100px]"
          />
        )}
      </Link>
      <div className="py-1 px-3 flex flex-col gap-2 justify-between h-full">
        <h1 className="text-sm sm:text-base font-semibold line-clamp-2">
          {title}
        </h1>
        <p className="line-clamp-2 text-xs">{getText(content)}</p>

        <Link to={id} className="btn btn-primary btn-xs font-normal">
          Baca info
        </Link>
      </div>
    </div>
  );
};

export default News;

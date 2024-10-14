import { Link } from "react-router-dom";
import bahteramas from "/image/hero1.jpg";
import { GoPerson } from "react-icons/go";
import { IoCalendarOutline } from "react-icons/io5";
import { IoIosArrowRoundForward } from "react-icons/io";
import { convertDateArrayToString, getText } from "../../utils";

const NewsV2 = ({ imageUrl, title, id, content, name, createdAt }) => {
  return (
    <div className="flex flex-col bg-base-200 shadow-xl">
      <Link to={`${id}`}>
        <img
          src={imageUrl || bahteramas}
          alt="bahteramas"
          className="w-full h-[225px] object-cover"
        />
      </Link>

      <div className="p-4">
        <div className="flex flex-row md:flex-col gap-2 border-b-2 border-base-300 pb-2">
          <div className="flex flex-row items-center gap-1">
            <GoPerson className="w-5 h-5 text-primary" />
            <p className="text-xs">{name}</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <IoCalendarOutline className="w-5 h-5 text-primary" />
            <p className="text-xs">{convertDateArrayToString(createdAt)}</p>
          </div>
        </div>
        <div className="mt-2 space-y-2">
          <Link
            to={`${id}`}
            className="text-lg hover:text-primary font-semibold line-clamp-2"
          >
            {title}
          </Link>
          <p className="text-xs line-clamp-3">{getText(content)}</p>
          <Link
            to={`${id}`}
            className="flex flex-row items-center hover:text-primary gap-2"
          >
            <p className="text-sm font-medium">Baca lebih lanjut</p>
            <IoIosArrowRoundForward className="w-5 h-5 " />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsV2;

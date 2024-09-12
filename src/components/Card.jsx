import { Link } from "react-router-dom";

const Card = ({ title, children, color, url }) => {
  const setColor = color ? color : "bg-base-200";

  return (
    <Link
      to={url}
      className="bg-base-100 hover:bg-base-200 transition duration-500 w-full shadow-lg hover:shadow-2xl p-2 md:py-4 md:px-6"
    >
      <div>
        <div
          className={`${setColor} h-40 rounded-lg flex flex-col justify-center items-center gap-2`}
        >
          {children}
          <h1 className="sm:text-lg font-semibold">{title}</h1>
        </div>
      </div>
      <div className="flex items-center justify-center"></div>
    </Link>
  );
};

export default Card;

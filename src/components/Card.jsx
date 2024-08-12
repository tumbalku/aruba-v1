import { Link } from "react-router-dom";

const Card = ({ title, children, color, url, maintenance }) => {
  const isMaintenance = maintenance ? "btn-disabled" : "";
  const setColor = color ? color : "bg-base-200";

  return (
    <div className="card bg-base-100 hover:bg-base-200 transition duration-500 w-full shadow-xl hover:shadow-2xl">
      <figure className="px-10 pt-10">
        <div className={`${setColor}  py-10 px-16 rounded-lg`}>{children}</div>
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
        <div className="card-actions">
          <Link to={url} className={`btn btn-primary btn-sm ${isMaintenance}`}>
            {maintenance ? "Maintenance" : "Pelajari"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;

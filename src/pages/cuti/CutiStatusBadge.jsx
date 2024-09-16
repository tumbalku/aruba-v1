import { RxCross1 } from "react-icons/rx";
import { GiCheckMark } from "react-icons/gi";
const CutiStatusBadge = ({ status }) => {
  let badgeClass = "badge ";

  switch (status) {
    case "Menunggu":
      badgeClass += "badge-info";
      break;
    case "Disetujui":
      badgeClass += "badge-success";
      break;
    case "Dibatalkan":
      badgeClass += "badge-error";
      break;
    default:
      badgeClass += "badge-default";
      break;
  }

  return (
    <div className={`${badgeClass} gap-2`}>
      {status}
      {status === "Disetujui" && <GiCheckMark />}
      {status === "Dibatalkan" && <RxCross1 />}
      {status === "Menunggu" && (
        <span className="loading loading-spinner loading-xs"></span>
      )}
    </div>
  );
};

export default CutiStatusBadge;

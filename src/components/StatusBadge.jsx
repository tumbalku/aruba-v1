const StatusBadge = ({ status }) => {
  let badgeClass = "badge ";

  switch (status) {
    case "Belum mulai":
      badgeClass += "badge-info";
      break;
    case "Sedang cuti":
      badgeClass += "badge-success";
      break;
    case "Sudah selesai":
      badgeClass += "badge-error";
      break;
    default:
      badgeClass += "badge-default";
      break;
  }

  return <div className={`${badgeClass} gap-2`}>{status}</div>;
};

export default StatusBadge;

const StatusBadge = ({ status }) => {
  let badgeClass = "badge ";

  switch (status) {
    case "PENDING":
      badgeClass += "badge-info";
      break;
    case "APPROVED":
      badgeClass += "badge-success";
      break;
    case "REJECTED":
      badgeClass += "badge-error";
      break;
    default:
      badgeClass += "badge-default";
      break;
  }

  return <div className={`${badgeClass} gap-2`}>{status}</div>;
};

export default StatusBadge;

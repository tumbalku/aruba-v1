const SipStatusReportBadge = ({ status }) => {
  let badgeClass = "badge ";

  switch (status) {
    // case "Terkirim":
    case "TERKIRIM":
      badgeClass += "badge-success";
      break;
    // case "Tidak terkirim":
    case "TIDAK_TERKIRIM":
      badgeClass += "badge-error";
      break;
    default:
      badgeClass += "badge-default";
      break;
  }

  return <div className={`${badgeClass} gap-2`}>{status}</div>;
};

export default SipStatusReportBadge;

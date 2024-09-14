import SipStatusReportBadge from "./SipStatusReportBadge";
import { convertDateArrayToString } from "../../utils";

const SipReport = ({ reports }) => {
  return (
    <div className="bg-base-100 border rounded-lg my-4 max-h-[280px] overflow-y-scroll">
      <div className="overflow-x-auto">
        <table className="table table-xs text-center">
          <thead>
            <tr>
              <th>Tanggal Kirim</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => {
              return (
                <tr key={report.id}>
                  <td>{convertDateArrayToString(report.sentDate)}</td>
                  <td className="text-center">
                    <SipStatusReportBadge status={report.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SipReport;

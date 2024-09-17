import SipStatusReportBadge from "./SipStatusReportBadge";
import { convertDateArrayToString, customFetch } from "../../../utils";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";

const SipReport = ({ reports }) => {
  const { user } = useSelector((state) => state.userState);
  const [reportList, setReportList] = useState(reports || []);
  async function handleDelete(id) {
    try {
      const response = await customFetch.delete("/sip/report/" + id, {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });
      toast.success(response.data.message);
      setReportList((prevReport) =>
        prevReport.filter((report) => report.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  }
  if (reportList.length === 0) {
    return null;
  }
  return (
    <div className="bg-base-100 border rounded-lg my-4 max-h-[280px] overflow-y-scroll">
      <div className="overflow-x-auto">
        <table className="table table-xs text-center">
          <thead>
            <tr>
              <th>Tanggal Kirim</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reportList.map((report) => {
              return (
                <tr key={report.id}>
                  <td>{convertDateArrayToString(report.sentDate)}</td>
                  <td className="text-center">
                    <SipStatusReportBadge status={report.status} />
                  </td>
                  <td>
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => handleDelete(report.id)}
                    >
                      <AiOutlineDelete />
                    </button>
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

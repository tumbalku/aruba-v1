import SipStatusReportBadge from "./SipStatusReportBadge";
import { convertDateArrayToString, customFetch } from "../../../utils";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import Swal from "sweetalert2";
import { errorHandleForFunction } from "../../../utils/exception";
import { useNavigate } from "react-router-dom";

const SipReport = ({ reports }) => {
  const { user } = useSelector((state) => state.userState);
  const [reportList, setReportList] = useState(reports || []);
  const navigate = useNavigate();
  async function handleDelete(id) {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak akan bisa mengembalikan laporan SIP ini apabila sudah terlanjur dihapus.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, hapus",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await customFetch.delete("/sip/report/" + id, {
            headers: {
              "X-API-TOKEN": user.token,
            },
          });
          Swal.fire({
            title: "Berhasil menghapus laporan SIP",
            text: response.data?.message,
            icon: "success",
          });
          setReportList((prevReport) =>
            prevReport.filter((report) => report.id !== id)
          );
        } catch (error) {
          errorHandleForFunction(error, navigate);
        }
      }
    });
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

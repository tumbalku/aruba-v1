import { useEffect, useRef, useState } from "react";
import { customFetch, dateToFormat } from "../../utils";
import { checkCutiStatus } from "../../data";
import { StatusBadge } from "../../components";
import CutiStatusBadge from "./components/CutiStatusBadge";
import CutiReportFilter from "./components/CutiReportFilter";

const CutiReportView = () => {
  const tableRef = useRef(null);

  useEffect(() => {
    const tableBody = tableRef.current;
    let scrollInterval;

    const startScroll = () => {
      scrollInterval = setInterval(() => {
        tableBody.scrollTop += 1;
        if (
          tableBody.scrollTop + tableBody.clientHeight >=
          tableBody.scrollHeight
        ) {
          tableBody.scrollTop = 0;
        }
      }, 100); // kecepatan scroll
    };

    startScroll();

    return () => clearInterval(scrollInterval);
  }, []);

  const [cutis, setCutis] = useState([]);
  const [report, setReport] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await customFetch("/cuti/search", {
          params: {
            size: 1000,
          },
        });
        setCutis(response.data.data);
        setReport(response.data.report);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, []);
  return (
    <div>
      <CutiReportFilter report={report} />
      <h1 className="text-lg lg:text-2xl font-semibold text-center my-5">
        Laporan Cuti RSUD Bahteramas
      </h1>
      <div className="md:col-span-4 col-span-6 mt-10">
        <div
          className="overflow-x-auto max-h-[60vh] no-scrollbar"
          ref={tableRef}
        >
          <table className="table table-xs table-zebra table-pin-rows border-[1px] border-base-300">
            <thead>
              <tr className="text-center">
                <th>Tipe</th>
                <th>Nama</th>
                <th>Proses Cuti</th>
                <th>Status Permohonan</th>
                <th>Unit Kerja</th>
                <th>No Cuti</th>
                <th>Dari Tanggal</th>
                <th>Sampai Tanggal</th>
                <th>Total Hari</th>
              </tr>
            </thead>

            <tbody className="text-nowrap text-center">
              {cutis.map(
                ({
                  dateStart,
                  dateEnd,
                  id,
                  kop,
                  number,
                  status,
                  total,
                  user: owner,
                }) => {
                  return (
                    <tr key={id}>
                      <td>{kop.name}</td>
                      <td>{owner.name}</td>
                      <td>
                        {status !== "Menunggu" && status !== "Dibatalkan" ? (
                          <StatusBadge
                            status={checkCutiStatus(dateStart, dateEnd)}
                          />
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>
                        <CutiStatusBadge status={status} />
                      </td>
                      <td className="max-w-52 truncate">{owner.workUnit}</td>
                      <th>{number ? number : "-"}</th>
                      <td>{dateToFormat(dateStart)}</td>
                      <td>{dateToFormat(dateEnd)}</td>
                      <td>{total}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CutiReportView;

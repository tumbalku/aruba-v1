import React, { useEffect, useRef, useState } from "react";
import { calculateDaysBetween, customFetch, dateToFormat } from "../../utils";
import { checkCutiStatus } from "../../data";
import { StatusBadge } from "../../components";
import CutiStatusBadge from "../cuti/CutiStatusBadge";
import { useSelector } from "react-redux";

const SipReportView = () => {
  const tableRef = useRef(null);
  const { user } = useSelector((state) => state.userState);

  useEffect(() => {
    const tableBody = tableRef.current;
    let scrollInterval;

    const startScroll = () => {
      scrollInterval = setInterval(() => {
        tableBody.scrollTop += 1; // scroll ke bawah perlahan
        if (
          tableBody.scrollTop + tableBody.clientHeight >=
          tableBody.scrollHeight
        ) {
          tableBody.scrollTop = 0; // jika sudah mencapai bawah, kembali ke atas
        }
      }, 100); // kecepatan scroll
    };

    startScroll();

    return () => clearInterval(scrollInterval);
  }, []);

  const [cutis, setCutis] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await customFetch("/cuti/search", {
          headers: {
            "X-API-TOKEN": user.token,
          },
        });
        setCutis(response.data.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, []);
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="md:col-span-2 col-span-6 flex items-center justify-center">
        <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-2 text-center">
          <div className="px-8 py-4 bg-teal-400 rounded-lg">IZIN</div>
          <div className="px-8 py-4 bg-teal-400 rounded-lg">TAHUNAN</div>
          <div className="px-8 py-4 bg-teal-400 rounded-lg">SAKIT</div>
          <div className="px-8 py-4 bg-teal-400 rounded-lg">BESAR</div>
          <div className="px-8 py-4 bg-teal-400 rounded-lg">BERSALIN</div>
          <div className="px-8 py-4 bg-teal-400 rounded-lg">PENTING</div>
        </div>
      </div>
      <div className="md:col-span-4 col-span-6">
        <div className="overflow-x-auto max-h-60 no-scrollbar" ref={tableRef}>
          <table className="table table-xs table-zebra table-pin-rows ">
            <thead>
              <tr className="text-center">
                <th className="text-left">No</th>
                <th className="text-left">Nama</th>
                <th>Tipe</th>
                <th>Unit Kerja</th>
                <th>Dari Tanggal</th>
                <th>Sampai Tanggal</th>
                <th>Total Hari</th>
                <th>Proses Cuti</th>
                <th>Status Permohonan</th>
              </tr>
            </thead>
            {/* ada masalah pada whitespace-nowrap */}
            <tbody className="text-nowrap text-center">
              {cutis.map(
                ({
                  dateStart,
                  dateEnd,
                  id,
                  kop,
                  number,
                  status,
                  user: owner,
                }) => {
                  return (
                    <tr key={id}>
                      <th>{number}</th>
                      <td>{owner.name}</td>
                      <td>{kop.name}</td>
                      <td className="max-w-52 truncate">{owner.workUnit}</td>
                      <td>{dateToFormat(dateStart)}</td>
                      <td>{dateToFormat(dateEnd)}</td>
                      <td>{calculateDaysBetween(dateStart, dateEnd)}</td>
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

export default SipReportView;

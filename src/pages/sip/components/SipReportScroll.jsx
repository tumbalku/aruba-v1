import { useEffect, useRef, useState } from "react";
import { errorHandleForFunction } from "../../../utils/exception";
import { useNavigate } from "react-router-dom";
import { customFetch, dateToFormat } from "../../../utils";

const SipReportScroll = () => {
  const navigate = useNavigate();
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

  const [sip, setSip] = useState([]);
  useEffect(() => {
    const fetchSip = async () => {
      try {
        const response = await customFetch("/sip", {
          params: {
            size: 10000,
          },
        });
        setSip(response.data.data);
      } catch (error) {
        errorHandleForFunction(error, navigate, "toastify");
      }
    };
    fetchSip();
  }, []);
  console.log(sip);
  return (
    <div className="md:col-span-4 col-span-6 mt-10">
      <div className="overflow-x-auto max-h-[60vh] no-scrollbar" ref={tableRef}>
        <table className="table table-xs table-zebra table-pin-rows border-[1px] border-base-300">
          <thead>
            <tr className="text-center">
              <th>Nomor SIP</th>
              <th>Pemilik</th>

              <th>Dibuat</th>
              <th>Diperbaruhi</th>
              <th>Berakhir</th>
            </tr>
          </thead>

          <tbody className="text-nowrap text-center">
            {sip.map(
              ({ id, num, uploadedAt, updatedAt, user: owner, expiredAt }) => {
                return (
                  <tr key={id}>
                    <th>{num}</th>
                    <td>{owner.name}</td>
                    <td>{dateToFormat(uploadedAt)}</td>
                    <td>{dateToFormat(updatedAt)}</td>
                    <td>{dateToFormat(expiredAt)}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SipReportScroll;

import { Link, useLoaderData } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import StatusBadge from "./StatusBadge";
import { calculateDaysBetween, customFetch, dateToFormat } from "../utils";
import { toast } from "react-toastify";
import SectionTitle from "./SectionTitle";
import { useSelector } from "react-redux";
import { useState } from "react";
import { checkCutiStatus } from "../data";
import CutiStatusBadge from "../pages/cuti/components/CutiStatusBadge";

const CutiList = () => {
  const { cutis } = useLoaderData();

  if (cutis.length == 0) {
    return <SectionTitle text="Belum ada cuti yang diajukan" size="text-sm" />;
  }
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-xs text-center table-zebra ">
          <thead>
            <tr>
              <th>No</th>
              <th>Tipe</th>
              <th>Dari Tanggal</th>
              <th>Sampai Tanggal</th>
              <th>Total Hari</th>
              <th>Proses Cuti</th>
              <th>Status Permohonan</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-nowrap ">
            {cutis.length > 0 &&
              cutis.map((cuti) => {
                const { id, kop, status, dateStart, dateEnd, number } = cuti;

                const type = kop.name;
                return (
                  <tr key={id}>
                    <th>{number}</th>
                    <td>{type}</td>
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
                    <td className="flex space-x-2 justify-center">
                      {status !== "Menunggu" && (
                        <Link
                          to={`/my-cuti/${id}`}
                          className="btn btn-outline btn-sm btn-info"
                        >
                          <HiOutlineDocumentSearch />
                        </Link>
                      )}
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

export default CutiList;

import React, { useState } from "react";

import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import {
  PaginationContainer,
  SearchOnly,
  SelectInput,
  UserCutiReportList,
} from "../../components";

import { customFetch } from "../../utils";
import CutiReportFilter from "./components/CutiReportFilter";
import { errorHandleForAction } from "../../utils/exception";
import { years } from "../../data";
import { GrPrint } from "react-icons/gr";
import { useSelector } from "react-redux";

export const loader =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    console.log(params);
    try {
      const response = await customFetch.get("/cuti/search", {
        params,
        headers: {
          "X-API-TOKEN": `${user.token}`,
        },
      });

      return {
        cuti: response.data.data,
        report: response.data.report,
        pagination: response.data.pagination,
      };
    } catch (error) {
      return errorHandleForAction(error, "toastify");
    }
  };

const CutiReport = () => {
  const { report } = useLoaderData();
  const [isDisabled, setIsDisabled] = useState(false);
  const user = useSelector((state) => state.userState.user);

  const [year, setYear] = useState(2024);
  const handleDownload = async () => {
    setIsDisabled(true);
    try {
      const response = await customFetch(`/cuti/download/reports`, {
        responseType: "blob",
        params: {
          year: year,
        },
        headers: {
          "X-API-TOKEN": user.token,
        },
      });

      const blob = new Blob([response.data], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "laporan-cuti.pdf";

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
    } catch (error) {
      console.log(error);
      toast.error("There something error for download this file!");
      setTimeout(() => {
        toast.error("Try again later");
      }, 2500);
    } finally {
      setTimeout(() => {
        setIsDisabled(false);
      }, 1 * 60 * 1000); // 5 menit
    }
  };

  function handleYear(event) {
    setYear(event.target.value);
  }
  console.log(year);
  return (
    <>
      {report !== 0 && (
        <div className="flex justify-center mb-5 gap-4">
          <select
            name="year"
            className={`select select-bordered select-sm`}
            value={year}
            onChange={handleYear}
          >
            {years.map((item, index) => {
              return (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <button
            onClick={handleDownload}
            disabled={isDisabled}
            type="button"
            className="btn btn-secondary btn-sm"
          >
            Kartu Kontrol
            <GrPrint className="w-4 h-4" />
          </button>
        </div>
      )}

      <CutiReportFilter report={report} />
      <SearchOnly name="name" link="/cuti/report" />
      <UserCutiReportList />
      <PaginationContainer />
    </>
  );
};

export default CutiReport;

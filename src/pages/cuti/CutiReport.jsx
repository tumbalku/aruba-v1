import React from "react";

import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import {
  PaginationContainer,
  SearchOnly,
  UserCutiReportList,
} from "../../components";

import { customFetch } from "../../utils";
import CutiReportFilter from "./components/CutiReportFilter";
import { errorHandleForAction } from "../../utils/exception";

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
  return (
    <>
      <CutiReportFilter report={report} />
      <SearchOnly name="name" link="/cuti/report" />
      <UserCutiReportList />
      <PaginationContainer />
    </>
  );
};

export default CutiReport;

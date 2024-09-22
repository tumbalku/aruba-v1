import React from "react";

import { useLoaderData } from "react-router-dom";
import { PaginationContainer, SearchOnly } from "../../components";

import { customFetch } from "../../utils";
import CutiReportFilter from "./components/CutiReportFilter";
import { errorHandleForAction } from "../../utils/exception";
import UserCutiDecisionList from "./components/UserCutiDecisionList";

export const loader =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    console.log(params);
    try {
      const response = await customFetch.get("/cuti/search?statuses=PENDING", {
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

const CutiDecisionReport = () => {
  const { report } = useLoaderData();
  return (
    <>
      <CutiReportFilter report={report} />
      <SearchOnly name="name" link="/cuti/report" />
      <UserCutiDecisionList />
      <PaginationContainer />
    </>
  );
};

export default CutiDecisionReport;

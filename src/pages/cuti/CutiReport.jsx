import React from "react";

import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import {
  PaginationContainer,
  SearchOnly,
  UserCutiReportList,
} from "../../components";
import { Report } from "../index";
import { customFetch } from "../../utils";

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
      console.log(error);
      toast.warn("Terjadi error!");
      return null;
      // return redirect("/login");
    }
  };

const CutiReport = () => {
  return (
    <>
      <Report />
      <SearchOnly name="name" link="/cuti/report" />
      <UserCutiReportList />
      <PaginationContainer />
    </>
  );
};

export default CutiReport;

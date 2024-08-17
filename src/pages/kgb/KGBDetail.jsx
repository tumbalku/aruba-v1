import React from "react";
import DocumentList from "../../components/DocumentList";
import { customFetch } from "../../utils";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import { SearchOnly } from "../../components";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  params.docType = "KGB";
  try {
    const response = await customFetch.get("/documents", {
      params,
    });
    console.log(response);
    return {
      documents: response.data.data,
      pagination: response.data.pagination,
    };
  } catch (error) {
    console.log(error);
    toast.warn("Terjadi error!");
    // return redirect("/login");
    return null;
  }
};
const KGBDetail = () => {
  return (
    <div>
      <SearchOnly name="filename" link="/letters/kgb" />
      <DocumentList />
    </div>
  );
};

export default KGBDetail;

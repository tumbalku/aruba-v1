import React from "react";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { Link, redirect } from "react-router-dom";
import DocumentList from "../components/DocumentList";
import { PaginationContainer } from "../components";
import { LuUpload } from "react-icons/lu";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const response = await customFetch.get("/documents", {
      params,
    });

    return {
      documents: response.data.data,
      pagination: response.data.pagination,
    };
  } catch (error) {
    console.log(error);
    toast.warn("Terjadi error!");
    return redirect("/login");
  }
};
const Documents = () => {
  return (
    <div>
      <div className="flex justify-center sm:justify-end sm:mr-8 my-8">
        <Link to="upload" className="btn btn-xs btn-primary">
          <span>Upload</span>
          <LuUpload className="w-4 h-4" />
        </Link>
      </div>
      <DocumentList />
      <PaginationContainer />
    </div>
  );
};

export default Documents;

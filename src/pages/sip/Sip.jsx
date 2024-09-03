import React from "react";
import { LuUpload } from "react-icons/lu";
import { Link } from "react-router-dom";
import { PaginationContainer, SearchOnly } from "../../components";
import DocumentList from "../../components/DocumentList";
import { toast } from "react-toastify";
import { customFetch } from "../../utils";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  params.type = "SIP";
  try {
    const response = await customFetch.get("/letter", {
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
const Sip = () => {
  return (
    <div>
      <div className="flex justify-center sm:justify-end sm:mr-8 my-8">
        <Link to="upload" className="btn btn-sm btn-primary">
          <span>Upload</span>
          <LuUpload className="w-4 h-4" />
        </Link>
      </div>
      <SearchOnly name="filename" link="/letters/sip" />
      <DocumentList />
      {/* <PaginationContainer /> */}
    </div>
  );
};

export default Sip;

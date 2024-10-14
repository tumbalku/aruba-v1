import { customFetch } from "../utils";
import { Link } from "react-router-dom";
import DocumentList from "../components/DocumentList";
import { PaginationContainer, SearchOnly } from "../components";
import { LuUpload } from "react-icons/lu";
import { errorHandleForAction } from "../utils/exception";
import { useSelector } from "react-redux";

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
    return errorHandleForAction(error, "toastfiy");
  }
};
const Documents = () => {
  const { roles } = useSelector((state) => state.userState);

  let isADMIN = false;

  if (roles && Array.isArray(roles)) {
    isADMIN = roles.includes("ADMIN");
  }

  return (
    <div>
      {isADMIN && (
        <div className="flex justify-center sm:justify-end sm:mr-8 my-8">
          <Link to="upload" className="btn btn-sm btn-primary">
            <span>Upload</span>
            <LuUpload className="w-4 h-4" />
          </Link>
        </div>
      )}
      <SearchOnly name="content" link="/documents" />
      <DocumentList />
      <PaginationContainer />
    </div>
  );
};

export default Documents;

import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const PaginationContainer = () => {
  const { pagination } = useLoaderData();
  const { page, pageSize } = pagination;
  const navigate = useNavigate();
  const { search, pathname } = useLocation();

  const pages = Array.from({ length: pageSize }, (_, index) => {
    return index + 1;
  });

  const handlePageChange = (pageNum) => {
    const searchParam = new URLSearchParams(search);
    searchParam.set("page", pageNum);
    navigate(`${pathname}?${searchParam.toString()}`);
  };
  if (pageSize < 2) return null;
  return (
    <div className="mt-6 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs btn-secondary sm:btn-sm join-item"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageSize;

            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>
        {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              className={`btn btn-xs sm:btn-sm join-item border-none ${
                pageNumber === page ? "bg-base-300 border-base-300" : ""
              }`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          className="btn btn-xs btn-primary sm:btn-sm join-item"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageSize) nextPage = 1;

            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationContainer;

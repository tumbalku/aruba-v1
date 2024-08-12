import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const PagingContainer = () => {
  const { paging } = useLoaderData();
  const { page, pageSize } = paging;
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
          className="btn btn-xs sm:btn-md join-item"
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
              className={`btn btn-xs sm:btn-md join-item border-none ${
                pageNumber === page ? "bg-base-300 border-base-300" : ""
              }`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          className="btn btn-xs sm:btn-md join-item"
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

export default PagingContainer;

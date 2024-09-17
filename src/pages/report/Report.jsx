import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const Report = ({ report }) => {
  // const { report } = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    BESAR = 0,
    IZIN = 0,
    SAKIT = 0,
    TAHUNAN = 0,
    BERSALIN = 0,
    KARENA_ALASAN_PENTING = 0,
  } = report || {};

  const handleTypeChange = (newType) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("type", newType);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2 my-1">
      <button
        className="btn btn-sm btn-neutral"
        onClick={() => handleTypeChange("BESAR")}
      >
        Besar
        <div className="badge badge-primary">{BESAR}</div>
      </button>

      <button
        className="btn btn-sm btn-neutral"
        onClick={() => handleTypeChange("IZIN")}
      >
        Izin
        <div className="badge badge-primary">{IZIN}</div>
      </button>

      <button
        className="btn btn-sm btn-neutral"
        onClick={() => handleTypeChange("SAKIT")}
      >
        Sakit
        <div className="badge badge-primary">{SAKIT}</div>
      </button>

      <button
        className="btn btn-sm btn-neutral"
        onClick={() => handleTypeChange("KARENA_ALASAN_PENTING")}
      >
        Penting
        <div className="badge badge-primary">{KARENA_ALASAN_PENTING}</div>
      </button>

      <button
        className="btn btn-sm btn-neutral"
        onClick={() => handleTypeChange("BERSALIN")}
      >
        Bersalin
        <div className="badge badge-primary">{BERSALIN}</div>
      </button>

      <button
        className="btn btn-sm btn-neutral"
        onClick={() => handleTypeChange("TAHUNAN")}
      >
        Tahunan
        <div className="badge badge-primary">{TAHUNAN}</div>
      </button>
    </div>
  );
};

export default Report;

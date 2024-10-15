import { Link, useLocation } from "react-router-dom";

const PrevLinks = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(
    (path) =>
      path &&
      path !== "edit" &&
      path !== "password" &&
      path !== "view" &&
      // path !== "create" &&
      path !== "kop" &&
      path !== "user" &&
      path !== "public" &&
      path !== "report"
  );

  const pathNames = {
    "": "Beranda",
    letters: "Surat",
    detail: "Detil",
    activity: "Aktifitas",
    profile: "Profil",
    users: "Pengguna",
  };

  if (paths.length <= 1) {
    return <div className="p-6"></div>;
  }
  return (
    <div className="text-sm breadcrumbs mb-4">
      <ul>
        <li>
          <Link to="/" className="text-xs">
            Beranda
          </Link>
        </li>
        {paths.slice(0, -1).map((path, index) => {
          const to = `/${paths.slice(0, index + 1).join("/")}`;
          return (
            <li key={to}>
              <Link to={to} className="capitalize text-xs">
                {pathNames[path] || path}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PrevLinks;

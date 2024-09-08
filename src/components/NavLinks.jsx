import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const links = [
  { id: 1, url: "/", text: "beranda" },
  { id: 2, url: "news", text: "info" },
  { id: 3, url: "letters", text: "surat", role: "ADMIN" },
  { id: 4, url: "posts", text: "post", role: "ADMIN" },
  { id: 5, url: "about", text: "tentang" },
  { id: 6, url: "users", text: "pengguna", role: "ADMIN" },
  { id: 7, url: "documents", text: "Dokumen", role: "ADMIN" },
  { id: 8, url: "exp", text: "experiment" },
];

const NavLinks = () => {
  const baseState = useSelector((state) => state.userState);

  return (
    <>
      {links.map((link) => {
        const { id, url, text, role } = link;

        if (role) {
          if (!baseState || !baseState.roles.includes(role)) {
            return null;
          }
        }
        return (
          <li key={id}>
            <NavLink to={url} className="capitalize">
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};

export default NavLinks;

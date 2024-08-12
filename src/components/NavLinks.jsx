import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const links = [
  { id: 1, url: "/", text: "beranda" },
  { id: 2, url: "letters", text: "surat" },
  { id: 3, url: "about", text: "tentang" },
  { id: 4, url: "contact", text: "kontak" },
  { id: 5, url: "users", text: "pengguna", role: "ADMIN" },
  { id: 7, url: "documents", text: "Dokumen", role: "ADMIN" },
  { id: 6, url: "exp", text: "experiment" },
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

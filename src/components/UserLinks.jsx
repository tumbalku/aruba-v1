import { NavLink } from "react-router-dom";

const links = [
  { id: 1, url: "profile", text: "Profil" },
  { id: 2, url: "my-cuti", text: "Cuti" },
  { id: 3, url: "my-control-book", text: "Buku kontrol" },
];

const UserLinks = () => {
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
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

export default UserLinks;

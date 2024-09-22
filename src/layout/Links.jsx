import { CgBandAid } from "react-icons/cg";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoAlbumsOutline } from "react-icons/io5";
import { BiSolidUserDetail } from "react-icons/bi";
import { LiaKeySolid } from "react-icons/lia";

export const cutiLinks = [
  { name: "Cuti", url: "/cuti", icon: <CgBandAid /> },
  { name: "Kop", url: "kop", icon: <IoAlbumsOutline /> },
  { name: "Report", url: "report", icon: <HiOutlineDocumentReport /> },
  { name: "Permohonan", url: "decision", icon: <HiOutlineDocumentReport /> },
];

export const profileLinks = [
  { name: "Info", url: "/profile", icon: <BiSolidUserDetail /> },
  { name: "Ubah password", url: "password", icon: <LiaKeySolid /> },
];

export const postsLinks = [
  { name: "Data", url: "/posts", icon: <BiSolidUserDetail /> },
];

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import profile from "/image/single.png";
import {
  calculateDaysBetween,
  customFetch,
  dateToFormat,
  getImage,
} from "../../../utils";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { HiOutlineDocumentSearch } from "react-icons/hi";

import SectionTitle from "../../../components/SectionTitle";
import { checkCutiStatus } from "../../../data";
import StatusBadge from "../../../components/StatusBadge";
import CutiStatusBadge from "./CutiStatusBadge";
import Swal from "sweetalert2";

const UserCutiDecisionList = () => {
  const navigate = useNavigate();

  const { roles, user } = useSelector((state) => state.userState);
  const { cuti } = useLoaderData();

  const [cutis, setCutis] = useState(cuti);
  const [userImages, setUserImages] = useState({});
  console.log(cutis);

  const isAdmin = roles.includes("ADMIN");

  async function handleDelete(id) {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak akan bisa mengembalikan cuti ini apabila sudah terlanjur dihapus.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await customFetch.delete(`/cuti/${id}`, {
            headers: {
              "X-API-TOKEN": `${user.token}`,
            },
          });
          setCutis(cutis.filter((cuti) => cuti.id !== id));
          Swal.fire({
            title: "Berhasil menghapus Cuti",
            text: response.data.message,
            icon: "success",
          });
        } catch (error) {
          return errorHandleForFunction(error, navigate);
        }
      }
    });
  }

  // getImage
  async function getAvatar(avatar) {
    try {
      const response = await getImage(avatar);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchUserImages = async () => {
      const images = {};
      for (const person of cutis) {
        const { avatar, id } = person.user;
        if (avatar) {
          try {
            const imageUrl = await getAvatar(avatar);
            images[id] = imageUrl;
          } catch (error) {
            console.log(`Error fetching avatar for ${id}: ${error.message}`);
          }
        }
      }
      setUserImages(images);
    };

    fetchUserImages();
  }, []);

  if (cutis.length < 1) {
    return <SectionTitle text="Kami tidak menemukan hasil pencarian anda" />;
  }

  return (
    <div className="overflow-x-auto mt-12 mb-8">
      <table className="table table-xs">
        <thead>
          <tr className="text-center">
            <th className="text-left">No</th>
            <th className="text-left">Nama</th>
            <th>Tipe</th>
            <th>Unit Kerja</th>
            <th>Dari Tanggal</th>
            <th>Sampai Tanggal</th>
            <th>Total Hari</th>

            <th>Status Permohonan</th>
            <th>Action</th>
          </tr>
        </thead>
        {/* ada masalah pada whitespace-nowrap */}
        <tbody className="text-nowrap text-center">
          {cutis.map(
            ({ dateStart, dateEnd, id, kop, number, status, user: owner }) => {
              return (
                <tr key={id}>
                  <th>{number}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-10 w-10 md:h-12 md:w-12">
                          <img
                            src={userImages[owner.id] || profile}
                            alt={owner.name}
                          />
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="font-bold">{owner.name}</div>
                        <div className="text-xs opacity-50">
                          {owner.nip || owner.phone || owner.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{kop.name}</td>
                  <td className="max-w-52 truncate">{owner.workUnit}</td>
                  <td>{dateToFormat(dateStart)}</td>
                  <td>{dateToFormat(dateEnd)}</td>
                  <td>{calculateDaysBetween(dateStart, dateEnd)}</td>
                  <td>
                    <CutiStatusBadge status={status} />
                  </td>
                  <td>
                    <div className="flex justify-evenly gap-1">
                      <Link
                        to={`/cuti/decision/${id}`}
                        className="btn btn-info btn-xs"
                      >
                        <HiOutlineDocumentSearch />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserCutiDecisionList;

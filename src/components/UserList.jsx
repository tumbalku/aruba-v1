import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import profile from "/image/single.png";
import { customFetch, getImage, translateGender } from "../utils";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import SectionTitle from "./SectionTitle";
import Swal from "sweetalert2";
import { errorHandleForFunction } from "../utils/exception";
import { toast } from "react-toastify";

const UserList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roles, user } = useSelector((state) => state.userState);
  const { users: initialUsers } = useLoaderData();
  const [users, setUsers] = useState(initialUsers);
  const [userImages, setUserImages] = useState({});

  console.log(users);
  const isAdmin = roles.includes("ADMIN");

  async function handleDelete(id) {
    // Tampilkan konfirmasi penghapusan menggunakan SweetAlert
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data ini kemungkinan berhubungan dengan data lain. Anda tidak akan bisa mengembalikan data ini apabila sudah terlanjur dihapus.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Menghapus data menggunakan customFetch
          const response = await customFetch.delete(`/users/${id}`, {
            headers: {
              "X-API-TOKEN": user.token,
            },
          });

          // Memperbarui state users setelah data berhasil dihapus
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

          // Mengarahkan pengguna jika terdapat query parameter tertentu
          const queryParams = new URLSearchParams(location.search);
          if (queryParams.has("identity")) {
            navigate("/users");
          }

          // Tampilkan notifikasi berhasil setelah penghapusan
          Swal.fire({
            title: "Berhasil menghapus pengguna",
            text: "Data pengguna telah dihapus.",
            icon: "success",
          });

          console.log(response);
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

      for (const person of users) {
        const { avatar, id } = person;
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

  async function handlePriority(id, isChecked) {
    try {
      let response;
      if (isChecked) {
        response = await customFetch.patch(
          "/users/priority/" + id,
          { priority: 1 },
          {
            headers: {
              "X-API-TOKEN": user.token,
            },
          }
        );
      } else {
        response = await customFetch.patch(
          "/users/priority/" + id,
          { priority: 0 },
          {
            headers: {
              "X-API-TOKEN": user.token,
            },
          }
        );
      }
      toast.success(response?.data?.message || "update okk");
    } catch (error) {
      console.error("Error updating priority:", error);
    }
  }

  if (users.length < 1) {
    return <SectionTitle text="Kami tidak menemukan hasil pencarian anda" />;
  }
  return (
    <div className="overflow-x-auto mt-8">
      <table className="table table-xs">
        {/* head */}
        <thead>
          <tr className="text-center">
            <th>Pin</th>
            <th>Nama</th>
            <th>Jenis Kelamin</th>
            <th>Peran</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {users &&
            users.map((user) => {
              const { id, name, gender, status, roles, priority, workUnit } =
                user;
              return (
                <tr key={id}>
                  <th>
                    <label className="flex justify-center items-center">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        defaultChecked={priority}
                        onChange={(e) => handlePriority(id, e.target.checked)}
                      />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={userImages[id] || profile} alt={name} />
                          {/* <img src={profile} alt={name} /> */}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold capitalize">{name}</div>
                        <div className="text-sm opacity-50">
                          {workUnit || "-"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="capitalize text-center">
                      {translateGender(gender)}
                    </p>
                  </td>
                  <td>
                    <div className="flex flex-col gap-y-1 items-center">
                      {roles.map((role) => {
                        return (
                          <span
                            key={role}
                            className="capitalize badge badge-ghost badge-sm"
                          >
                            {role}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="text-center ">
                    {status ? (
                      <div className="badge badge-success">Aktif</div>
                    ) : (
                      <div className="badge badge-warning">Nonaktif</div>
                    )}
                  </td>
                  <td>
                    <div className="flex justify-evenly gap-1">
                      <Link to={`${id}`} className="btn btn-info btn-xs">
                        <div className="lg:tooltip" data-tip="Detail">
                          <HiOutlineDocumentSearch />
                        </div>
                      </Link>
                      {isAdmin && (
                        <>
                          <Link
                            to={`edit/${id}`}
                            className="btn btn-warning btn-xs"
                          >
                            <div className="lg:tooltip" data-tip="Edit">
                              <AiOutlineEdit />
                            </div>
                          </Link>

                          <button
                            onClick={() => handleDelete(id)}
                            className="btn btn-error btn-xs"
                          >
                            <div className="lg:tooltip" data-tip="Hapus">
                              <AiOutlineDelete />
                            </div>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

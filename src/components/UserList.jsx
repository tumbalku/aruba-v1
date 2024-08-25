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
import { toast } from "react-toastify";
import SectionTitle from "./SectionTitle";

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
    try {
      const response = await customFetch.delete(`/users/${id}`, {
        headers: {
          "X-API-TOKEN": `${user.token}`,
        },
      });
      const msg = response.data.message;
      toast.success(msg || "Success delete");
      console.log(location.search);
      setUsers(users.filter((user) => user.id !== id));
      const queryParams = new URLSearchParams(location.search);
      if (queryParams.has("identity")) {
        navigate("/users");
      }

      console.log(response);
    } catch (error) {
      const msg = error.response.data.message;
      toast.error(msg || "Something error with the operation");
      console.log(error);
    }
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

  if (users.length < 1) {
    return <SectionTitle text="Kami tidak menemukan hasil pencarian anda" />;
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

  return (
    <div className="overflow-x-auto mt-8">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="text-center">
            <th>Nama</th>
            <th>Jenis Kelamin</th>
            {/* <th>Peran</th> */}
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {users &&
            users.map((user) => {
              const { id, name, gender, status, roles } = user;
              return (
                <tr key={id}>
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
                        <div className="text-sm opacity-50">{id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="capitalize text-center">
                      {translateGender(gender)}
                    </p>
                  </td>
                  {/* <td>
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
                  </td> */}
                  <td className="text-center ">
                    {status ? (
                      <div className="badge badge-success">Aktif</div>
                    ) : (
                      <div className="badge badge-warning">Nonaktif</div>
                    )}
                  </td>
                  <td>
                    <div className="flex justify-evenly gap-1">
                      <Link to={`${id}`} className="btn btn-info btn-sm">
                        <HiOutlineDocumentSearch />
                      </Link>
                      {isAdmin && (
                        <>
                          <Link
                            to={`edit/${id}`}
                            className="btn btn-warning btn-sm"
                          >
                            <AiOutlineEdit />
                          </Link>

                          <button
                            onClick={() => handleDelete(id)}
                            className="btn btn-error btn-sm"
                          >
                            <AiOutlineDelete />
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

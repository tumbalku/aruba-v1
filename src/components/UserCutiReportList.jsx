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

const UserCutiReportList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roles, user } = useSelector((state) => state.userState);
  const { users: initialUsers } = useLoaderData();
  const [users, setUsers] = useState(initialUsers);
  const [userImages, setUserImages] = useState({});

  // const isAdmin = roles.includes("ADMIN");
  const isAdmin = true;

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
    <div>
      <div className="overflow-x-auto">
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
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap text-center">
            <tr>
              <th>1</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-10 w-10 md:h-12 md:w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="font-bold">Bilal</div>
                    <div className="text-xs opacity-50">Kendari</div>
                  </div>
                </div>
              </td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>12/16/2020</td>
              <td>12/16/2021</td>
              <td>10</td>
              <td>
                <div className="badge badge-success text-xs">Berlangsung</div>
              </td>
              <td>
                <div className="flex justify-evenly gap-1">
                  {/* <Link to={`${id}`} className="btn btn-info btn-xs"> */}
                  <Link className="btn btn-info btn-xs">
                    <HiOutlineDocumentSearch />
                  </Link>
                  {isAdmin && (
                    <>
                      <Link
                        // to={`edit/${id}`}
                        className="btn btn-warning btn-xs"
                      >
                        <AiOutlineEdit />
                      </Link>

                      <button
                        // onClick={() => handleDelete(id)}
                        className="btn btn-error btn-xs"
                      >
                        <AiOutlineDelete />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserCutiReportList;

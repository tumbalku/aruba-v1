import { useEffect, useState } from "react";
import profile from "/image/single.png";
import { customFetch, getImage } from "../../utils";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const PublicProfile = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function getUser() {
      try {
        const response = await customFetch(`/users/public/view/${id}`);
        setUser(response.data.data);
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Pengguna tidak ditemukan",
          text: "Kembali ke beranda",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      }
    }
    getUser();
  }, []);

  const [avatarImage, setAvatarImage] = useState("");
  async function getAvatar() {
    try {
      const response = await getImage(avatar);
      setAvatarImage(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAvatar();
  }, [user]);

  if (!user) {
    return <></>;
  }
  const { name, avatar, position } = user;

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col lg:flex-row gap-5 lg:w-[1024px] items-center justify-center">
        <div className="flex items-center justify-center">
          <div className="lg:h-[400px] lg:w-[400px] h-[250px] w-[250px]">
            <img
              src={avatarImage || profile}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="lg:text-4xl text-2xl font-bold">{name}</h1>
          <h4 className="lg:text-xl text-sm font-semibold">{position}</h4>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;

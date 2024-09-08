import { useEffect, useState } from "react";
import profile from "/image/single.png";
import logo from "/image/sultra.png";
import { getImage } from "../utils";

const UserInfoDetail = ({ name, nip, workUnit, id, address, avatar }) => {
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
  }, [avatar]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-1 items-center">
        <img
          src={logo}
          alt=""
          className="w-14 h-14 object-cover rounded-full"
        />

        <div className="flex-1 flex flex-col md:flex-row justify-between items-center">
          <h1 className="font-bold text-2xl text-center">
            {nip ? "Pegawai" : "Blud"} Bahteramas
          </h1>
          <p className="text-[10px]">{id}</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <img
            src={avatarImage || profile}
            alt="user-profile"
            className="w-24 h-24 object-cover rounded-xl"
          />

          <table className="text-xs md:text-sm">
            {nip && (
              <tr>
                <th className="text-left">NIP</th>
                <td className="px-2">:</td>
                <td>1111 2222 3333 4444 5555 6666</td>
              </tr>
            )}

            <tr>
              <th className="text-left">Nama</th>
              <td className="px-2">:</td>
              <td>{name}</td>
            </tr>
            <tr>
              <th className="text-left">Alamat</th>
              <td className="px-2">:</td>
              <td>{address}</td>
            </tr>
            <tr>
              <th className="text-nowrap text-left">Unit Kerja</th>
              <td className="px-2">:</td>
              <td>{workUnit}</td>
            </tr>
          </table>
        </div>
        <img
          src={profile}
          alt="user-profile"
          className="w-24 h-24 object-cover"
        />
      </div>
    </div>
  );
};

export default UserInfoDetail;

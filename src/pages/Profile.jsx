import profile from "/image/single.png";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { InputField, SectionInfo, UnmodifiedField } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { customFetch, getImage, translateGender } from "../utils";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { updateUserProfile } from "../features/user/userSlice";

const Profile = () => {
  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [avatarImage, setAvatarImage] = useState("");
  const {
    id,
    name,
    email,
    phone,
    gender,
    address,
    avatar,
    status,
    token,
    civilServant,
    createdAt,
    updatedAt,
  } = user;

  const handleExecute = async () => {
    const file = fileRef.current.files[0];
    if (!file) {
      toast.error("Please select an image file");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await customFetch.patch("/users/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-API-TOKEN": token,
        },
      });
      console.log(response);
      dispatch(updateUserProfile({ avatar: URL.createObjectURL(file) }));
      setAvatarImage(URL.createObjectURL(file));
      toast.success(response.data.message);
    } catch (error) {
      const msg =
        error.response?.data?.message || "Something error with your input";
      toast.error(msg);
    }
  };

  // getImage
  async function getAvatar() {
    try {
      const response = await getImage(avatar);
      setAvatarImage(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (avatar && !avatar.startsWith("blob:")) {
      getAvatar();
    }
  }, [avatar]);

  return (
    <>
      <SectionInfo title="General" info="Manajemen informasi akun anda" />
      <div className="my-5">
        <p className="text-xs mb-2 text-center">Profile picture</p>
        <div className="flex items-center justify-center space-x-4">
          <img
            className="rounded-full w-24 h-24 object-cover"
            src={
              avatar
                ? avatar.startsWith("blob:")
                  ? avatar
                  : avatarImage
                : profile
            }
            alt="profile"
          />
          <input
            type="file"
            ref={fileRef}
            accept="image/*"
            className="hidden"
            onChange={handleExecute}
          />
          <button
            className="btn btn-xs sm:btn-sm btn-primary"
            onClick={() => fileRef.current.click()}
          >
            Upload
          </button>
        </div>
      </div>

      <div className="text-right mb-8">
        <button className="btn btn-xs sm:btn-sm btn-primary mb-1">
          <AiOutlineEdit className="w-5 h-5" />
          Update
        </button>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <UnmodifiedField value={name} label="Nama" />
        <UnmodifiedField value={id} label="NIP" />

        <InputField label="Email" type="email" value={email} name="email" />
        <InputField label="No. Hp" type="text" value={phone} name="phone" />

        <UnmodifiedField
          value={translateGender(gender)}
          label="Jenis Kelamin"
        />
        <UnmodifiedField value={status} label="Status Kepegawaian" />
        <div className="lg:col-span-2">
          <UnmodifiedField value={address} label="Alamat" />
        </div>
      </div>
    </>
  );
};

export default Profile;

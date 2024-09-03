import profile from "/image/single.png";
import { AiOutlineEdit } from "react-icons/ai";
import { InputField, SectionInfo, UnmodifiedField } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { customFetch, getImage, translateGender } from "../utils";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { updateUser, updateUserProfile } from "../features/user/userSlice";
import { Form, redirect } from "react-router-dom";

export const action =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const response = await customFetch.patch("/users/info", data, {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });

      toast.success(response.data.message || "Success");
      store.dispatch(updateUser(data));
      return null;
    } catch (error) {
      toast.error(error.response.data.message || "Terjadi error");

      return null;
    }
  };

const Profile = () => {
  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [avatarImage, setAvatarImage] = useState("");
  const {
    id,
    username,
    nip,
    name,
    email,
    phone,
    gender,
    address,
    avatar,
    status,
    workUnit,
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
          "X-API-TOKEN": user.token,
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
      console.log(error);
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
      <SectionInfo
        title="General"
        info="Manajemen informasi akun anda"
        border
      />
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
            className="small-btn btn-primary"
            onClick={() => fileRef.current.click()}
          >
            Upload
          </button>
        </div>
      </div>

      <Form method="POST">
        <div className="grid lg:grid-cols-2 gap-4">
          <InputField
            label="username"
            type="text"
            value={username ? username : ""}
            name="username"
          />
          <UnmodifiedField value={name} label="Nama" />
          {nip ? <UnmodifiedField value={nip} label="NIP" /> : null}

          <InputField
            label="Email"
            type="email"
            value={email ? email : ""}
            name="email"
          />
          <InputField
            label="No. Hp"
            type="text"
            value={phone ? phone : ""}
            name="phone"
          />

          <UnmodifiedField
            value={translateGender(gender)}
            label="Jenis Kelamin"
          />
          <UnmodifiedField value={status} label="Status Kepegawaian" />

          <UnmodifiedField value={address} label="Alamat" />
          <UnmodifiedField value={workUnit} label="Unit kerja" />
        </div>
        <div className="text-right my-4">
          <button type="submit" className="small-btn btn-primary mb-1">
            <AiOutlineEdit className="w-5 h-5" />
            Update
          </button>
        </div>
      </Form>
    </>
  );
};

export default Profile;

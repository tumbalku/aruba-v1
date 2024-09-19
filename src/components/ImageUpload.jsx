import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../utils/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa6";
import { addImage, clearImage } from "../features/user/tempSlice";

const ImageUpload = ({ imageUrl = "" }) => {
  const dispatch = useDispatch();
  const [fileImg, setFileImg] = useState(null);
  const [image, setImage] = useState(imageUrl);
  const [uploading, setUploading] = useState(false);

  const handleImagesSubmit = async () => {
    if (!fileImg) {
      toast.error("Choose an image first, before you add it");
    } else {
      setUploading(true);
      try {
        const resUrl = await storeImage(fileImg);
        console.log(resUrl);
        dispatch(addImage(resUrl));
        setImage(resUrl);
      } catch (error) {
        toast.error("Failed to upload image. Please try again.");
      } finally {
        setUploading(false);
      }
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  function removeImage() {
    dispatch(clearImage());
    setImage("");
  }

  return (
    <>
      <div className="flex flex-row items-end justify-between ">
        <div>
          <p className="text-xs p-2">Post Image</p>
          <input
            onChange={(e) => setFileImg(e.target.files[0])}
            type="file"
            name="image"
            id="image"
            multiple
            accept="image/*"
            className="file-input w-full max-w-xs file-input-xs sm:file-input-sm"
          />
        </div>
        <button
          className="btn btn-success btn-sm"
          onClick={handleImagesSubmit}
          disabled={uploading || !fileImg}
        >
          {uploading ? (
            <span className="loading loading-ring loading-xs"></span>
          ) : (
            <FaPlus />
          )}
        </button>
      </div>
      <div className="bg-slate-400 h-[250px] flex items-center justify-center rounded-lg relative">
        {!image ? (
          <p className="text-xs">image prev here</p>
        ) : (
          <>
            <img
              src={image}
              alt=""
              className="object-cover w-full h-full rounded-lg"
            />
            <button
              className="btn btn-circle btn-xs btn-error absolute right-[-12px] z-10"
              onClick={removeImage}
            >
              X
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default ImageUpload;

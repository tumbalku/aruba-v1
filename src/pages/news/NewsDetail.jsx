import { useLoaderData } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import {
  convertDateArrayToString,
  convertLocalDateTimeToDate,
  customFetch,
  getImage,
} from "../../utils";
import profile from "/image/single.png";
import DOMPurify from "dompurify";
import moment from "moment";
import {
  errorHandleForAction,
  errorHandleForFunction,
} from "../../utils/exception";
import { Link, useNavigate } from "react-router-dom/dist";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const loader = async ({ params }) => {
  try {
    const response = await customFetch(`posts/${params.id}`);

    return { news: response.data.data };
  } catch (error) {
    return errorHandleForAction(error, "toastify");
  }
};
const NewsDetail = () => {
  const navigate = useNavigate();
  const { news } = useLoaderData();
  const { roles, user } = useSelector((state) => state.userState);
  const isAdmin = roles.includes("ADMIN");
  const { title, createdAt, updatedAt, imageUrl, author, content, id, avatar } =
    news;
  const [avatarImage, setAvatarImage] = useState(avatar);

  async function handleDelete() {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak akan bisa mengembalikan postingan ini apabila sudah terlanjur dihapus.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await customFetch.delete(`/posts/${id}`, {
            headers: {
              "X-API-TOKEN": user.token,
            },
          });

          Swal.fire({
            title: "Berhasil menghapus postingan",
            text: "Data postingan telah dihapus.",
            icon: "success",
          });

          navigate("/news");
        } catch (error) {
          return errorHandleForFunction(error, navigate);
        }
      }
    });
  }

  async function getAvatar() {
    try {
      const response = await getImage(avatar);
      setAvatarImage(response);
    } catch (error) {
      console.log(error);
      // nothing
    }
  }

  useEffect(() => {
    getAvatar();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-2xl sm:text-3xl tracking-tight">{title}</h1>
      <div className="flex flex-col md:flex-row gap-2">
        <p>
          <span className="badge badge-primary badge-sm font-semibold">
            Publish: {convertDateArrayToString(createdAt)}
          </span>
        </p>
        {createdAt[2] !== updatedAt[2] && (
          <p>
            <span className="badge badge-secondary badge-sm font-semibold">
              Update: {convertDateArrayToString(updatedAt)}
            </span>
          </p>
        )}
      </div>
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-96 object-cover" />
      )}
      <div className="flex flex-row gap-2 items-center">
        <img
          src={avatarImage ? avatarImage : profile}
          alt={author}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <p className="font-semibold mb-1">{author}</p>
          <p className="text-xs">
            Post: {moment(convertLocalDateTimeToDate(createdAt)).fromNow()}
          </p>
        </div>
        {isAdmin && (
          <>
            <div className="flex gap-2">
              <Link
                to={`/news/edit/${id}`}
                className="btn btn-warning btn-circle btn-sm"
              >
                <AiOutlineEdit />
              </Link>
              <button
                onClick={handleDelete}
                className="btn btn-error btn-circle btn-sm"
              >
                <AiOutlineDelete />
              </button>
            </div>
          </>
        )}
      </div>
      <div
        className="prose w-full max-w-none leading-relaxed content"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content, {
            ADD_TAGS: ["iframe"],
            ADD_ATTR: ["allowfullscreen", "frameborder", "src", "className"],
          }),
        }}
      ></div>
    </div>
  );
};

export default NewsDetail;

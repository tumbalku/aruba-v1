import { useState } from "react";
import {
  convertLocalDateTimeToDate,
  customFetch,
  dateToFormat,
} from "../../utils";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import tempImg from "/image/hero1.jpg";
import moment from "moment";
import Swal from "sweetalert2";
import { errorHandleForFunction } from "../../utils/exception";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const PostList = () => {
  const { posts } = useLoaderData();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userState);

  const [postList, setPostList] = useState(posts);

  async function handleDelete(id) {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak akan bisa mengembalikan postingan ini apabila sudah terlanjur dihapus.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
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
            text: response.data?.message || "Oke",
            icon: "success",
          });
          setPostList((prevPosts) =>
            prevPosts.filter((post) => post.id !== id)
          );
        } catch (error) {
          return errorHandleForFunction(error, navigate);
        }
      }
    });
  }

  async function handlePriority(id, isChecked) {
    try {
      let response;
      if (isChecked) {
        response = await customFetch.patch(
          "/posts/priority/" + id,
          { priority: 1 },
          {
            headers: {
              "X-API-TOKEN": user.token,
            },
          }
        );
      } else {
        response = await customFetch.patch(
          "/posts/priority/" + id,
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

  if (postList.length < 1) {
    return <h1 className="text-center mt-24">Post belum di buat!</h1>;
  }

  return (
    <div className="mt-12 mb-8">
      <div className="overflow-x-auto">
        <table className="table table-xs table-zebra text-center">
          {/* head */}
          <thead>
            <tr>
              <th>Pin</th>
              <th>Title</th>
              <th>CreatedBy</th>
              <th>CreatedAt</th>
              <th>UpdatedAt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-nowrap">
            {postList &&
              postList.map((post) => {
                const {
                  id,
                  title,
                  imageUrl,
                  user: owner,
                  createdAt,
                  updatedAt,
                  priority,
                } = post;
                return (
                  <tr key={id}>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          defaultChecked={priority}
                          onChange={(e) => handlePriority(id, e.target.checked)}
                        />
                      </label>
                    </th>
                    <td>
                      <Link
                        to={`/news/${id}`}
                        className="flex items-center gap-3"
                      >
                        <img
                          src={imageUrl ? imageUrl : tempImg}
                          alt="Avatar Tailwind CSS Component"
                          className="w-16 h-16 object-cover"
                        />

                        <div className="text-xs sm:text-sm max-w-96 font-semibold truncate">
                          {title}
                        </div>
                      </Link>
                    </td>
                    <td>
                      {owner.name}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        {moment(
                          convertLocalDateTimeToDate(createdAt)
                        ).fromNow()}
                      </span>
                    </td>
                    <td>{dateToFormat(createdAt)}</td>
                    <td>{dateToFormat(updatedAt)}</td>
                    <td>
                      <div className="flex justify-evenly gap-1">
                        <Link
                          to={`/news/${id}`}
                          className="btn btn-info btn-xs"
                        >
                          <HiOutlineDocumentSearch />
                        </Link>

                        <Link
                          to={`/news/edit/${id}`}
                          className="btn btn-warning btn-xs"
                        >
                          <AiOutlineEdit />
                        </Link>

                        <button
                          onClick={() => handleDelete(id)}
                          className="btn btn-error btn-xs"
                        >
                          <AiOutlineDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostList;

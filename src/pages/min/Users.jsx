import React from "react";
import { PaginationContainer, SearchOnly, UserList } from "../../components";

import { toast } from "react-toastify";
import { Link, redirect } from "react-router-dom";
import { customFetch } from "../../utils";
import { useSelector } from "react-redux";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

export const loader =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      const response = await customFetch.get("/users/search", {
        params,
        headers: {
          "X-API-TOKEN": `${user.token}`,
        },
      });

      return {
        users: response.data.data,
        pagination: response.data.pagination,
      };
    } catch (error) {
      console.log(error);
      toast.warn("Terjadi error!");
      return redirect("/login");
    }
  };
const Users = () => {
  const roles = useSelector((state) => state.userState.roles);

  const isAdmin = roles.includes("ADMIN");
  return (
    <section>
      {isAdmin && (
        <div className="flex justify-center md:justify-end md:mr-8 my-8">
          <Link to="create" className="btn btn-sm btn-primary">
            <span>Tambahkan pengguna</span>
            <AiOutlineUsergroupAdd className="font-bold" />
          </Link>
        </div>
      )}

      <SearchOnly name="identity" link="/users" />
      <UserList />
      <PaginationContainer />
    </section>
  );
};

export default Users;

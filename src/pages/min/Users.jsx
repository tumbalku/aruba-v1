import React from "react";
import {
  Loading,
  PaginationContainer,
  SearchOnly,
  UserList,
} from "../../components";

import { Link, redirect, useNavigation } from "react-router-dom";
import { customFetch } from "../../utils";
import { useSelector } from "react-redux";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { errorHandleForAction } from "../../utils/exception";

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
      return errorHandleForAction(error);
    }
  };
const Users = () => {
  const roles = useSelector((state) => state.userState.roles);
  const isAdmin = roles.includes("ADMIN");
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

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
      {isLoading ? <Loading /> : <UserList />}

      <PaginationContainer />
    </section>
  );
};

export default Users;

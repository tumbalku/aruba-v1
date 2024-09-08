import React from "react";
import { customFetch } from "../../utils";
import { useLoaderData } from "react-router-dom";
import { UserInfoDetail } from "../../components";
export const loader =
  (store) =>
  async ({ params }) => {
    const user = store.getState().userState.user;

    try {
      const response = await customFetch(`users/${params.id}`, {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });

      return { userDetail: response.data.data };
    } catch (error) {
      console.log(error);
      return null;
    }
  };
const UserDetail = () => {
  const { userDetail } = useLoaderData();
  return (
    <div>
      <UserInfoDetail {...userDetail} />
    </div>
  );
};

export default UserDetail;

import React from "react";
import { customFetch } from "../../utils";
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
  return <div>UserDetail</div>;
};

export default UserDetail;

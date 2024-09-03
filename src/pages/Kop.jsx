import React from "react";
import { KopData } from "../components";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";

export const loader = (store) => async () => {
  const user = store.getState().userState.user;

  try {
    const response = await customFetch.get("/kops", {
      headers: {
        "X-API-TOKEN": `${user.token}`,
      },
    });

    return {
      kops: response.data.data,
    };
  } catch (error) {
    console.log(error);
    toast.warn("Terjadi error!");
    return null;
  }
};
export const action =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const id = data.id;
    try {
      const response = await customFetch.patch(`/kops/${id}`, data, {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });

      toast.success(response.data.message || "Success");

      return null;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Terjadi error");

      return null;
    }
  };
const Kop = () => {
  const { kops } = useLoaderData();

  return (
    <div>
      {/* <UserCutiReportList /> */}
      {kops.map(({ id, name, romawi, year, uniKop }) => (
        <div key={id} className="mb-6">
          <KopData
            id={id}
            name={name}
            nomor={uniKop}
            romawi={romawi}
            year={year}
          />
        </div>
      ))}
    </div>
  );
};
export default Kop;

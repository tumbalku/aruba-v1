import { toast } from "react-toastify";
import CutiList from "../../components/CutiList";
import { customFetch, isAuthenticate } from "../../utils";

// loader
export const loader =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;

    try {
      const response = await customFetch("cuti/current", {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });

      return {
        cutis: response.data.data,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

const MyCuti = () => {
  return (
    <>
      <CutiList />
    </>
  );
};

export default MyCuti;

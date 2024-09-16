import { toast } from "react-toastify";
import CutiList from "../../components/CutiList";
import { customFetch } from "../../utils";
import { errorHandleForAction } from "../../utils/exception";
import { Link } from "react-router-dom";
import { MdPostAdd } from "react-icons/md";

// loader
export const loader = (store) => async () => {
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
    return errorHandleForAction(error, "toastify");
  }
};

const MyCuti = () => {
  return (
    <div>
      <div className="flex md:justify-end justify-center mb-5">
        <Link to="create" className="btn btn-primary btn-sm">
          Buat Cuti <MdPostAdd className="w-5 h-5" />
        </Link>
      </div>
      <CutiList />
    </div>
  );
};

export default MyCuti;

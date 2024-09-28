import CutiList from "../../components/CutiList";
import { customFetch } from "../../utils";
import {
  errorHandleForAction,
  errorHandleForFunction,
} from "../../utils/exception";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { MdPostAdd } from "react-icons/md";
import { GrPrint } from "react-icons/gr";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";

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
  const user = useSelector((state) => state.userState.user);
  const [isDisabled, setIsDisabled] = useState(false);
  const handleDownloadBlanko = async () => {
    setIsDisabled(true);
    try {
      const response = await customFetch(`/cuti/download/blanko`, {
        responseType: "blob",
        headers: {
          "X-API-TOKEN": user.token,
        },
      });

      const blob = new Blob([response.data], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "kartu-kontrol.pdf";

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
    } catch (error) {
      toast.error("There something error for download this file!");
      setTimeout(() => {
        toast.error("Try again later");
      }, 2500);
    } finally {
      setTimeout(() => {
        setIsDisabled(false);
      }, 1 * 60 * 1000); // 5 menit
    }
  };
  const { cutis } = useLoaderData();
  return (
    <div>
      <div className="flex justify-center mb-5 gap-4">
        <Link to="create" className="btn btn-primary btn-sm">
          Buat Cuti <MdPostAdd className="w-5 h-5" />
        </Link>
        {cutis.length !== 0 && (
          <button
            onClick={handleDownloadBlanko}
            disabled={isDisabled}
            type="button"
            className="btn btn-secondary btn-sm"
          >
            Kartu Kontrol
            <GrPrint className="w-4 h-4" />
          </button>
        )}
      </div>
      <CutiList />
    </div>
  );
};

export default MyCuti;

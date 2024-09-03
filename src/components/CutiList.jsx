import { Link, useLoaderData } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import StatusBadge from "./StatusBadge";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import SectionTitle from "./SectionTitle";
import { useSelector } from "react-redux";
import { useState } from "react";
import { checkCutiStatus } from "../data";

const CutiList = () => {
  const { cutis: initialCutis } = useLoaderData();
  const { user } = useSelector((state) => state.userState);

  const [cutis, setCutis] = useState(initialCutis);
  console.log(cutis);

  // function
  async function handleDelete(id) {
    try {
      const response = await customFetch.delete(`/cuti/${id}`, {
        headers: {
          "X-API-TOKEN": `${user.token}`,
        },
      });
      const msg = response.data.message;
      toast.success(msg || "Success delete");
      console.log(location.search);
      setCutis(cutis.filter((user) => user.id !== id));

      console.log(response);
    } catch (error) {
      const msg = error.response.data.message;
      toast.error(msg || "Something error with the operation");
      console.log(error);
    }
  }

  if (cutis.length == 0) {
    return <SectionTitle text="Belum ada cuti yang diajukan" size="text-sm" />;
  }
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>type</th>
              <th>status</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {cutis.length > 0 &&
              cutis.map((cuti, index) => {
                const { id, kop, status, user, dateStart, dateEnd } = cuti;
                const name = user.name;
                const type = kop.name;
                return (
                  <tr key={id}>
                    <th>{index + 1}</th>
                    <td>{name}</td>
                    <td>{type}</td>
                    <td>
                      <StatusBadge
                        status={checkCutiStatus(dateStart, dateEnd)}
                      />
                    </td>
                    <td className="flex space-x-2">
                      {status !== "PENDING" && (
                        <Link
                          to={`/letters/cuti/${id}`}
                          className="btn btn-outline btn-sm btn-info"
                        >
                          <HiOutlineDocumentSearch />
                        </Link>
                      )}
                      {status === "PENDING" && (
                        <button
                          className="btn btn-outline btn-sm btn-error"
                          onClick={() => handleDelete(id)}
                        >
                          <AiOutlineDelete />
                        </button>
                      )}
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

export default CutiList;

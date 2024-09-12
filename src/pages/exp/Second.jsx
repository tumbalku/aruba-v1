import React from "react";
import SipStatusReportBadge from "../../components/SipStatusReportBadge";
import { convertDateArrayToString } from "../../utils";
import Swal from "sweetalert2";
const Second = () => {
  function handleClick() {
    Swal.fire({
      title: "Are you sure?",
      text: "Data ini kemungkinan berhubungan dengan data data yang lainnya. Anda tidak akan bisa mengembalikan data ini apabila sudah terlanjur dihapus",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Berhasil mengapus pengguna",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  }
  return (
    <div>
      <p>halo</p>
      <button onClick={handleClick}>Click mee</button>
    </div>
  );
};

export default Second;

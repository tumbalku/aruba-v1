import React from "react";
import { toast } from "react-toastify";

// export const loader = async ({ request }) => {
//   const params = Object.fromEntries([
//     ...new URL(request.url).searchParams.entries(),
//   ]);

//   if (params.id) {
//     try {
//       const response = await customFetch(`/cuti`, { params });

//       return { cuti: response.data.data };
//     } catch (error) {
//       const msg = error.response.data.message;

//       toast.error(msg || "Something error with your input");
//       return { cuti: undefined };
//     }
//   } else {
//     return { cuti: undefined };
//   }
// };
const CutiVerify = () => {
  return <div>CutiVerify</div>;
};

export default CutiVerify;

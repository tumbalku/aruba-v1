import React from "react";
import profile from "/image/single.png";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import {
  InputField,
  Kop,
  UnmodifiedField,
  UserCutiReportList,
} from "../components";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router-dom";

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
const Exp = () => {
  const { kops } = useLoaderData();
  console.log(kops);
  return (
    <div>
      {/* <UserCutiReportList /> */}
      {kops.map(({ id, type, romawi, year, uniKop }) => (
        <div key={id} className="mb-6">
          <Kop id={id} name={type} nomor={uniKop} romawi={romawi} year={year} />
        </div>
      ))}
    </div>
  );
};
export default Exp;

// const Exp = () => {
//   return (
//     <div className="grid grid-cols-12">
//       <div className="col-span-full sm:col-span-4 md:col-span-2 bg-green-300 p-5 flex sm:flex-col sm:space-y-2 justify-between sm:justify-normal">
//         <button className="btn btn-xs sm:btn-sm">General</button>
//         <button className="btn btn-xs sm:btn-sm">Ubah Password</button>
//         <button className="btn btn-xs sm:btn-sm">General</button>
//       </div>
//       <div className="col-span-full sm:col-span-8 md:col-span-10 p-4 bg-base-200">
//         <div className="border-b border-b-slate-200 pb-5">
//           <h1 className="text-2xl">General</h1>
//           <p className="text-xs text-slate-400">
//             Manajemen informasi akun anda
//           </p>
//         </div>
//         <div className="my-5">
//           <p className="text-xs mb-2">Profile picture</p>
//           <div className="flex items-center space-x-4">
//             <img
//               className="rounded-full w-24 h-24 object-cover"
//               src={profile}
//               alt="gambar"
//             />
//             <button className="btn btn-xs">Upload</button>
//             <button className="btn btn-xs btn-ghost">
//               <AiOutlineDelete className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         <div className="space-y-4">
//           <UnmodifiedField value="Muhammad Arsil Alhabsy" label="Nama" />
//           <UnmodifiedField value="Laki-Laki" label="Jenis Kelamin" />
//           <UnmodifiedField value="Aktif" label="Status Kepegawaian" />
//           <div className="flex flex-row items-end">
//             <div className="flex-1">
//               <InputField
//                 label="email"
//                 type="email"
//                 value="simple@gmail.com"
//                 name="email"
//               />
//             </div>

//             <button className="btn btn-sm btn-ghost mb-1">
//               <AiOutlineEdit className="w-5 h-5" />
//               Update
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

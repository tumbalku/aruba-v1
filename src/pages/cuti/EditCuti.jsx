import { Form, redirect, useLoaderData } from "react-router-dom";
import {
  DateInput,
  FormCheckbox,
  FormInput,
  FormTextArea,
  SelectInput,
  SelectInputForId,
  SubmitButton,
} from "../../components";
import { toast } from "react-toastify";
import { arrayToDate, customFetch, isAuthenticate } from "../../utils";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import { signedBy } from "../../data";
export const action =
  (store) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const user = store.getState().userState.user;
    const tembusan = JSON.parse(data.tembusan);

    data.people = tembusan;
    console.log(data);

    try {
      const response = await customFetch.patch(`/cuti/${params.id}`, data, {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });

      toast.success(response.data.message || "Update cuti");
      // window.open(urlToWa, "_blank");
      return null;
    } catch (error) {
      if (error) {
        toast.error(error.response.data.message);
        return null;
      }
    }
  };
export const loader =
  (store) =>
  async ({ params }) => {
    const user = store.getState().userState.user;

    try {
      const [cutiDetail, resKopList] = await Promise.all([
        customFetch.get(`/cuti/${params.id}`, {
          headers: {
            "X-API-TOKEN": `${user.token}`,
          },
        }),
        customFetch.get(`/kops`),
      ]);

      return {
        cuti: cutiDetail.data.data,
        kops: resKopList.data.data,
      };
    } catch (error) {
      console.log(error);
      toast.warn("Terjadi error!");
      return null;
    }
  };

const EditCuti = () => {
  const [name, setName] = useState("");

  const { kops, cuti } = useLoaderData();
  const [tembusan, setTembusan] = useState(cuti.people);

  const handleAdd = (e) => {
    e.preventDefault();

    if (!name) return;

    const updateTembusan = [...tembusan, name];
    setTembusan(updateTembusan);

    setName("");
  };

  const removeTembusan = (id) => {
    const updatedTembusan = tembusan.filter((_, index) => index !== id);
    setTembusan(updatedTembusan);
  };

  const {
    user: owner,
    kop,
    dateStart,
    dateEnd,
    signedBy: sign,
    number,
    address,
  } = cuti;

  return (
    <Form method="POST">
      <div className="grid grid-cols-4 gap-5 ">
        <div className="col-span-4 md:col-span-2">
          <FormInput
            name="user"
            label="User ID"
            size="input-sm"
            defaultValue={owner.id}
          />
        </div>
        <div className="col-span-4 md:col-span-2">
          <SelectInputForId
            name="kop"
            list={kops}
            defaultValue={kop.id}
            size="select-sm"
            label="Type"
          />
        </div>
        <div className="col-span-4 md:col-span-2">
          <FormInput name="phone" label="Whatsapp" size="input-sm" />
        </div>
        <div className="col-span-4 md:col-span-2">
          <FormInput
            name="number"
            label="nomor"
            size="input-sm"
            defaultValue={number}
          />
        </div>

        <div className="col-span-4 md:col-span-2">
          <DateInput
            label="Dari Tanggal"
            name="dateStart"
            size="date-sm"
            defaultValue={arrayToDate(dateStart)}
          />
        </div>
        <div className="col-span-4 md:col-span-2">
          <DateInput
            label="Sampai Tanggal"
            name="dateEnd"
            size="date-sm"
            defaultValue={arrayToDate(dateEnd)}
          />
        </div>
        <div className="col-span-4 md:col-span-2">
          <FormInput
            name="address"
            label="Alamat selama cuti"
            size="input-sm"
            defaultValue={address || owner.address}
          />
        </div>
        <div className="col-span-4 md:col-span-2">
          <SelectInput
            label="Akan ditandatanganni oleh:"
            list={signedBy}
            name="signedBy"
            size="select-sm"
            defaultValue={sign}
          />
        </div>
        <div className="col-span-4">
          <div className="form-control mb-6">
            <label htmlFor="tembusan" className="label">
              <span className="label-text capitalize ">tembusan</span>
            </label>

            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-10">
                <input
                  type="text"
                  className="input input-bordered input-sm w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="tembusan"
                  placeholder="Tambahkan tembusan"
                />
              </div>
              <div className="col-span-2 text-center">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleAdd}
                >
                  <FaPlus />
                  <span className="hidden lg:flex">Tambah</span>
                </button>
              </div>
            </div>
          </div>
          {tembusan &&
            tembusan.map((tem, index) => {
              return (
                <div key={index} className="mt-2 grid grid-cols-12 gap-2">
                  <div className="col-span-10">
                    <input
                      type="text"
                      className="input-sm w-full"
                      disabled
                      defaultValue={tem}
                    />
                  </div>
                  <div className="col-span-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeTembusan(index)}
                      className="btn btn-sm btn-error"
                    >
                      <AiOutlineDelete />
                      <span className="hidden lg:flex">hapus</span>
                    </button>
                  </div>
                </div>
              );
            })}

          <input
            type="hidden"
            name="tembusan"
            value={JSON.stringify(tembusan.map((t) => t))}
          />
        </div>
      </div>
      <div className="text-center md:text-right mt-5">
        <SubmitButton color="btn-primary" size="btn-sm" text="Update" />
      </div>
    </Form>
  );
};

export default EditCuti;

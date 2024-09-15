import { Form, useLoaderData } from "react-router-dom";
import {
  DateInput,
  FormCheckbox,
  FormInput,
  SelectInput,
  SelectInputForId,
  SubmitButton,
  UserInfoDetail,
} from "../../components";
import { toast } from "react-toastify";
import { customFetch, daysBetween } from "../../utils";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import { signedBy } from "../../data";
import { useDispatch, useSelector } from "react-redux";
import { clearChooseUser } from "../../features/user/tempSlice";
import SelectUser from "../min/SelectUser";
export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const user = store.getState().userState.user;
    const chooseUser = store.getState().tempState.chooseUser;

    console.log(chooseUser);
    data.people = JSON.parse(data.tembusan);
    data.kopData = JSON.parse(data.kopData || "{}");
    data.user = chooseUser.id;
    console.log(data);

    function formatPhoneNumber(phone) {
      if (!phone) return null;
      if (phone.startsWith("08")) {
        return phone.replace(/^0/, "62");
      }

      if (phone.startsWith("62")) {
        return phone;
      }

      toast.error("Whatsapp harus diawali 62.. atau 08..");
      return "invalid";
    }

    const { dateStart, dateEnd } = data;
    const dateCount = daysBetween(dateStart, dateEnd);
    console.log(dateCount);
    // const message = `
    //     *Permohonan ${kopName}*

    // Kepada Yth. Pimpinan SDM

    // Nama       : *${userName}*
    // Unit Kerja : *${workUnit}*

    // Pegawai dengan nama di atas bermaksud mengajukan cuti *${kopName}* selama *${dateCount}* hari, mulai tanggal *${dateStart}* hingga *${dateEnd}*.

    // Demikian permohonan ini diajukan. Atas perhatian dan kebijaksanaannya, kami ucapkan terima kasih.

    // Hormat saya,

    // *${userName}*
    // `.trim();

    const hp = formatPhoneNumber(data.phone);
    if (hp === "invalid") {
      return null;
    }

    const message = `ini pesan`.trim();
    const urlToWa = `https://wa.me/${hp}?text=${encodeURIComponent(message)}`;

    try {
      const response = await customFetch.post("/cuti", data, {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });
      console.log(response.data.message);
      toast.success(response.data.message || "Berhasil membuat cuti");
      if (hp) {
        window.open(urlToWa, "_blank");
      }
      store.dispatch(clearChooseUser());
      return null;
    } catch (error) {
      if (error) {
        toast.error(error.response.data.message);
        return null;
      }
    }
  };
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
const CreateCuti = () => {
  const dispatch = useDispatch();
  const date = new Date().toISOString().split("T")[0];
  const [name, setName] = useState("");
  const [tembusan, setTembusan] = useState([]);
  const [isWa, setIsWa] = useState(false);
  // const [isCurrentWa, setIsCurrentWa] = useState(false);
  const chooseUser = useSelector((state) => state?.tempState?.chooseUser);
  console.log(chooseUser);

  const { kops } = useLoaderData();

  const handleAdd = (e) => {
    e.preventDefault();

    if (!name) return;

    const fakeId = Date.now();

    const newTembusan = { id: fakeId, name };
    const updateTembusan = [...tembusan, newTembusan];
    setTembusan(updateTembusan);
    setName("");
  };

  const removeTembusan = (id) => {
    const updateTembusan = tembusan.filter((detail) => detail.id !== id);
    setTembusan(updateTembusan);
  };

  const handleCheckboxChange = (event) => {
    setIsWa(event.target.checked);
  };

  // useEffect(() => {
  //   if (!isWa) {
  //     setIsCurrentWa(false);
  //   }
  // }, [isWa]);

  console.log(kops);
  const [kopData, setKopData] = useState(kops[0]);
  const handleKopChange = (event) => {
    const selectedKop = kops.find(
      (kop) => kop.id === parseInt(event.target.value)
    );
    setKopData(selectedKop || {});
  };

  return (
    <Form method="POST">
      <div className="grid grid-cols-4 gap-5 ">
        <div className="col-span-4">
          {chooseUser ? (
            <>
              <div className="grid place-items-center ">
                <UserInfoDetail {...chooseUser} />
              </div>
              <div className="text-center mt-4">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    dispatch(clearChooseUser());
                  }}
                >
                  Clear User
                </button>
              </div>
            </>
          ) : (
            <SelectUser />
          )}
        </div>
        <div className="col-span-4 md:col-span-2">
          <SelectInputForId
            name="kop"
            list={kops}
            defaultValue={kops[0].name}
            size="select-sm"
            extFun={handleKopChange}
            label="Type"
          />
          <input type="hidden" name="kopData" value={JSON.stringify(kopData)} />
        </div>

        <div className="col-span-4 md:col-span-2">
          <FormInput name="number" label="nomor" size="input-sm" />
        </div>
        <div className="col-span-4 md:col-span-2">
          <FormInput
            name="address"
            label="Alamat selama cuti"
            size="input-sm"
          />
        </div>
        <div className="col-span-4 md:col-span-2">
          <DateInput
            label="Dari Tanggal"
            name="dateStart"
            size="date-sm"
            defaultValue={date}
          />
        </div>
        <div className="col-span-4 md:col-span-2">
          <DateInput
            label="Sampai Tanggal"
            name="dateEnd"
            size="date-sm"
            defaultValue={date}
          />
        </div>

        <div className="col-span-4 md:col-span-2">
          <SelectInput
            label="Akan ditandatanganni oleh:"
            list={signedBy}
            name="signedBy"
            size="select-sm"
          />
        </div>
        <div className="col-span-4 md:col-span-2">
          <FormCheckbox
            defaultChecked={isWa}
            label="Sent to"
            name="isWa"
            size="checkbox-sm"
            onChange={handleCheckboxChange}
          />
        </div>
        {isWa && (
          <div className="col-span-4 md:col-span-2">
            <FormInput name="phone" label="Whatsapp" size="input-sm" />
          </div>
        )}
        <div className="col-span-4">
          <div className="form-control mb-6">
            <label htmlFor="tembusan" className="label">
              <span className="label-text capitalize ">tembusan</span>
            </label>

            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  className="input input-bordered input-sm w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="tembusan"
                  placeholder="Tambahkan tembusan"
                />
              </div>
              <div className="w-fit text-right">
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
            tembusan.map((tem) => {
              return (
                <div key={tem.id} className="mt-2 grid grid-cols-12 gap-2">
                  <div className="col-span-10">
                    <input
                      type="text"
                      className="input-sm w-full"
                      disabled
                      defaultValue={tem.name}
                    />
                  </div>
                  <div className="col-span-2 text-center">
                    <button
                      onClick={() => removeTembusan(tem.id)}
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
            value={JSON.stringify(tembusan.map((t) => t.name))}
          />
        </div>
      </div>
      <div className="text-center md:text-right mt-5">
        <SubmitButton color="btn-primary" size="btn-sm" text="Buat Cuti" />
      </div>
    </Form>
  );
};

export default CreateCuti;

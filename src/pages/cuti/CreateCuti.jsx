import { Form, redirect } from "react-router-dom";
import {
  DateInput,
  FormCheckbox,
  FormCheckboxWithOnChange,
  FormInput,
  FormTextArea,
  PrevLinks,
  SelectInput,
  SelectInputForEmail,
  SubmitButton,
} from "../../components";
import { cutiType, forUsers } from "../../data";
import { toast } from "react-toastify";
import { customFetch, isAuthenticate } from "../../utils";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const user = store.getState().userState.user;

    const authCheck = isAuthenticate(user);
    if (authCheck !== true) {
      return authCheck;
    }

    const tembusan = JSON.parse(data.tembusan);

    data.tembusan = tembusan;
    data.isPegawai = data.isPegawai === "on";
    const { type, email, dateStart, dateEnd, reason } = data;

    const message = `
      *Permohonan Izin Cuti ${type}*

      Saya yang bertanda tangan di bawah ini:

      *Nama*: ${user.name}
      *NIP*: ${user.id}
      _email_: ${email}
  
      Dengan ini mengajukan permohonan cuti untuk keperluan berikut:

      _Alasan_: ${reason}

      *Tanggal Mulai*: ${dateStart}
      *Tanggal Selesai*: ${dateEnd}

      Demikian permohonan ini saya ajukan, atas perhatian dan kebijaksanaannya saya ucapkan terima kasih.

      Hormat saya,
      ${user.nama}
    `.trim();

    const urlToWa = `https://wa.me/${data.phone}?text=${encodeURIComponent(
      message
    )}`;

    console.log(data);
    try {
      const response = await customFetch.post("/cuti/make", data, {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });

      toast.success(response.data.message || "Permintaan anda sedang diproses");
      window.open(urlToWa, "_blank");
      return null;
    } catch (error) {
      if (error) {
        toast.error(error.response.data.message);
        return null;
      }
    }
  };
const CreateCuti = () => {
  const date = new Date().toISOString().split("T")[0];
  const [name, setName] = useState("");
  const [tembusan, setTembusan] = useState([]);

  const handleAdd = (e) => {
    e.preventDefault();

    // if no value, do nothing
    if (!name) return;
    // if value, setup new user and add to current users
    const fakeId = Date.now();
    // const newUser = { id: fakeId, name: name };
    const newTembusan = { id: fakeId, name };
    const updateTembusan = [...tembusan, newTembusan];
    setTembusan(updateTembusan);
    // set back to empty
    setName("");
  };

  const removeTembusan = (id) => {
    const updateTembusan = tembusan.filter((detail) => detail.id !== id);
    setTembusan(updateTembusan);
  };

  const [selectedCuti, setSelectedCuti] = useState(cutiType[3]); // Default value

  const handleCutiChange = (e) => {
    const selectedName = e.target.value;
    const selected = cutiType.find((cuti) => cuti.name === selectedName);
    setSelectedCuti(selected);
  };

  return (
    <Form method="POST">
      <div className="grid grid-cols-4 gap-5 bg-base-300 p-10 rounded-lg">
        <div className="col-span-4 md:col-span-2">
          <FormInput name="userNIP" label="Masukan NIP" size="input-sm" />
        </div>
        <div className="col-span-4 md:col-span-2">
          <SelectInput
            label="Jenis Cuti"
            name="type"
            list={cutiType}
            defaultValue={cutiType[3].name}
            onChange={handleCutiChange}
            size="select-sm"
          />

          <input type="hidden" name="name" value={selectedCuti.desc} />
          <input type="hidden" name="unicode" value={selectedCuti.unicode} />
        </div>
        <div className="col-span-4 md:col-span-2">
          <FormInput name="phone" label="Whatsapp" size="input-sm" />
        </div>
        <div className="col-span-4 md:col-span-2">
          <FormInput name="num" label="nomor" size="input-sm" />
        </div>
        <div className="col-span-4 md:col-span-2">
          <FormInput name="romawi" label="romawi" size="input-sm" />
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
          <FormInput
            name="address"
            label="Alamat selama cuti"
            size="input-sm"
          />
        </div>
        <div className="col-span-4 md:col-span-2">
          <FormCheckbox
            defaultChecked={true}
            label="pegawai"
            name="isPegawai"
            size="checkbox-sm"
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
        <div className="col-span-4">
          <FormTextArea
            label="Alasan cuti"
            size="textarea-sm h-32"
            name="reason"
            placeholder="Berikan keterangan mengapa cuti diajukan"
          />
        </div>
        <div className="col-span-4 md:col-span-1 md:col-end-5">
          <SubmitButton
            color="btn-success"
            size="btn-block"
            text="Ajukan Cuti"
          />
        </div>
      </div>
    </Form>
  );
};

export default CreateCuti;

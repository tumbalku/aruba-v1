import { Form, redirect, useLoaderData } from "react-router-dom";
import {
  DateInput,
  FileInput,
  FormCheckbox,
  FormInput,
  FormTextArea,
  SelectInput,
  SelectInputForId,
  SubmitButton,
  UserInfoDetail,
} from "../../components";
import { toast } from "react-toastify";
import { calculateDaysBetween, customFetch, daysBetween } from "../../utils";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import { sign } from "../../data";
import { useDispatch, useSelector } from "react-redux";
import { clearChooseUser } from "../../features/user/tempSlice";
import SelectUser from "../min/SelectUser";
import { errorHandleForAction } from "../../utils/exception";
import SelectInputForIdCuti from "./components/SelectInputForIdCuti";
import LocalPdfPreview from "../documents/LocalPdfPreview";
import InputNumber from "../../components/input-v2/InputNumber";
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
    data.userId = chooseUser.id;
    data.file = data.file.size !== 0 ? data.file : null;
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
          "Content-Type": "multipart/form-data",
          "X-API-TOKEN": user.token,
        },
      });
      console.log(response.data.message);
      toast.success(response.data.message || "Berhasil membuat cuti");
      if (hp) {
        window.open(urlToWa, "_blank");
      }
      store.dispatch(clearChooseUser());
      return redirect("/cuti/report");
    } catch (error) {
      return errorHandleForAction(error, "toastify");
    }
  };
export const loader = (store) => async () => {
  const user = store.getState().userState.user;
  try {
    const [resPejabat, resKop] = await Promise.all([
      customFetch(`/users/search`, {
        params: {
          roles: "OFFICEHOLDER",
        },
        headers: {
          "X-API-TOKEN": user.token,
        },
      }),
      customFetch(`/kops`, {
        headers: {
          "X-API-TOKEN": user.token,
        },
      }),
    ]);

    return {
      kops: resKop.data.data,
      pejabat: resPejabat.data.data,
    };
  } catch (error) {
    return errorHandleForAction(error, "toastify");
  }
};
const CutiCreate = () => {
  const dispatch = useDispatch();
  const date = new Date().toISOString().split("T")[0];
  const [name, setName] = useState("");
  const [tembusan, setTembusan] = useState([]);
  const [isWa, setIsWa] = useState(false);
  const [file, setFile] = useState(null);
  // const [isCurrentWa, setIsCurrentWa] = useState(false);

  const [dateStart, setDateStart] = useState(date);
  const [dateEnd, setDateEnd] = useState(date);
  const [dateBetween, setDateBetween] = useState(1);

  const handleDateChange = (name, value) => {
    let newDateStart = dateStart;
    let newDateEnd = dateEnd;

    if (name === "dateStart") {
      newDateStart = value;
      setDateStart(value);
    } else if (name === "dateEnd") {
      newDateEnd = value;
      setDateEnd(value);
    }

    setDateBetween(calculateDaysBetween(newDateStart, newDateEnd));
  };

  const chooseUser = useSelector((state) => state?.tempState?.chooseUser);

  const { kops, pejabat } = useLoaderData();
  console.log(pejabat);

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

  console.log(kops);
  const [kopData, setKopData] = useState(kops[0]);
  const handleKopChange = (event) => {
    const selectedKop = kops.find(
      (kop) => kop.id === parseInt(event.target.value)
    );
    setKopData(selectedKop || {});
  };

  const constHandleFileChange = (e) => {
    const doc = e.target.files[0];
    setFile(doc);
  };
  const [manualDateBetween, setManualDateBetween] = useState(1);

  useEffect(() => {
    setManualDateBetween(dateBetween);
  }, [dateBetween]);

  const handleManualChange = (e) => {
    setManualDateBetween(e.target.value); // Mengizinkan pengguna mengubah nilai secara manual
  };
  return (
    <Form method="POST" encType="multipart/form-data">
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
          <FormInput name="number" label="nomor cuti" size="input-sm" />
        </div>
        {kopData.type === "TAHUNAN" && (
          <div className="col-span-4">
            <FormInput name="forYear" label="Untuk Tahun" size="input-sm" />
          </div>
        )}

        <div className="col-span-4 md:col-span-2">
          <FormInput
            name="address"
            label="Alamat selama cuti"
            size="input-sm"
          />
        </div>

        <div className="col-span-4 md:col-span-2">
          <FormInput
            name="workUnit"
            label="Unit Kerja"
            size="input-sm"
            type="text"
          />
        </div>
        <div className="col-span-4 md:col-span-2">
          <FormTextArea label="Alasan" name="reason" size="textarea-sm" />
        </div>
        <div className="col-span-4 md:col-span-2">
          <FormTextArea label="Pesan" name="message" size="textarea-sm" />
        </div>
        <div className="col-span-4 md:col-span-2 grid md:grid-cols-3 gap-2 grid-cols-1">
          <DateInput
            label="Dari Tanggal"
            name="dateStart"
            size="date-sm"
            value={dateStart}
            onChange={handleDateChange}
          />

          <DateInput
            label="Sampai Tanggal"
            name="dateEnd"
            size="date-sm"
            onChange={handleDateChange}
            value={dateEnd}
          />
          <InputNumber
            name="total"
            label="total hari"
            size="input-sm"
            value={manualDateBetween}
            onChange={handleManualChange}
          />
        </div>
        <div className="col-span-4 md:col-span-2 grid md:grid-cols-2  gap-2 grid-cols-1">
          <SelectInputForIdCuti
            label="Akan ditandatanganni oleh:"
            list={pejabat}
            name="signedBy"
            size="select-sm"
          />
          <SelectInput
            label="Jabatan"
            list={sign}
            name="mark"
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
      <div className="flex justify-center items-center">
        <FileInput
          color="file-input-success"
          size="file-input-sm w-full"
          label="Pilih File"
          name="file"
          onChange={constHandleFileChange}
        />
      </div>
      <div>
        {file && file.type === "application/pdf" && (
          <div className="py-5">
            <LocalPdfPreview file={file} />
          </div>
        )}
      </div>

      <div className="text-center md:text-right mt-5">
        <SubmitButton
          disabled={!chooseUser}
          color="btn-primary"
          size="btn-sm"
          text="Buat Cuti"
        />
      </div>
    </Form>
  );
};

export default CutiCreate;

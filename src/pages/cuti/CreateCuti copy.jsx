import { Form, redirect } from "react-router-dom";
import {
  DateInput,
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

    const phoneNumber = "6281245952004"; // Ganti dengan nomor penerima
    const urlToWa = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    try {
      const response = await customFetch.post("/cuti", data, {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });

      toast.success(response.data.message || "Permintaan anda sedang diproses");
      window.open(urlToWa, "_blank");
      return null;
    } catch (error) {
      if (error) {
        toast.warn("Terjadi error!");
        return redirect("/login");
      }
    }
  };
const CreateCuti = () => {
  const date = new Date().toISOString().split("T")[0];
  return (
    <Form method="POST">
      <div className="grid grid-cols-4 gap-5 bg-base-300 p-10 rounded-lg">
        <div className="col-span-4 md:col-span-2">
          <SelectInput
            label="Jenis Cuti"
            name="type"
            list={cutiType}
            defaultValue={cutiType[1]}
            size="select-sm"
          />
        </div>
        <div className="col-span-4 md:col-span-2">
          <SelectInputForEmail
            label="Kepada"
            name="email"
            list={forUsers}
            defaultValue={forUsers[1]}
            size="select-sm"
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

        <div className="col-span-4">
          <FormTextArea
            label="Deskripsi"
            size="textarea-sm h-32"
            name="reason"
            placeholder="Berikan keterangan mengapa anda mengajukan cuti"
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

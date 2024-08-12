import {
  convertDateArrayToString,
  customFetch,
  isAuthenticate,
} from "../../utils";
import { Form, redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FormInput,
  FormTextArea,
  SelectInput,
  SubmitButton,
} from "../../components";
import { cutiStatus } from "../../data";

export const loader =
  (store) =>
  async ({ params }) => {
    const user = store.getState().userState.user;

    try {
      const response = await customFetch(`cuti/${params.id}`, {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });

      return { cutiDetail: response.data.data };
    } catch (error) {
      console.log(error.response.message);
      return null;
    }
  };
export const action =
  (store) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const user = store.getState().userState.user;

    try {
      const response = await customFetch.patch(
        `/cuti/decision/${params.id}`,
        data,
        {
          headers: {
            "X-API-TOKEN": user.token,
          },
        }
      );

      toast.success(response.data.message || "Permintaan anda sedang diproses");
      return redirect("/my-cuti");
    } catch (error) {
      toast.error("Terjadi error!");
      if (error.response.status === 401) {
        return redirect("/login");
      }
    }
  };
const CutiDecision = () => {
  const { cutiDetail } = useLoaderData();

  const {
    user,
    id: cutiId,
    type,
    status,
    message,
    reason,
    dateStart,
    dateEnd,
  } = cutiDetail;

  return (
    <div className="bg-base-300 p-8 rounded-lg shadow-xl">
      <Form method="POST">
        <SelectInput
          label="Status"
          name="status"
          list={cutiStatus}
          defaultValue={status}
          size="select-sm"
        />
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <FormInput
            label="ID"
            defaultValue={cutiId}
            name="id"
            disabled={true}
            size="input-sm"
            type="text"
          />
          <FormInput
            label="Jenis Cuti"
            defaultValue={type}
            name="type"
            disabled={true}
            size="input-sm"
            type="text"
          />
          <FormInput
            label="Dari tanggal"
            defaultValue={convertDateArrayToString(dateStart)}
            name="type"
            disabled={true}
            size="input-sm"
            type="text"
          />
          <FormInput
            label="Sampai tanggal"
            defaultValue={convertDateArrayToString(dateEnd)}
            name="type"
            disabled={true}
            size="input-sm"
            type="text"
          />
          <FormTextArea
            defaultValue={reason}
            disabled={true}
            label="Alasan mengajukan"
            name="reason"
            size="textarea-sm h-32"
          />
          <FormTextArea
            label="Pesan"
            placeholder="Berikan pesan atau ketentuan yang harus dilakukan pemohon..."
            defaultValue={message}
            name="message"
            size="textarea-sm h-32"
          />
        </div>
        <div className="grid grid-cols-4">
          <div className="col-span-4 md:col-span-1 md:col-end-5">
            <SubmitButton color="btn-success" size="btn-block" text="Submit" />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CutiDecision;

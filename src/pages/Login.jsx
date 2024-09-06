import { FormInput, SubmitButton } from "../components";
import { Form, redirect, useSearchParams } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";
import { errorHandle } from "../utils/exception";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const url = new URL(request.url);
    const redirectTo = url.searchParams.get("redirect") || "/";

    try {
      const response = await customFetch.post("/auth/login", data);
      store.dispatch(loginUser(response.data.data));
      toast.success("Logged in successfully");
      return redirect(redirectTo);
    } catch (error) {
      return errorHandle(error);
    }
  };
const Login = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  return (
    <section className="grid place-items-center h-screen">
      <Form
        method="POST"
        action={`/login?redirect=${redirectTo}`}
        className="card bg-base-100 w-96 p-8 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput
          type="text"
          label="username"
          name="username"
          defaultValue=""
        />
        <FormInput
          type="password"
          label="password"
          name="password"
          defaultValue=""
        />
        <div className="mt-4">
          <SubmitButton text="Masuk" size="btn-block" color="btn-primary" />
        </div>
      </Form>
    </section>
  );
};

export default Login;

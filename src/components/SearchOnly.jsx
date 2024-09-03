import { Form, Link, useLocation, useSubmit } from "react-router-dom";
import FormInput from "./FormInput";

const SearchOnly = ({ name, link }) => {
  const location = useLocation();
  const submit = useSubmit();

  // Mengubah search string menjadi objek params
  const currentParams = new URLSearchParams(location.search);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Menggabungkan parameter lama dengan parameter baru
    formData.forEach((value, key) => {
      if (value) {
        currentParams.set(key, value); // Set atau update nilai baru
      } else {
        currentParams.delete(key); // Hapus jika kosong
      }
    });

    // Submit dengan parameter yang sudah digabungkan
    submit(`?${currentParams.toString()}`, { method: "get" });
  };

  return (
    <Form
      className="grid sm:grid-cols-2 gap-y-4 sm:gap-x-4 rounded-md sm:items-center"
      onSubmit={handleSearchSubmit}
    >
      {/* INPUT SEARCH*/}
      <FormInput
        name={name}
        type="search"
        size="input-sm"
        label="search"
        defaultValue={""}
      />
      {/* BUTTONS */}
      <div className="flex mt-auto gap-4">
        <div className="w-full">
          <button type="submit" className="btn-primary btn btn-sm w-full">
            search
          </button>
        </div>
        <div className="w-full">
          <Link to={link} className="btn-secondary btn btn-sm w-full">
            reset
          </Link>
        </div>
      </div>
    </Form>
  );
};

export default SearchOnly;

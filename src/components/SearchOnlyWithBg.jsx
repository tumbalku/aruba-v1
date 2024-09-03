import { Form, Link } from "react-router-dom";
import FormInput from "./FormInput";

const SearchOnly = ({ name, link }) => {
  return (
    <Form className="bg-base-200 grid sm:grid-cols-2 gap-y-4 sm:gap-x-4 rounded-md px-8 py-4 sm:items-center shadow-lg">
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

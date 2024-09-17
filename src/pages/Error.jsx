import { useRouteError } from "react-router-dom";
import NotFound from "./exception/NotFound";
const Error = () => {
  const error = useRouteError();
  console.log("hallo", error);
  if (error.status === 404) {
    return <NotFound />;
  }
  return (
    <main className="grid min-h-screen place-items-center px-8">
      <h4 className="text-4xl font-bold ">There Was an error...</h4>
    </main>
  );
};

export default Error;

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomeLayout, ProfileLayout } from "./layout";
import { ErrorElement } from "./components";
import { store } from "./store";
import {
  Error,
  Landing,
  Exp,
  About,
  Letter,
  Documents,
  Maintenance,
  CreateCuti,
  CutiDetail,
  Login,
  MyCuti,
  Profile,
  CutiDecision,
  Users,
  CreateUser,
  UserDetail,
  UpdateUser,
  KGBDetail,
  UploadDocument,
  DocumentDetail,
  ChangePassword,
} from "./pages";
import { LoginRequireRoutes } from "./routes";

// acitons
import { action as createCutiAction } from "./pages/cuti/CreateCuti";
import { action as loginAction } from "./pages/Login";
import { action as cutiDecisionAction } from "./pages/cuti/CutiDecision";
import { action as usersCreateAction } from "./pages/min/CreateUser";
import { action as usersUpdateAction } from "./pages/min/UpdateUser";
import { action as uploadDocumentAction } from "./pages/documents/UploadDocument";
import { action as updateDocumentAction } from "./pages/documents/DocumentDetail";

// loader
import { loader as myCutiLoader } from "./pages/cuti/MyCuti";
import { loader as cutiDetailLoader } from "./pages/cuti/CutiDetail";
import { loader as cutiDecisionLoader } from "./pages/cuti/CutiDecision";
import { loader as usersLoader } from "./pages/min/Users";
import { loader as usersCreateLoader } from "./pages/min/CreateUser";
import { loader as usersDetailLoader } from "./pages/min/UserDetail";
import { loader as usersUpdateLoader } from "./pages/min/UpdateUser";
import { loader as documentsLoader } from "./pages/Documents";
import { loader as documentDetailLoader } from "./pages/documents/DocumentDetail";
import { loader as kgbDetailLoader } from "./pages/kgb/KGBDetail";

// exp
import { loader as expLoader } from "./pages/Exp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
      },
      {
        path: "about",
        element: <About />,
        errorElement: <ErrorElement />,
      },
      {
        path: "letters",
        element: <Letter />,
        errorElement: <ErrorElement />,
      },
      {
        path: "letters/cuti",
        element: <CreateCuti />,
        action: createCutiAction(store),
        errorElement: <ErrorElement />,
      },
      {
        path: "letters/cuti/:id",
        element: <CutiDetail />,
        loader: cutiDetailLoader,
        errorElement: <ErrorElement />,
      },
      {
        path: "letters/kgb",
        element: <KGBDetail />,
        loader: kgbDetailLoader,
        errorElement: <ErrorElement />,
      },
      {
        path: "exp",
        element: <Exp />,
        errorElement: <ErrorElement />,
        loader: expLoader(store),
      },
      {
        element: <LoginRequireRoutes />,
        children: [
          {
            path: "my-cuti",
            element: <MyCuti />,
            errorElement: <ErrorElement />,
            loader: myCutiLoader(store),
          },
          {
            path: "letters/cuti/decision/:id",
            element: <CutiDecision />,
            errorElement: <ErrorElement />,
            loader: cutiDecisionLoader(store),
            action: cutiDecisionAction(store),
          },
          {
            path: "users",
            element: <Users />,
            errorElement: <ErrorElement />,
            loader: usersLoader(store),
          },
          {
            path: "users/:id",
            element: <UserDetail />,
            errorElement: <ErrorElement />,
            loader: usersDetailLoader(store),
          },
          {
            path: "users/edit/:id",
            element: <UpdateUser />,
            errorElement: <ErrorElement />,
            loader: usersUpdateLoader(store),
            action: usersUpdateAction(store),
          },
          {
            path: "users/create",
            element: <CreateUser />,
            action: usersCreateAction(store),
            loader: usersCreateLoader,
            errorElement: <ErrorElement />,
          },
          {
            path: "documents",
            element: <Documents />,
            errorElement: <ErrorElement />,
            loader: documentsLoader,
          },
          {
            path: "documents/:id",
            element: <DocumentDetail />,
            errorElement: <ErrorElement />,
            loader: documentDetailLoader,
            action: updateDocumentAction(store),
          },
          {
            path: "documents/upload",
            element: <UploadDocument />,
            action: uploadDocumentAction(store),
            errorElement: <ErrorElement />,
          },
        ],
        errorElement: <ErrorElement />,
      },
      {
        path: "profile",
        element: <ProfileLayout />,
        children: [
          {
            index: true,
            element: <Profile />,
            errorElement: <ErrorElement />,
          },
          {
            path: "password",
            element: <ChangePassword />,
            errorElement: <ErrorElement />,
          },
        ],
        errorElement: <Error />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store),
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

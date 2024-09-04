import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { FeatureLayout, HomeLayout } from "./layout";
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
  Sip,
  Kop,
  CutiReport,
  Posts,
  PostReport,
  PostCreate,
  PostDetail,
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
import { action as passwordAction } from "./pages/ChangePassword";
import { action as profileAction } from "./pages/Profile";
import { action as postAction } from "./pages/posts/PostCreate";

// loader
import { loader as postsLoader } from "./pages/posts/Posts";
import { loader as postDetailLoader } from "./pages/posts/PostDetail";
import { loader as myCutiLoader } from "./pages/cuti/MyCuti";
import { loader as cutiDetailLoader } from "./pages/cuti/CutiDetail";
import { loader as cutiDecisionLoader } from "./pages/cuti/CutiDecision";
import { loader as createCutiLoader } from "./pages/cuti/CreateCuti";
import { loader as cutiReportLoader } from "./pages/cuti/CutiReport";
import { loader as usersLoader } from "./pages/min/Users";
import { loader as usersCreateLoader } from "./pages/min/CreateUser";
import { loader as usersDetailLoader } from "./pages/min/UserDetail";
import { loader as usersUpdateLoader } from "./pages/min/UpdateUser";
import { loader as documentsLoader } from "./pages/Documents";
import { loader as documentDetailLoader } from "./pages/documents/DocumentDetail";
import { loader as kgbDetailLoader } from "./pages/kgb/KGBDetail";
import { loader as sipLoader } from "./pages/sip/Sip";
import { loader as kopLoader } from "./pages/Kop";
import { action as kopAction } from "./pages/Kop";

// exp
import EditCuti, { loader as expLoader } from "./pages/cuti/EditCuti";
import { action as expAction } from "./pages/cuti/EditCuti";
import { First, links, Second } from "./pages/exp";
import { cutiLinks, postsLinks, profileLinks } from "./layout/Links";
// import { action as expAction } from "./pages/Exp";
// import { action as expAction } from "./pages/Exp";

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
        path: "posts",
        element: <FeatureLayout links={postsLinks} />,
        errorElement: <ErrorElement />,
        children: [
          {
            index: true,
            element: <Posts />,
            loader: postsLoader,
            errorElement: <ErrorElement />,
          },
          {
            path: ":id",
            element: <PostDetail />,
            loader: postDetailLoader,
            errorElement: <ErrorElement />,
          },
          {
            path: "create",
            element: <PostCreate />,
            action: postAction(store),
            errorElement: <ErrorElement />,
          },
          {
            path: "report",
            element: <PostReport />,
            errorElement: <ErrorElement />,
          },
        ],
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
        path: "kgb",
        element: <KGBDetail />,
        loader: kgbDetailLoader,
        errorElement: <ErrorElement />,
      },
      {
        path: "sip",
        element: <Sip />,
        loader: sipLoader,
        errorElement: <ErrorElement />,
      },
      {
        path: "exp",
        element: <FeatureLayout links={links} />,
        errorElement: <ErrorElement />,
        children: [
          {
            index: true,
            element: <First />,
            errorElement: <ErrorElement />,
          },
          {
            path: "second",
            element: <Second />,
            errorElement: <ErrorElement />,
          },
        ],
      },
      {
        path: "exp/:id",
        element: <EditCuti />,
        errorElement: <ErrorElement />,
        loader: expLoader(store),
        action: expAction(store),
      },
      {
        element: <LoginRequireRoutes />,
        children: [
          {
            path: "cuti",
            element: <FeatureLayout links={cutiLinks} />,
            children: [
              {
                index: true,
                element: <CreateCuti />,
                errorElement: <ErrorElement />,
                action: createCutiAction(store),
                loader: createCutiLoader(store),
              },
              {
                path: "kop",
                element: <Kop />,
                errorElement: <ErrorElement />,
                loader: kopLoader(store),
                action: kopAction(store),
              },
              {
                path: "report",
                element: <CutiReport />,
                errorElement: <ErrorElement />,
                loader: cutiReportLoader(store),
              },
              {
                path: "detail/:id",
                element: <CutiDetail />,
                loader: cutiDetailLoader,
                errorElement: <ErrorElement />,
              },
              {
                path: "edit/:id",
                element: <EditCuti />,
                errorElement: <ErrorElement />,
                loader: expLoader(store),
                action: expAction(store),
              },
            ],
            errorElement: <Error />,
          },
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
        element: <FeatureLayout links={profileLinks} />,
        children: [
          {
            index: true,
            element: <Profile />,
            errorElement: <ErrorElement />,
            action: profileAction(store),
          },
          {
            path: "password",
            element: <ChangePassword />,
            errorElement: <ErrorElement />,
            action: passwordAction(store),
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

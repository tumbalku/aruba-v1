import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { FeatureLayout, HomeLayout } from "./layout";
import { ErrorElement, NetworkError } from "./components";
import { store } from "./store";
import {
  Error,
  Landing,
  About,
  Letter,
  Documents,
  Login,
  Profile,
  Users,
  CreateUser,
  UserDetail,
  UpdateUser,
  UploadDocument,
  DocumentDetail,
  ChangePassword,
  Sip,
  Kop,
  Posts,
  SipUpload,
} from "./pages";
import { AdminOnly, LoginRequireRoutes } from "./routes";

// cuti ========
import {
  MyCuti,
  MyCutiCreate,
  CutiDetail,
  CutiReport,
  CutiUpdate,
  CutiCreate,
  CutiReportViewScroll,
  CutiDecisionReport,
  CutiDecision,
  MyCutiDetail,
} from "./pages/cuti";

import { loader as myCutiLoader } from "./pages/cuti/MyCuti";
import { loader as myCutiDetailLoader } from "./pages/cuti/MyCutiDetail";
import { loader as myCutiCreateLoader } from "./pages/cuti/MyCutiCreate";
import { loader as cutiDetailLoader } from "./pages/cuti/CutiDetail";
import { loader as cutiCreateLoader } from "./pages/cuti/CutiCreate";
import { loader as cutiReportLoader } from "./pages/cuti/CutiReport";
import { loader as cutiDecisionReportLoader } from "./pages/cuti/CutiDecisionReport";
import { loader as cutiUpdateLoader } from "./pages/cuti/CutiUpdate";
import { loader as cutiDecisionLoader } from "./pages/cuti/CutiDecision";

import { action as cutiDecisionAction } from "./pages/cuti/CutiDecision";
import { action as cutiUpdateAction } from "./pages/cuti/CutiUpdate";
import { action as cutiCreateAction } from "./pages/cuti/CutiCreate";
import { action as myCutiCreateAction } from "./pages/cuti/MyCutiCreate";

// =============

// user ========

import { loader as loginLoader } from "./pages/Login";
import { loader as usersLoader } from "./pages/min/Users";
import { loader as usersCreateLoader } from "./pages/min/CreateUser";
import { loader as usersDetailLoader } from "./pages/min/UserDetail";
import { loader as usersUpdateLoader } from "./pages/min/UpdateUser";

import { action as loginAction } from "./pages/Login";
import { action as profileAction } from "./pages/Profile";
import { action as usersCreateAction } from "./pages/min/CreateUser";
import { action as usersUpdateAction } from "./pages/min/UpdateUser";
import { action as passwordAction } from "./pages/ChangePassword";
// =============

// sip =========
import { SipDetail, SipReportContainer } from "./pages/sip";
import { action as sipUploadAction } from "./pages/sip/SipUpload";
import { action as sipDetailAction } from "./pages/sip/SipDetail";
import { loader as sipLoader } from "./pages/sip/Sip";
import { loader as sipDetailLoader } from "./pages/sip/SipDetail";
// =============

// Documents ===
import { action as uploadDocumentAction } from "./pages/documents/UploadDocument";
import { action as updateDocumentAction } from "./pages/documents/DocumentDetail";
import { loader as documentsLoader } from "./pages/Documents";
import { loader as documentDetailLoader } from "./pages/documents/DocumentDetail";
// =============

// kop =========
import { action as kopAction } from "./pages/Kop";
import { loader as kopLoader } from "./pages/Kop";
// =============

// post ========
import { loader as postsLoader } from "./pages/posts/Posts";
// =============

// exp
import { First, Second } from "./pages/exp";
import { cutiLinks, postsLinks, profileLinks } from "./layout/Links";

// layout =========
import NewsLayout from "./layout/NewsLayout";
// ===============

// news ===========
import {
  NewsDetail,
  NewsCreate,
  NewsUpdate,
  NewsContainer,
} from "./pages/news";

import { loader as newsContainerLoader } from "./pages/news/NewsContainer";
import { loader as newsDetailLoader } from "./pages/news/NewsDetail";
import { loader as newsUpdateLoader } from "./pages/news/NewsUpdate";

import { action as newsUpdateAction } from "./pages/news/NewsUpdate";
import { action as newsCreateAction } from "./pages/news/NewsCreate";
// ===================

// independent
import Kgb from "./pages/kgb/Kgb";
import Spmt from "./pages/spmt/Spmt";
import Akreditasi from "./pages/akreditasi/Akreditasi";
import { PublicUserInfo } from "./pages/users";
// ===================

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
        path: "view/user/:id",
        element: <PublicUserInfo />,
        errorElement: <ErrorElement />,
      },
      {
        path: "news",
        element: <NewsLayout />,
        errorElement: <ErrorElement />,
        children: [
          {
            index: true,
            element: <NewsContainer />,
            errorElement: <ErrorElement />,
            loader: newsContainerLoader,
          },
          {
            path: ":id",
            element: <NewsDetail />,
            errorElement: <ErrorElement />,
            loader: newsDetailLoader,
          },
        ],
      },
      {
        path: "about",
        element: <About />,
        errorElement: <ErrorElement />,
      },
      {
        path: "documents",
        element: <Documents />,
        errorElement: <ErrorElement />,
        loader: documentsLoader,
      },

      {
        path: "exp",
        element: <First />,
        errorElement: <ErrorElement />,
      },
      {
        path: "exp2",
        element: <Second />,
        errorElement: <ErrorElement />,
      },
      {
        element: <LoginRequireRoutes />,
        children: [
          {
            element: <AdminOnly />,
            children: [
              {
                path: "letters",
                element: <Letter />,
                errorElement: <ErrorElement />,
              },
              {
                path: "sip",
                element: <Sip />,
                loader: sipLoader,
                errorElement: <ErrorElement />,
              },
              {
                path: "sip/upload",
                element: <SipUpload />,
                action: sipUploadAction(store),
                errorElement: <ErrorElement />,
              },
              {
                path: "sip/:id",
                element: <SipDetail />,
                errorElement: <ErrorElement />,
                loader: sipDetailLoader,
                action: sipDetailAction(store),
              },
              {
                path: "news/create",
                element: <NewsCreate />,
                action: newsCreateAction(store),
                errorElement: <ErrorElement />,
              },
              {
                path: "news/edit/:id",
                element: <NewsUpdate />,
                loader: newsUpdateLoader(store),
                action: newsUpdateAction(store),
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
                ],
              },
              {
                path: "kgb",
                element: <Kgb />,
                errorElement: <ErrorElement />,
              },
              {
                path: "akreditasi",
                element: <Akreditasi />,
                errorElement: <ErrorElement />,
              },
              {
                path: "spmt",
                element: <Spmt />,
                errorElement: <ErrorElement />,
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
                loader: usersCreateLoader(store),
                errorElement: <ErrorElement />,
              },
              {
                path: "documents/upload",
                element: <UploadDocument />,
                action: uploadDocumentAction(store),
                errorElement: <ErrorElement />,
              },
              {
                path: "documents/:id",
                element: <DocumentDetail />,
                errorElement: <ErrorElement />,
                loader: documentDetailLoader,
                action: updateDocumentAction(store),
              },
              {
                path: "cuti",
                element: <FeatureLayout links={cutiLinks} />,
                children: [
                  {
                    index: true,
                    element: <CutiCreate />,
                    errorElement: <ErrorElement />,
                    loader: cutiCreateLoader(store),
                    action: cutiCreateAction(store),
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
                    path: ":id",
                    element: <CutiDetail />,
                    loader: cutiDetailLoader,
                    errorElement: <ErrorElement />,
                  },
                  {
                    path: "edit/:id",
                    element: <CutiUpdate />,
                    errorElement: <ErrorElement />,
                    loader: cutiUpdateLoader(store),
                    action: cutiUpdateAction(store),
                  },
                  {
                    path: "decision",
                    element: <CutiDecisionReport />,
                    errorElement: <ErrorElement />,
                    loader: cutiDecisionReportLoader(store),
                  },
                  {
                    path: "decision/:id",
                    element: <CutiDecision />,
                    errorElement: <ErrorElement />,
                    loader: cutiDecisionLoader(store),
                    action: cutiDecisionAction(store),
                  },
                ],
                errorElement: <Error />,
              },
            ],
          },
          {
            path: "my-cuti",
            element: <MyCuti />,
            errorElement: <ErrorElement />,
            loader: myCutiLoader(store),
          },
          {
            path: "my-cuti/:id",
            element: <MyCutiDetail />,
            errorElement: <ErrorElement />,
            loader: myCutiDetailLoader(store),
          },
          {
            path: "my-cuti/create",
            element: <MyCutiCreate />,
            errorElement: <ErrorElement />,
            loader: myCutiCreateLoader,
            action: myCutiCreateAction(store),
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
        errorElement: <ErrorElement />,
      },
    ],
  },
  {
    path: "view/report/cuti",
    element: <CutiReportViewScroll />,
    errorElement: <ErrorElement />,
  },
  {
    path: "view/report/sip",
    element: <SipReportContainer />,
    errorElement: <ErrorElement />,
  },
  {
    path: "login",
    element: <Login />,
    errorElement: <Error />,
    loader: loginLoader(store),
    action: loginAction(store),
  },
  {
    path: "network-error",
    element: <NetworkError />,
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};
export default App;

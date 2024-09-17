import { ErrorElement } from "../components";
import { Kop } from "../pages";
import { FeatureLayout } from "../layout";
import { cutiLinks } from "../layout/Links";
import { CutiCreate, CutiDetail, CutiReport, CutiUpdate } from "../pages/cuti";

import { loader as cutiUpdateLoader } from "../pages/cuti/CutiUpdate";
import { loader as cutiDetailLoader } from "../pages/cuti/CutiDetail";
import { loader as cutiCreateLoader } from "../pages/cuti/CutiCreate";
import { loader as cutiReportLoader } from "../pages/cuti/CutiReport";
import { loader as kopLoader } from "../pages/Kop";

import { action as cutiCreateAction } from "../pages/cuti/CutiCreate";
import { action as cutiUpdateAction } from "../pages/cuti/CutiUpdate";
import { action as kopAction } from "../pages/Kop";
import { store } from "../store";

export const cutiRoutes = {
  path: "cuti",
  element: <FeatureLayout links={cutiLinks} />,
  children: [
    {
      index: true,
      element: <CutiCreate />,
      errorElement: <ErrorElement />,
      loader: cutiCreateLoader,
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
  ],
  // errorElement: <Error />,
};

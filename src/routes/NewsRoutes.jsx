import {
  NewsDetail,
  NewsContainer,
  NewsCreate,
  NewsUpdate,
} from "../pages/news";
import { loader as newsContainerLoader } from "../pages/news/NewsContainer";
import { loader as newsDetailLoader } from "../pages/news/NewsDetail";
import { loader as newsUpdateLoader } from "../pages/news/NewsUpdate";

import { action as newsCreateAction } from "../pages/news/NewsCreate";
import { action as newsUpdateAction } from "../pages/news/NewsUpdate";
import NewsLayout from "../layout/NewsLayout";
import { ErrorElement } from "../components";
import { store } from "../store";

export const newsRoutes = {
  path: "news",
  element: <NewsLayout />,
  errorElement: <ErrorElement />,
  children: [
    {
      index: true,
      element: <NewsContainer />,
      loader: newsContainerLoader,
      errorElement: <ErrorElement />,
    },
    {
      path: ":id",
      element: <NewsDetail />,
      loader: newsDetailLoader,
      errorElement: <ErrorElement />,
    },
  ],
};

export const newsAdminRoutes = [
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
];

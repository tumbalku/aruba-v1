import { ErrorElement } from "../components";
import { CreateUser, UpdateUser, UserDetail, Users } from "../pages";
import { store } from "../store";

import { loader as usersLoader } from "../pages/min/Users";
import { loader as usersCreateLoader } from "../pages/min/CreateUser";
import { loader as usersDetailLoader } from "../pages/min/UserDetail";
import { loader as usersUpdateLoader } from "../pages/min/UpdateUser";

import { action as usersCreateAction } from "../pages/min/CreateUser";
import { action as usersUpdateAction } from "../pages/min/UpdateUser";
export const userRoutes = {
  path: "users",
  element: <Users />,
  loader: usersLoader(store),
  children: [
    {
      path: ":id",
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
  ],
  errorElement: <ErrorElement />,
};

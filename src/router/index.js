import React from "react";
import BoxedFancy from "../layouts/dashboard/boxed-fancy";
import SignIn from "../views/dashboard/auth/sign-in";
import SignUp from "../views/dashboard/auth/sign-up";
import Recoverpw from "../views/dashboard/auth/recoverpw";
import Resetpw from "../views/dashboard/auth/resetpw";
import BootstrapTable from "../views/dashboard/table/bootstrap-table";
import UserProfile from "../views/dashboard/app/user-profile";
import UserList from "../views/dashboard/app/user-list";
import Billing from "../views/dashboard/special-pages/billing";
import Admin from "../views/dashboard/admin/admin";
import QuizBrowse from "../views/dashboard/quiz/browse";
import QuizTaker from "../views/dashboard/quiz";
import QuizDetail from "../views/dashboard/quiz/detail";
import CreateCourses from "../views/dashboard/quiz/create";
import UpdateQuestion from "../views/dashboard/quiz/update";

export const IndexRouters = [
  {
    path: "/",
    element: <BoxedFancy />,
    children: [
      {
        path: "/dashboard",
        element: <Admin />,
      },
      {
        path: "/billing",
        element: <Billing />,
      },
      {
        path: "/user-profile",
        element: <UserProfile />,
      },
      {
        path: "/user-list",
        element: <UserList />,
      },
      {
        path: "/home",
        element: <QuizBrowse />,
      },
      {
        path: "/quiz-list",
        element: <BootstrapTable />,
      },
      {
        path: "/quiz",
        element: <QuizTaker />,
      },
      {
        path: "/quiz-detail",
        element: <QuizDetail />,
      },
      {
        path: "/create",
        element: <CreateCourses />,
      },
      {
        path: "/update",
        element: <UpdateQuestion />,
      },
    ],
  },
  {
    path: "/auth/sign-in",
    element: <SignIn />,
  },
  {
    path: "/auth/sign-up",
    element: <SignUp />,
  },
  {
    path: "auth/recoverpw",
    element: <Recoverpw />,
  },
  {
    path: "auth/resetpw",
    element: <Resetpw />,
  },
];

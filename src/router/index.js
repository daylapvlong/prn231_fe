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
import AuthorizedRoute from "../components/auth/authRoute";

export const IndexRouters = [
  {
    path: "/",
    element: <BoxedFancy />,
    children: [
      {
        path: "/dashboard",
        element: <AuthorizedRoute element={<Admin />} allowedRoles={["0"]} />,
      },
      {
        path: "/billing",
        element: (
          <AuthorizedRoute
            element={<Billing />}
            allowedRoles={["0", "1", "2"]}
          />
        ),
      },
      {
        path: "/user-profile",
        element: (
          <AuthorizedRoute
            element={<UserProfile />}
            allowedRoles={["0", "1", "2"]}
          />
        ),
      },
      {
        path: "/user-list",
        element: (
          <AuthorizedRoute
            element={<UserList />}
            allowedRoles={["0", "1", "2"]}
          />
        ),
      },
      {
        path: "/home",
        element: <QuizBrowse allowedRoles={[]} />,
      },
      {
        path: "/quiz-list",
        element: (
          <AuthorizedRoute
            element={<BootstrapTable allowedRoles={["0", "1", "2"]} />}
          />
        ),
      },
      {
        path: "/quiz",
        element: (
          <AuthorizedRoute
            element={<QuizTaker allowedRoles={["0", "1", "2"]} />}
          />
        ),
      },
      {
        path: "/quiz-detail",
        element: (
          <AuthorizedRoute
            element={<QuizDetail allowedRoles={["0", "1", "2"]} />}
          />
        ),
      },
      {
        path: "/create",
        element: (
          <AuthorizedRoute element={<CreateCourses />} allowedRoles={["1"]} />
        ),
      },
      {
        path: "/update",
        element: (
          <AuthorizedRoute element={<UpdateQuestion />} allowedRoles={["1"]} />
        ),
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

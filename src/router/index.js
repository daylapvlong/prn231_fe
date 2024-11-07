import React from "react";
import BoxedFancy from "../layouts/dashboard/boxed-fancy";
import LandingPage from "../views/dashboard/landing/index";
import SignIn from "../views/dashboard/auth/sign-in";
import SignUp from "../views/dashboard/auth/sign-up";
import Recoverpw from "../views/dashboard/auth/recoverpw";
import Resetpw from "../views/dashboard/auth/resetpw";
import QuizManagement from "../views/dashboard/table/bootstrap-table";
import UserProfile from "../views/dashboard/user/user-profile";
import UserList from "../views/dashboard/user/user-list";
import Billing from "../views/dashboard/special-pages/billing";
import PaymentSuccess from "../views/dashboard/special-pages/success";
import Admin from "../views/dashboard/admin/admin";
import QuizBrowse from "../views/dashboard/quiz/browse";
import QuizTaker from "../views/dashboard/quiz";
import QuizDetail from "../views/dashboard/quiz/detail";
import CreateCourses from "../views/dashboard/quiz/create";
import UpdateQuestion from "../views/dashboard/quiz/update";
import AuthorizedRoute from "../components/auth/authRoute";

// Ideally, userRole would come from some context or a custom hook
const userRole = JSON.parse(localStorage.getItem("user"))?.role || "";

export const IndexRouters = [
  {
    path: "/",
    element: <BoxedFancy />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/dashboard",
        element: (
          <AuthorizedRoute
            element={<Admin />}
            allowedRoles={["0"]}
            userRole={userRole}
          />
        ),
      },
      {
        path: "/billing",
        element: (
          <AuthorizedRoute
            element={<Billing />}
            allowedRoles={["0", "1", "2"]}
            userRole={userRole}
          />
        ),
      },
      {
        path: "/success",
        element: <PaymentSuccess />,
      },
      {
        path: "/user-profile",
        element: (
          <AuthorizedRoute
            element={<UserProfile />}
            allowedRoles={["0", "1", "2"]}
            userRole={userRole}
          />
        ),
      },
      {
        path: "/user-list",
        element: (
          <AuthorizedRoute
            element={<UserList />}
            allowedRoles={["0", "1", "2"]}
            userRole={userRole}
          />
        ),
      },
      {
        path: "/home",
        element: (
          <AuthorizedRoute
            element={<QuizBrowse />}
            allowedRoles={["0", "1", "2"]}
            userRole={userRole}
          />
        ),
      },
      {
        path: "/quiz-list",
        element: (
          <AuthorizedRoute
            element={<QuizManagement />}
            allowedRoles={["0", "1", "2"]}
            userRole={userRole}
          />
        ),
      },
      {
        path: "/quiz",
        element: (
          <AuthorizedRoute
            element={<QuizTaker />}
            allowedRoles={["0", "1", "2"]}
            userRole={userRole}
          />
        ),
      },
      {
        path: "/quiz-detail/",
        element: (
          <AuthorizedRoute
            element={<QuizDetail />}
            allowedRoles={["0", "1", "2"]}
            userRole={userRole}
          />
        ),
      },
      {
        path: "/create",
        element: (
          <AuthorizedRoute
            element={<CreateCourses />}
            allowedRoles={["1"]}
            userRole={userRole}
          />
        ),
      },
      {
        path: "/update/:id", // Added :id for quiz update route
        element: (
          <AuthorizedRoute
            element={<UpdateQuestion />}
            allowedRoles={["1"]}
            userRole={userRole}
          />
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
    path: "/auth/recoverpw",
    element: <Recoverpw />,
  },
  {
    path: "/auth/resetpw",
    element: <Resetpw />,
  },
];

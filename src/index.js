import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

// Layout and components
import LandingPage from "./views/landing/index";
import Admin from "./views/admin/admin";
import Billing from "./views/special-pages/billing";
import PaymentSuccess from "./views/special-pages/success";
import UserProfile from "./views/user/user-profile";
import UserList from "./views/user/user-list";
import QuizBrowse from "./views/quiz/browse";
import QuizManagement from "./views/table/manageQuizList";
import QuizAttemptList from "./views/table/manageAttemptQuiz";
import QuizTaker from "./views/quiz";
import QuizDetail from "./views/quiz/detail";
import CreateCourses from "./views/quiz/create";
import UpdateQuestion from "./views/quiz/update";
import UserManagement from "./views/quiz/manage";
import AuthorizedRoute from "./components/auth/authRoute";
import SignIn from "./views/auth/sign-in";
import SignUp from "./views/auth/sign-up";
import Recoverpw from "./views/auth/recoverpw";
import Resetpw from "./views/auth/resetpw";
import Error404 from "./views/errors/error404";

// Mantine Provider and CSS normalization
import { MantineProvider } from "@mantine/core";
import App from "./App"; // Import the App component

const userRole = JSON.parse(localStorage.getItem("user"))?.role || "";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Routes>
          {/* Layout for the dashboard */}
          <Route path="/" element={<LandingPage />} />

          <Route element={<App />}>
            <Route
              path="dashboard"
              element={
                <AuthorizedRoute
                  element={<Admin />}
                  allowedRoles={["0"]}
                  userRole={userRole}
                />
              }
            />
            <Route
              path="billing"
              element={
                <AuthorizedRoute
                  element={<Billing />}
                  allowedRoles={["0", "1", "2"]}
                  userRole={userRole}
                />
              }
            />
            <Route path="success" element={<PaymentSuccess />} />
            <Route
              path="user-profile"
              element={
                <AuthorizedRoute
                  element={<UserProfile />}
                  allowedRoles={["0", "1", "2"]}
                  userRole={userRole}
                />
              }
            />
            <Route
              path="user-list"
              element={
                <AuthorizedRoute
                  element={<UserList />}
                  allowedRoles={["0", "1", "2"]}
                  userRole={userRole}
                />
              }
            />
            <Route
              path="home"
              element={
                <AuthorizedRoute
                  element={<QuizBrowse />}
                  allowedRoles={["0", "1", "2"]}
                  userRole={userRole}
                />
              }
            />
            <Route
              path="quiz-list"
              element={
                <AuthorizedRoute
                  element={<QuizAttemptList />}
                  allowedRoles={["0", "1", "2"]}
                  userRole={userRole}
                />
              }
            />
            <Route
              path="quiz-manage"
              element={
                <AuthorizedRoute
                  element={<QuizManagement />}
                  allowedRoles={["1"]}
                  userRole={userRole}
                />
              }
            />
            <Route
              path="quiz"
              element={
                <AuthorizedRoute
                  element={<QuizTaker />}
                  allowedRoles={["0", "1", "2"]}
                  userRole={userRole}
                />
              }
            />
            <Route
              path="quiz-detail"
              element={
                <AuthorizedRoute
                  element={<QuizDetail />}
                  allowedRoles={["0", "1", "2"]}
                  userRole={userRole}
                />
              }
            />
            <Route
              path="create"
              element={
                <AuthorizedRoute
                  element={<CreateCourses />}
                  allowedRoles={["1"]}
                  userRole={userRole}
                />
              }
            />
            <Route
              path="update"
              element={
                <AuthorizedRoute
                  element={<UpdateQuestion />}
                  allowedRoles={["1"]}
                  userRole={userRole}
                />
              }
            />
            <Route
              path="user-manage"
              element={
                <AuthorizedRoute
                  element={<UserManagement />}
                  allowedRoles={["1"]}
                  userRole={userRole}
                />
              }
            />
          </Route>

          {/* Authentication Routes */}
          <Route path="auth/sign-in" element={<SignIn />} />
          <Route path="auth/sign-up" element={<SignUp />} />
          <Route path="auth/recoverpw" element={<Recoverpw />} />
          <Route path="auth/resetpw" element={<Resetpw />} />

          {/* Catch-all for undefined routes */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </Provider>
);

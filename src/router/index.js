import React from 'react'
import BoxedFancy from "../layouts/dashboard/boxed-fancy"
import SignIn from '../views/dashboard/auth/sign-in'
import SignUp from '../views/dashboard/auth/sign-up'
import BootstrapTable from '../views/dashboard/table/bootstrap-table'
import UserProfile from '../views/dashboard/app/user-profile';
import UserAdd from '../views/dashboard/app/user-add';
import UserList from '../views/dashboard/app/user-list';
import Billing from '../views/dashboard/special-pages/billing';
import Admin from '../views/dashboard/admin/admin';
import QuizPage from '../views/dashboard/quiz'

export const IndexRouters = [
    {
        path: '/',
        element: <BoxedFancy />,
        children: [
            {
                path: '/dashboard',
                element: <Admin />
            },
            {
                path: 'dashboard/special-pages/billing',
                element: <Billing />
            },
            {
                path: 'dashboard/app/user-profile',
                element: <UserProfile />
            },
            {
                path: 'dashboard/app/user-add',
                element: <UserAdd />
            },
            {
                path: 'dashboard/app/user-list',
                element: <UserList />
            },
            {
                path: 'dashboard/admin/admin',
                element: <Admin />
            },
            {
                path: 'dashboard/table/bootstrap-table',
                element: <BootstrapTable />
            },
            {
                path: '/user-list',
                element: <UserList />
            },
            {
                path: '/quiz-list',
                element: <BootstrapTable />
            },
            {
                path: '/quiz',
                element: <QuizPage />
            },
        ]
    },
    {
        path: '/auth/sign-in',
        element: <SignIn />
    },
    {
        path: '/auth/sign-up',
        element: <SignUp />
    },
]

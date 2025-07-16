import {
  createBrowserRouter,
} from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Page/Home/Home";
import Login from "../Page/Authentication/Login/Login";
import Register from "../Page/Authentication/Register/Register";
import DashboardLayout from "../Page/DashboardLayout/DashboardLayout";
import PrivetRoute from "../Route/PrivetRoute";
import MyProfile from "../Page/DashboardLayout/MyProfile";
import AddPost from "../Page/DashboardLayout/AddPost";
import MyPost from "../Page/DashboardLayout/MyPost";
import MemberShip from "../Page/MemberShip/MemberShip";
import PostComments from "../Page/Comments/PostComments";
import PostDetails from "../Page/PostDetails";
import AdminProfile from "../Page/DashboardLayout/AdminProfile";
import ManageUsers from "../Page/DashboardLayout/ManageUsers";
import Activities from "../Page/DashboardLayout/Activities";
import Announcement from "../Page/DashboardLayout/Announcement";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
        {
            index: true,
            element: <Home></Home>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/register',
            element: <Register></Register>
        },
        {
          path: '/memberShip',
          element: <PrivetRoute><MemberShip></MemberShip></PrivetRoute>
        },
        {
          path: '/postComments/:id',
          element: <PrivetRoute><PostComments></PostComments></PrivetRoute>
        },
        {
          path: '/details/:postId',
          element: <PostDetails></PostDetails>
        }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivetRoute><DashboardLayout></DashboardLayout></PrivetRoute>,
    children: [
      {
        path: 'myProfile',
        element: <PrivetRoute><MyProfile></MyProfile></PrivetRoute>
      },
      {
        path: 'addPost',
        element: <PrivetRoute><AddPost></AddPost></PrivetRoute>
      },
      {
        path: 'myPost',
        element: <PrivetRoute><MyPost></MyPost></PrivetRoute>
      },
      {
        path: 'adminProfile',
        element: <AdminProfile></AdminProfile>
      },
      {
        path: 'manageUsers',
        element: <ManageUsers></ManageUsers>
      },
      {
        path: 'activities',
        element: <Activities></Activities>
      },
      {
        path: 'announcement',
        element: <Announcement></Announcement>
      }
    ]
  }
]);
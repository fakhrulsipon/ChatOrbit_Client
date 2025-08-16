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
import ErrorPage from "../Page/ErrorPage";
import Forbidden from "../Page/Forbidden";
import AdminRoute from "../Route/AdminRoute";
import About from "../components/About";
import Blogs from "../Page/Blogs";


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
        },
        {
          path: '/about',
          element: <About></About>
        },
        {
          path: '/blogs',
          element: <Blogs></Blogs>
        },
        {
          path: '/forbidden',
          element: <Forbidden></Forbidden>
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
        element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
      },
      {
        path: 'manageUsers',
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: 'activities',
        element: <AdminRoute><Activities></Activities></AdminRoute>
      },
      {
        path: 'announcement',
        element: <AdminRoute><Announcement></Announcement></AdminRoute>
      }
    ]
  },
  {
    path: '*',
    element: <ErrorPage></ErrorPage>
  }
]);
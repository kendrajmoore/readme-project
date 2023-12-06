import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage"

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "login/",
          element: <SignIn/>
        },
        {
          path: "signup/",
          element: <SignUp/>
        },
        {
          path: "about/",
          element: <About/>
        },
        {
          path: "profile/",
          element: <UserProfile/>
        }
      ],
      errorElement: <ErrorPage/>
    },
  ]);
  
  export default router;
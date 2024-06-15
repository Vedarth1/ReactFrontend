import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from './routes/dochome.jsx'
import './index.css'
import ErrorPage from './routes/errorpage.jsx';
import ChatBot from './routes/chatbot.jsx';
import SignIn from './routes/login.jsx';
import SignUp  from './routes/signup.jsx';
import Dashboard from './routes/Dashboard.jsx';
import QrDashboad from './routes/QRdashboard.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:<SignIn/>,
    errorElement: <ErrorPage />,
  },
  {
    path:"signup",
    element: <SignUp/>
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path:"chat",
    element:<ChatBot/>,
  },
  {
    path:"dashboard",
    element:<Dashboard/>
  },
  {
    path:"qrgenerator",
    element:<QrDashboad/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

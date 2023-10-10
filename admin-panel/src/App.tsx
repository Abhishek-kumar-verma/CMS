import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
// import RootLayout from './Components/RootLayout/RootLayout';
import Register from "./Auth/Register/Register";
import Login from "./Auth/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    // <Routes>
    //   <Route path="/" element={<Login />} /> {/* Default route */}
    //   <Route path="/signup" element={<Register />} />
    //   <Route path="/signin" element={<Login />} />
    //   <Route path="/dashboard" element={<Dashboard />} />
    // </Routes>

    <Route>
        <Route index element={<Login />} />
        <Route path='/signup' element={<Register />}/>
        <Route path='/signin' element={<Login />}/>
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;

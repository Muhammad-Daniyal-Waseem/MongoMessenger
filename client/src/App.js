import { Routes, Route, Navigate } from "react-router-dom";
import DashBoard from "./modules/Dashboard";
import Form from "./modules/Form";

const ProtectedRoute = ({ children,auth=false }) => {
  const isLoggedIn = localStorage.getItem("user:token") !== null || false;
  if (!isLoggedIn&&auth) {
    return <Navigate to={"/Signin"} />;
  } else if (
    isLoggedIn &&
    ["/Signin", "/Signup"].includes(window.location.pathname)
  ) {
    return <Navigate to={"/"} />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route
        path="/Signup"
        element={
          <ProtectedRoute>
            <Form isSignInPage={false}></Form>
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/Signin"
        element={
          <ProtectedRoute>
            <Form isSignInPage={true}></Form>
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/"
        element={
          <ProtectedRoute auth={true}>
            <DashBoard></DashBoard>
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}

export default App;

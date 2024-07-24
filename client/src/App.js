import { Routes, Route, Navigate } from "react-router-dom";
import DashBoard from "./modules/Dashboard";
import Form from "./modules/Form";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("user:token") !== null || true;
  if (!isLoggedIn) {
    return <Navigate to={"/api/Signin"} />;
  } else if (
    isLoggedIn &&
    ["/api/Signin", "/api/Signup"].includes(window.location.pathname)
  ) {
    return <Navigate to={"/"} />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route
        path="/api/Signup"
        element={
          <ProtectedRoute>
            <Form isSignInPage={false}></Form>
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/api/Signin"
        element={
          <ProtectedRoute>
            <Form isSignInPage={true}></Form>
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashBoard></DashBoard>
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}

export default App;

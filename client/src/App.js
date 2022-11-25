import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home></Home>
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/test" element={<Test></Test>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export function ProtectedRoute(props) {
  if (localStorage.getItem("currentUser")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}
export function NonProtectedRoute(props) {
  if (localStorage.getItem("currentUser")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;

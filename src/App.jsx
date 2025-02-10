import Navbar from "./components/NavBar";
import { ThemeProvider } from "./components/theme-provider";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "./components/app/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/app/Home";

function App() {
  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Protected Routes Wrapper */}
          <Route path="/"
            element={
              <ProtectedRoute>
                <Navbar /> {/* Navbar will be displayed in protected routes */}
                <Home path="/"/>
              </ProtectedRoute>
            }
          ></Route>

          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

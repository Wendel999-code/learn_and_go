import MainLayout from "@/layout/MainLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import Login from "@/pages/auth/Login";
import SignupCard from "@/pages/auth/SignUp";
import EnrolleeDashboard from "@/pages/enrollee/EnrolleeDashboard";
import Home from "@/pages/Home";
import About from "@/pages/landing/About";
import NotFound from "@/pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import AdminLayout from "@/layout/AdminLayout";
import EnrolleeLayout from "@/layout/EnrolleeLayout";
import PublicRoute from "./PublicRoutes";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes wrapped with MainLayout */}
        <Route element={<MainLayout />}>
          <Route
            path="/auth/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/auth/signup"
            element={
              <PublicRoute>
                <SignupCard />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="/about"
            element={
              <PublicRoute>
                <About />
              </PublicRoute>
            }
          />
        </Route>

        {/* Admin protected routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
        </Route>

        {/* Enrollee protected routes */}
        <Route
          path="/enrollee/*"
          element={
            <ProtectedRoute allowedRoles={["ENROLLEE"]}>
              <EnrolleeLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<EnrolleeDashboard />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

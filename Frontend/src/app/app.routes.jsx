import { Routes, Route } from "react-router-dom";

import Navbar from "@/shared/components/Navbar";

import HomePage from "@/features/home/pages/HomePage";
import BrowsePage from "@/features/scholarship/pages/BrowsePage";

import StudentDashboardPage from "@/features/student/pages/StudentDashboardPage";
import AdminDashboardPage from "@/features/admin/pages/AdminDashboardPage";
import CreateScholarshipPage from "@/features/admin/pages/CreateScholarshipPage";

import ProtectedRoute from "@/app/routes/ProtectedRoute";
import RoleRoute from "@/app/routes/RoleRoute";
import Profile from "@/features/profile/components/Profile";
import NotFound from "../shared/components/NotFound";

export default function AppRoutes() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/browse" element={<BrowsePage />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <RoleRoute role="student">
                <StudentDashboardPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleRoute role="admin">
                <AdminDashboardPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create"
          element={
            <ProtectedRoute>
              <RoleRoute role="admin">
                <CreateScholarshipPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <NotFound />
          }
        />
      </Routes>
    </>
  );
}
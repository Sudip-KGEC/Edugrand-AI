import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";
import ScrollToTop from "@/shared/components/ScrollToTop";
import Loader from "@/shared/components/Loader";

import ProtectedRoute from "@/app/routes/ProtectedRoute";
import NotFound from "../shared/components/NotFound";

const HomePage = lazy(() => import("@/features/home/pages/HomePage"));
const BrowsePage = lazy(() => import("@/features/scholarship/pages/BrowsePage"));
const StudentDashboardPage = lazy(() =>
  import("@/features/student/pages/StudentDashboardPage")
);
const AdminDashboardPage = lazy(() =>
  import("@/features/admin/pages/AdminDashboardPage")
);
const Profile = lazy(() =>
  import("@/features/profile/components/Profile")
);

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Suspense fallback={<Loader fullScreen text="Loading..." />}>
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
              <ProtectedRoute role="student">
                <StudentDashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
}
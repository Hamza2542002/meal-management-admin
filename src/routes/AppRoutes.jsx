import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useSetAtom } from "jotai";
import { auth } from "../config/firebase";
import { userAtom } from "../atoms/userAtom";
import Dashboard from "../pages/Dashboard";
import Meals from "../pages/Meals";
import Categories from "../pages/Categories";
import Orders from "../pages/Orders";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import AdminLayout from "../components/layout/AdminLayout";
import AddMealPage from "../pages/AddMealPage";

function AuthBoundary({ requireAuth = false }) {
  const [user, setUser] = useState(auth.currentUser);
  const [isLoading, setIsLoading] = useState(true);
  const setUserInfo = useSetAtom(userAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const name = currentUser.displayName?.trim() || "";
        const nameParts = name.split(/\s+/).filter(Boolean);
        setUserInfo({
          uid: currentUser.uid,
          email: currentUser.email ?? "",
          displayName: name,
          firstName: nameParts[0] ?? "",
          lastName: nameParts.length > 1 ? nameParts.at(-1) : "",
          photoURL: currentUser.photoURL ?? null,
        });
      } else {
        setUserInfo(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, [setUserInfo]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background" role="status" aria-label="Checking sign-in status">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
      </div>
    );
  }

  if (requireAuth && !user) {
    return <Navigate to="/login" replace />;
  }

  if (!requireAuth && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* Authentication */}
        <Route element={<AuthBoundary />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Admin */}
        <Route element={<AuthBoundary requireAuth />}>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/meals" element={<Meals />} />
            <Route path="/meals/addMeal/:id" element={<AddMealPage />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
        </Route>

        {/* Default */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Unknown route */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter >
  )
}

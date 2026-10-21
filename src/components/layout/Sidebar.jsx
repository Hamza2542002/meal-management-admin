import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  Shapes,
  UtensilsCrossed,
  FileSpreadsheet,
} from "lucide-react";
import { useState } from "react";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";

const navigationItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Orders",
    path: "/orders",
    icon: FileSpreadsheet,
  },
  {
    name: "Meals",
    path: "/meals",
    icon: UtensilsCrossed,
  },
  {
    name: "Categories",
    path: "/categories",
    icon: Shapes,
  },
];

function Sidebar() {

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  async function handleLogout() {
    setLogoutError("");
    setIsSigningOut(true);
    try {
      await signOut(auth);
      setIsMenuOpen(false);
      navigate("/login", { replace: true });
    } catch {
      setLogoutError("Couldn't sign out. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <aside className="flex min-h-screen w-64 flex-col bg-primary text-on-primary ">
      {/* Brand */}
      <div className="flex flex-col border-b border-white/10 px-6 pt-8 pb-4 ">
        <h1 className="text-2xl font-bold tracking-tight">
          Verdant Grill
        </h1>
        <h6 className="text-sm font-bold tracking-tight text-white/80">
          Admin Dashboard
        </h6>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-md px-4 py-3",
                      "text-sm font-medium transition-colors",
                      isActive
                        ? "bg-white/10 text-on-secondary border-l-primary-fixed border-l-5"
                        : "text-white/80 hover:bg-white/10 hover:text-white",
                    ].join(" ")
                  }
                >
                  <Icon size={20} strokeWidth={2} />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut size={20} strokeWidth={2} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, ChevronDown, Info, LogOut, Search, UserRound } from "lucide-react";
import { signOut } from "firebase/auth";
import { useAtomValue } from "jotai";
import { userAtom } from "../../atoms/userAtom";
import { auth } from "../../config/firebase";

function Navbar() {
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const menuRef = useRef(null);
  const initials = [user?.lastName?.[0], user?.firstName?.[0]]
    .filter(Boolean)
    .join("")
    .toUpperCase() || user?.email?.[0]?.toUpperCase() || "U";
  const userName = user?.displayName || user?.email || "Account";

  useEffect(() => {
    function closeMenuOnOutsideClick(event) {
      if (!menuRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    function closeMenuOnEscape(event) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeMenuOnOutsideClick);
    document.addEventListener("keydown", closeMenuOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeMenuOnOutsideClick);
      document.removeEventListener("keydown", closeMenuOnEscape);
    };
  }, []);

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
    <header className="flex h-16 items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-8 py-6.5">
      <div className="flex items-center gap-2 rounded-md bg-background border border-outline-variant px-3 py-1 text-sm text-outline-variant w-1/3 md:w-125 ">
        <Search size={18} strokeWidth={2} className="inline text-outline " />
        <input placeholder="Search meals, orders..." className=" py-1 text-sm text-outline placeholder:text-outline-variant focus:outline-none" />
      </div>
      <div className="flex items-center gap-6">
        <div className="relative hover:cursor-pointer">
          <Bell size={20} strokeWidth={2} className="inline text-outline " />
          <span className="sr-dot bg-secondary"></span>
        </div>
        <p className="text-md text-outline hover:cursor-pointer">
          <Info size={20} strokeWidth={2} className="mr-1 inline" />
          Support
        </p>
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => {
              setLogoutError("");
              setIsMenuOpen((open) => !open);
            }}
            className="flex items-center gap-2 rounded-full p-1 pr-2 transition hover:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary/30"
            aria-label={`Account menu for ${userName}`}
            aria-haspopup="true"
            aria-expanded={isMenuOpen}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-on-primary">
              {initials}
            </span>
            <span className="hidden max-w-36 truncate text-sm font-medium text-on-surface sm:block">
              {user?.displayName || "Account"}
            </span>
            <ChevronDown size={16} className="hidden text-outline sm:block" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-overlay">
              <div className="flex items-start gap-3 border-b border-outline-variant px-4 py-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-on-primary">
                  {initials}
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="truncate text-sm font-semibold text-on-surface">{userName}</p>
                  {user?.displayName && user?.email && (
                    <p className="mt-0.5 truncate text-xs text-outline">{user.email}</p>
                  )}
                </div>
              </div>
              <div className="p-1.5">
                <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-on-surface-variant">
                  <UserRound size={17} />
                  <span>Account</span>
                </div>
                {logoutError && (
                  <p role="alert" className="px-3 py-2 text-xs text-error">{logoutError}</p>
                )}
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isSigningOut}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-error transition hover:bg-error-container/50 disabled:cursor-wait disabled:opacity-60"
                >
                  <LogOut size={17} />
                  <span>{isSigningOut ? "Signing out…" : "Log out"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;

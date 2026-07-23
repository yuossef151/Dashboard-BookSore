import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  BookOpen,
  FolderOpen,
  ShoppingCart,
  Users,
  UserPlus,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
import { useStore } from "../hooks/useStore";

export function Sidebar() {
  const location = useLocation();
    const {isOpen, setIsOpen ,  resetAllPagesExcept, setOrderPage } = useStore();
const base = import.meta.env.BASE_URL;
  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard , isAbsolute: true},
    { path: "/books", label: "Books", icon: BookOpen },
    { path: "/categories", label: "Categories", icon: FolderOpen },
    { path: "/orders", label: "Orders", icon: ShoppingCart },
    { path: "/Messages", label: "Messages", icon: MessageSquare  },
    { path: "/users", label: "Users", icon: Users },
  ];
const handleLogout = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("email");
 
 window.location.hash = "#/login";
};
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={`
  fixed lg:static  top-0 left-0 h-full z-40
  w-64 bg-white border-r border-gray-200 flex flex-col
  transform transition-transform duration-300
  ${isOpen ? "translate-x-0" : "-translate-x-full"}
   lg:translate-x-0
`}
    >
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800">Bookstore Admin</h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <li key={path}>
              <Link
                to={path}
                onClick={() => {
                  setIsOpen(false);
                  resetAllPagesExcept();
                } }
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(path)
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex  cursor-pointer items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
            >
              <Users className="w-5 h-5" />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

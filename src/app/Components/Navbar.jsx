import { Bell, Menu, Search, User } from "lucide-react";
import { useStore } from "../hooks/useStore";

export function Navbar() {
  const emailUser = sessionStorage.getItem("email");
  const { isOpen, setIsOpen } = useStore();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center  px-6 justify-between  lg:justify-end">
      <button onClick={() => setIsOpen(true)} className="lg:hidden p-2">
        <Menu className="w-6 h-6" />
      </button>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 pl-4  border-gray-200">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-sm">
            <div className="font-medium text-gray-800">Admin User</div>
            <div className="text-gray-500 text-xs">{emailUser}</div>
          </div>
        </div>
      </div>
    </header>
  );
}

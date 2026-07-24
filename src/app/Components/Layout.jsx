import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { useStore } from "../hooks/useStore";

export function Layout() {
  const { isOpen, setIsOpen } = useStore();

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-[#0000005f] bg-opacity-50 z-30 "
        />
      )}
      <div className="h-screen flex overflow-hidden bg-gray-50">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />

          <main className="flex-1 overflow-y-auto lg:p-6 md:p-2 p-2">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

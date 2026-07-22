import { useState } from "react";
import { useStore } from "../hooks/useStore";
import {
  User,
  Mail,
  Calendar,
  ShoppingBag,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Phone,
  MapPin,
} from "lucide-react";

export function Users() {
const { users, UsersPage, setUsersPage, isLoading:isLoading4 } = useStore();
  
// if (isUsersLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ed6be0]"></div>
//         <span className="ml-3 text-gray-600"> Loading...</span>
//       </div>
//     );
//   }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Users</h1>
          <p className="text-gray-600 mt-1">View and manage customers</p>
        </div>
      </div>
{isLoading4 ? (
        <div className="text-center py-20">Loading...</div>
      ) : (
      <div className="space-y-4">
        {users?.usersdata?.map((user, index) => {
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="lg:p-6 md:p-2 p-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center  justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="">
                      <h3 className="font-semibold text-gray-800">
                        {user.first_name} {user.last_name}
                      </h3>
                      <div className="flex lg:items-center md:gap-2 lg:gap-4 mt-1 flex-col md:flex-row lg:flex-row">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          {user.phone}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          address: {user.address}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      )}
      <div className="flex gap-10 mt-6 items-center justify-center">
        <button
          className="py-2 px-5 bg-[#ed6be0] rounded-xl"
          disabled={users?.meta?.current_page === 1}
          onClick={() => setUsersPage((p) => p - 1)}
        >
          Prev
        </button>

        <span>
          {users?.meta?.current_page} / {users?.meta?.last_page}
        </span>

        <button
          className="py-2 px-5 bg-[#ed6be0] rounded-xl"
          disabled={users?.meta?.current_page === users?.meta?.last_page}
          onClick={() => setUsersPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
      {users?.usersdata?.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No users found</p>
        </div>
      )}
    </div>
  );
}

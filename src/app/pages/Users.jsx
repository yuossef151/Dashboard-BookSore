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
import { ImSpinner2 } from "react-icons/im";

export function Users() {
  const { users, UsersPage, setUsersPage, isLoading: isLoading4, error4 } = useStore();

  // لو في خطأ حقيقي غير الـ 401، اعرضه
  const hasRealError = error4 && error4.response?.status !== 401;

  if (hasRealError) {
    return <div className="p-6 text-red-600">Error: {error4.message}</div>;
  }

  // التحقق مما إذا كانت القائمة فارغة أو حصل خطأ 401 (لتجنب كسر الصفحة وعرض حالة الفراغ)
  const isUsersEmpty = !users?.usersdata || users.usersdata.length === 0 || (error4 && error4.response?.status === 401);

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Users</h1>
          <p className="text-gray-600 mt-1">View and manage customers</p>
        </div>
      </div>

      {isLoading4 ? (
        <div className="text-center py-20 flex flex-col items-center justify-center gap-3">
          <ImSpinner2 className="animate-spin text-[#D9176C]" size={32} />
          <p className="text-gray-500">Loading users...</p>
        </div>
      ) : isUsersEmpty ? (
        /* رسالة حالة الفراغ بتصميم احترافي */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center flex flex-col items-center justify-center gap-4 mt-6">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">No users found</h3>
            <p className="text-sm text-gray-500 mt-1">
              There are no customers available at the moment.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {users?.usersdata?.map((user, index) => {
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="lg:p-6 md:p-4 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
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

      {/* إخفاء الـ Pagination لو مفيش مستخدمين أو أثناء التحميل */}
      {!isLoading4 && !isUsersEmpty && (
        <div className="flex gap-10 mt-6 items-center justify-center">
          <button
            className="py-2 px-5 bg-[#ed6be0] rounded-xl cursor-pointer disabled:opacity-50"
            disabled={users?.meta?.current_page === 1}
            onClick={() => setUsersPage((p) => p - 1)}
          >
            Prev
          </button>

          <span>
            {users?.meta?.current_page} / {users?.meta?.last_page}
          </span>

          <button
            className="py-2 px-5 bg-[#ed6be0] rounded-xl cursor-pointer disabled:opacity-50"
            disabled={users?.meta?.current_page === users?.meta?.last_page}
            onClick={() => setUsersPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
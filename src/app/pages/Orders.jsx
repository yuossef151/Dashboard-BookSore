import { useState } from "react";
import { useStore } from "../hooks/useStore";
import { Package } from "lucide-react";
import { ImSpinner2 } from "react-icons/im";
import { FaArrowRight } from "react-icons/fa";

export function Orders() {
  const { 
    Ordermeta, 
    Order, 
    updateOrderStatus, 
    setOrderPage, 
    OrderPage, 
    isOrdersLoading, 
    selectedOrderId, 
    orderDetails, 
    isLoadingDetails, 
    handleToggleDetails,
    book 
  } = useStore();
  
  const orders = Order || [];
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders?.filter((order) => order.status === filterStatus);

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const paymentMethodMap = {
    1: "Online payment",
    2: "Cash on delivery",
    3: "POS on delivery",
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Orders</h1>
          <p className="text-gray-600 mt-1">Manage customer orders</p>
        </div>
      </div>

      {isOrdersLoading ? (
        <div className="text-center py-20 flex flex-col items-center justify-center gap-3">
          <ImSpinner2 className="animate-spin text-[#D9176C]" size={32} />
          <p className="text-gray-500">Loading Orders...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center flex flex-col items-center justify-center gap-4 mt-6">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
            <Package className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">No orders found</h3>
            <p className="text-sm text-gray-500 mt-1">
              {filterStatus !== "all" 
                ? `No orders match the status "${filterStatus}".` 
                : "There are no customer orders available at the moment."}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex gap-2 overflow-x-auto sm:flex-wrap">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-4 py-2 rounded-lg transition-colors bg-blue-600 text-white cursor-pointer`}
              >
                All Orders ({orders.length})
              </button>
            </div>
          </div>

          {filteredOrders.map((order) => {
            const isExpanded = selectedOrderId === order.id;

            return (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex items-start justify-between gap-3 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                        <Package className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-base sm:text-lg">
                          Order #{order.id}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {order.created_at}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 text-xs font-semibold rounded-full shrink-0 ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 text-sm">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Customer Info</p>
                      <p className="font-medium text-gray-800">Name: {order.userName}</p>
                      <p className="text-gray-600 truncate">Email: {order.email}</p>
                      <p className="text-gray-600">Phone: {order.phone}</p>
                    </div>

                    <div className="space-y-1 sm:text-right">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Payment & Total</p>
                      <p className="font-bold text-gray-900 text-base">
                        {order.totalPrice.toFixed(2)} EGP
                      </p>
                      <p className="text-gray-600">
                        {paymentMethodMap[order.paymentMethod] || "Unknown method"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <button
                      onClick={() => handleToggleDetails(order.id)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-2 cursor-pointer focus:outline-none"
                    >
                      <span>
                        {isExpanded ? "Hide Order Details" : "View Order Details"}
                      </span>
                      <FaArrowRight
                        className={`transition-transform duration-300 ${
                          isExpanded ? "rotate-90" : "rotate-0"
                        }`}
                        size={14}
                      />
                    </button>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-2">
                      <span className="text-xs text-gray-500 font-medium sm:hidden">Update Status:</span>
                      <div className="relative w-40">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`w-full appearance-none text-xs font-semibold rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all cursor-pointer ${
                            order.status === "pending"
                              ? "bg-amber-50 text-amber-700 border border-amber-200 focus:ring-amber-500"
                              : "bg-blue-50 text-blue-700 border border-blue-200 focus:ring-blue-500"
                          }`}
                        >
                          <option value="pending" className="bg-white text-gray-800">⏳ Pending</option>
                          <option value="shipped" className="bg-white text-gray-800">📦 Shipped</option>
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`w-3.5 h-3.5 ${
                              order.status === "pending" ? "text-amber-500" : "text-blue-500"
                            }`}
                          >
                            <path d="m6 9 6 6 6-6"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
                      isExpanded
                        ? "grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-gray-200"
                        : "grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <h4 className="font-medium text-gray-800 mb-3 text-sm">
                        Order Items Details
                      </h4>

                      {isLoadingDetails && isExpanded ? (
                        <div className="flex items-center justify-center py-4 text-gray-500 gap-2 text-sm">
                          <ImSpinner2 className="animate-spin text-blue-600" size={16} />
                          Loading items...
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {orderDetails?.map((item, index) => {
                            const currentBook = book?.find((b) => b.id === item.bookId);
                            
                            return (
                              <div
                                key={index}
                                className="p-2.5 bg-gray-50 rounded-lg"
                              >
                                <div className="flex lg:flex-row md:flex-row md:items-center flex-col lg:items-center justify-between text-sm">
                                  <div>
                                    <p className="font-medium text-gray-800">Book ID: {item.bookId}</p>
                                    <p className="font-medium text-gray-800">
                                      Book Name : {currentBook ? currentBook.bookName : `Book ID: ${item.bookId}`}
                                    </p>
                                    <p className="text-xs text-gray-500">Quantity: {item.qty}</p>
                                  </div>
                                  <p className="font-semibold text-gray-800">
                                    {(item.price * item.qty).toFixed(2)} EGP
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!isOrdersLoading && filteredOrders.length > 0 && (
        <div className="flex gap-10 mt-6 items-center justify-center">
          <button
            className="py-2 px-5 bg-[#ed6be0] rounded-xl cursor-pointer disabled:opacity-50 text-white font-medium"
            disabled={Ordermeta?.current_page === 1}
            onClick={() => setOrderPage((p) => p - 1)}
          >
            Prev
          </button>

          <span className="font-medium text-gray-700">
            {Ordermeta?.current_page} / {Ordermeta?.last_page}
          </span>

          <button
            className="py-2 px-5 bg-[#ed6be0] rounded-xl cursor-pointer disabled:opacity-50 text-white font-medium"
            disabled={Ordermeta?.current_page === Ordermeta?.last_page}
            onClick={() => setOrderPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
import { useState } from "react";
import { useStore } from "../hooks/useStore";
import { ChevronDown, ChevronUp, Package } from "lucide-react";
import { ImSpinner2 } from "react-icons/im";

export function Orders() {
  const { Ordermeta, Order, updateOrderStatus, setOrderPage, OrderPage, isOrdersLoading } = useStore();
  const orders = Order || [];
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders?.filter((order) => order.status === filterStatus);

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
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
    <div className="space-y-6 p-4 sm:p-6 ">
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
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row md:flex-row lg:items-center justify-between gap-4 w-full">
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex self-start items-center justify-center">
                      <Package className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="w-full">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-800">
                          Order #{order.id}
                        </h3>
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex lg:flex-row md:flex-row flex-col lg:gap-0 md:gap-0 gap-2 justify-between w-full">
                        <div className="flex flex-col gap-1 sm:gap-2">
                          <p className="text-sm text-gray-600 mt-1">
                            {order.userName}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {order.email}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {order.phone}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 lg:flex-row md:flex-col">
                          <div className="text-left sm:text-left flex flex-col gap-2 sm:gap-3">
                            <p className="text-sm text-gray-500">
                              Date : {order.created_at}
                            </p>
                            <p className="text-sm text-gray-500">
                              Total : {order.totalPrice.toFixed(2)} EGP
                            </p>
                            <p className="text-sm text-gray-500">
                              Payment method :{" "}
                              {paymentMethodMap[order.paymentMethod] ||
                                "Unknown method"}
                            </p>
                          </div>

<div className="relative inline-block w-full sm:w-44">
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
                    </div>
                  </div>
                </div>

                {expandedOrder === order.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-4">
                      Order Items
                    </h4>
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-gray-800">
                              {item.title}
                            </p>
                            <p className="text-sm text-gray-600">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <p className="font-medium text-gray-800">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {!isOrdersLoading && filteredOrders.length > 0 && (
        <div className="flex gap-10 mt-6 items-center justify-center">
          <button
            className="py-2 px-5 bg-[#ed6be0] rounded-xl cursor-pointer disabled:opacity-50"
            disabled={Ordermeta?.current_page === 1}
            onClick={() => setOrderPage((p) => p - 1)}
          >
            Prev
          </button>

          <span>
            {Ordermeta?.current_page} / {Ordermeta?.last_page}
          </span>

          <button
            className="py-2 px-5 bg-[#ed6be0] rounded-xl cursor-pointer disabled:opacity-50"
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
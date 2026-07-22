import { useStore } from "../hooks/useStore";
import {
  BookOpen,
  FolderOpen,
  ShoppingCart,
  Users,
  TrendingUp,
  DollarSign,
  Loader2,
} from "lucide-react";

export function Dashboard() {
const { 
    book, meta, Categorie, Ordermeta, Order, users,
    isBooksLoading, isCategoriesLoading, isOrdersLoading, isLoading: isUsersLoading 
  } = useStore();

  const totalRevenue = Order?.reduce((sum, order) => sum + order.totalPrice, 0);
  const pendingOrders = Order?.filter(
    (order) => order.status === "pending",
  ).length;
  const lowStockBooks = book?.filter((book) => book.stock < 30).length;


const stats = [
  { label: "Total Books", value: meta?.total, icon: BookOpen, color2: "text-blue-600", color: "bg-blue-100 text-blue-600", loading: isBooksLoading },
  { label: "Categories", value: Categorie?.meta?.total, icon: FolderOpen, color2: "text-purple-600", color: "bg-purple-100 text-purple-600", loading: isCategoriesLoading },
  { label: "Total Orders", value: Ordermeta?.total, icon: ShoppingCart, color2: "text-green-600", color: "bg-green-100 text-green-600", loading: isOrdersLoading },
  { label: "Total Users", value: users?.meta?.total, icon: Users, color2: "text-orange-600", color: "bg-orange-100 text-orange-600", loading: isUsersLoading },
];
  const recentOrders = Order?.slice(0, 8).sort((a, b) => b.id - a.id);


const StatValue = ({ loading, value, label , color2 }) => {
  if (loading) {

    return <Loader2 className={`w-6 h-6 animate-spin ${color2}`} />;
  }

  return <span className="text-2xl font-semibold text-gray-800">{value ?? 0}</span>;
};


  return (
    <div className="space-y-6 p-4 sm:p-6 ">

      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Dashboard
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Welcome to your bookstore admin panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
{stats.map((stat) => (
  <div key={stat.label} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
    <div className="flex items-center justify-between flex-wrap gap-2">
      <div>
        <p className="text-sm text-gray-600">{stat.label}</p>
        <div className="mt-2">
          <StatValue loading={stat.loading} value={stat.value} color2={stat.color2} label={stat.label} />
        </div>
      </div>
      <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
        <stat.icon className="w-6 h-6" />
      </div>
    </div>
  </div>
))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
<div>
    <p className="text-sm text-gray-600">Total Revenue</p>
    {isOrdersLoading ? (
      <Loader2 className="w-6 h-6 animate-spin text-green-600 mt-1" />
    ) : (
      <p className="text-2xl font-semibold text-gray-800">
        ${totalRevenue?.toFixed(2)}
      </p>
    )}
  </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-yellow-600" />
            </div>
<div>
    <p className="text-sm text-gray-600">Pending Orders</p>
    
    {isOrdersLoading ? (
      <Loader2 className="w-6 h-6 animate-spin text-yellow-600 mt-1" />
    ) : (
      <p className="text-2xl font-semibold text-gray-800">
        {pendingOrders}
      </p>
    )}
  </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-red-600" />
            </div>
<div>
    <p className="text-sm text-gray-600">Low Stock Alert</p>
        {isBooksLoading ? (
      <Loader2 className="w-6 h-6 animate-spin text-red-600 mt-1" />
    ) : (
      <p className="text-2xl font-semibold text-gray-800">
        {lowStockBooks}
      </p>
    )}
  </div>
          </div>
        </div>
      </div>

{isOrdersLoading ? (
        <div className="text-center py-20 text-gray-500">Loading Orders...</div>
      ) : (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders?.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {" "}
                    #{order.id}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {" "}
                    {order.userName}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {order.created_at}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    ${order?.totalPrice?.toFixed(2)}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}
    </div>
  );
}

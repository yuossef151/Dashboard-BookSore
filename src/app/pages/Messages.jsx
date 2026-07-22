import { MessageSquare } from "lucide-react";
import { useStore } from "../hooks/useStore";
import { ImSpinner2 } from "react-icons/im";

export default function Messages() {
  const { Messagepage, setMessagePage, Message, isMessagesLoading, error6 } = useStore();

  // لو الخطأ ليس 401 (يعني خطأ حقيقي في السيرفر)، اعرضه. 
  // أما لو الخطأ 401، سنتجاهله ونسمح للصفحة بعرض حالة الفراغ بشكل طبيعي.
  const hasRealError = error6 && error6.response?.status !== 401;

  if (hasRealError) {
    return <div className="p-6 text-red-600">Error: {error6.message}</div>;
  }

  // هل القائمة فارغة سواء بسبب عدم وجود بيانات أو بسبب خطأ 401؟
  const isMessageEmpty = !Message?.items || Message.items.length === 0 || (error6 && error6.response?.status === 401);

  return (
    <>
      <div className="p-6 min-h-screen space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="text-blue-600 w-6 h-6" />
          <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
        </div>

        {isMessagesLoading ? (
          <div className="text-center py-20 flex flex-col items-center justify-center gap-3">
            <ImSpinner2 className="animate-spin text-[#D9176C]" size={32} />
            <p className="text-gray-500">Loading messages...</p>
          </div>
        ) : isMessageEmpty ? (
          /* رسالة حالة الفراغ في حال لم تكن هناك رسائل أو حدث خطأ 401 */
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center flex flex-col items-center justify-center gap-4 mt-6">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
              <MessageSquare className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">No messages found</h3>
              <p className="text-sm text-gray-500 mt-1">
                There are no customer messages available at the moment.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {Message?.items?.map((msg, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition"
              >
                <div className="mb-2">
                  <h2 className="font-semibold text-lg text-gray-800">{msg.userName}</h2>
                  <p className="text-sm text-gray-500">{msg.email}</p>
                </div>

                <p className="text-gray-700 leading-relaxed">{msg.message}</p>
              </div>
            ))}
          </div>
        )}

        {/* إخفاء الـ Pagination لو مفيش رسائل أو حدث خطأ 401 */}
        {!isMessagesLoading && !isMessageEmpty && (
          <div className="flex gap-10 mt-6 items-center justify-center">
            <button
              className="py-2 px-5 bg-[#ed6be0] rounded-xl cursor-pointer disabled:opacity-50"
              disabled={isMessagesLoading || Message?.meta?.current_page === 1}
              onClick={() => setMessagePage((p) => p - 1)}
            >
              Prev
            </button>

            <span>
              {Message?.meta?.current_page} / {Message?.meta?.last_page}
            </span>

            <button
              className="py-2 px-5 bg-[#ed6be0] rounded-xl cursor-pointer disabled:opacity-50"
              disabled={
                isMessagesLoading ||
                Message?.meta?.current_page === Message?.meta?.last_page
              }
              onClick={() => setMessagePage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}
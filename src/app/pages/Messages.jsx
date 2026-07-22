import { MessageSquare } from "lucide-react";
import { useStore } from "../hooks/useStore";
import {  useState  } from "react";
export default function Messages() {
  
const { Messagepage, setMessagePage, Message, isMessagesLoading , error6 } = useStore();

  console.log(Message);
  if (error6) return <div>Error: {error6.message}</div>;
  return (
    <>
      <div className="p-6  min-h-screen">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="text-blue-600" />
          <h1 className="text-2xl font-bold">Messages</h1>
        </div>
{isMessagesLoading ? (
        <div className="text-center py-20">Loading...</div>
      ) : (
        <div className="grid gap-4">
          {Message?.items?.map((msg, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="mb-2">
                <h2 className="font-semibold text-lg">{msg.userName}</h2>
                <p className="text-sm text-gray-500">{msg.email}</p>
              </div>

              <p className="text-gray-700 leading-relaxed">{msg.message}</p>
            </div>
          ))}
        </div>
)}
              <div className="flex gap-10 mt-6 items-center justify-center">
        <button
          className="py-2 px-5 bg-[#ed6be0] rounded-xl"
          disabled={isMessagesLoading || Message?.meta?.current_page === 1}
          onClick={() => setMessagePage((p) => p - 1)}
        >
          Prev
        </button>

        <span>
          {Message?.meta?.current_page} / {Message?.meta?.last_page}
        </span>

        <button
          className="py-2 px-5 bg-[#ed6be0] rounded-xl"
disabled={
            isMessagesLoading || 
            Message?.meta?.current_page === Message?.meta?.last_page
          }
          onClick={() => setMessagePage((p) => p + 1)}
        >
          Next
        </button>
      </div>
      </div>
    </>
  );
}

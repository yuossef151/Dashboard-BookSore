import { useParams, useNavigate } from "react-router";
import { useStore } from "../hooks/useStore";
import { useEffect, useState } from "react";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";

export const SingleBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { book, deleteBook, deleteimg } = useStore();
const [activeImageId, setActiveImageId] = useState(() => {
  return localStorage.getItem(`mainImage-${id}`);
});
  const [singleBook, setSingleBook] = useState(null);

  useEffect(() => {
    const foundBook = book.find((b) => b.id == id);
    setSingleBook(foundBook);
  }, [id, book]);



const activeImage =
  singleBook?.image?.find(
    (img) => String(img.id) === String(activeImageId)
  ) ||
  singleBook?.image?.at(-1);



  if (!singleBook) {
    return <div className="p-10 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 cursor-pointer  text-gray-600 hover:text-black"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden grid md:grid-cols-2 gap-6">
        {/* Image */}
        <div className="h-[400px] bg-gray-100">
          <img
            src={activeImage?.image}
            alt={singleBook.bookName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {singleBook.bookName}
            </h1>

            <p className="text-gray-600 mt-2">by {singleBook.author}</p>

            <p className="text-gray-500 mt-4 leading-relaxed">
              {singleBook.description}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-xl font-semibold text-gray-800">
                  ${singleBook.price}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Stock</p>
                <p
                  className={`text-xl font-semibold ${
                    singleBook.stock < 30 ? "text-red-600" : "text-gray-800"
                  }`}
                >
                  {singleBook.stock}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded">
                {singleBook.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 pt-10 flex-wrap">
        {singleBook?.image?.map((img, index) => {
          return (
            <div
              key={index}
              className="relative group w-50 h-60 rounded-lg overflow-hidden shadow-sm"
            >
              <img
                src={img?.image}
                alt=""
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

              <button
                onClick={() => {
                  deleteimg(img.id);
                }}
                className="absolute bottom-3 left-1/4 -translate-x-1/2 
                     opacity-0 group-hover:opacity-100 
                     transition-all duration-300
                     bg-red-600 text-white text-sm px-3 py-1 rounded-lg
                     hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setActiveImageId(img.id);
                  localStorage.setItem(`mainImage-${id}`, img.id);
                }}
                className="absolute bottom-3 right-0 -translate-x-1/2 
                     opacity-0 group-hover:opacity-100 
                     transition-all duration-300
                     bg-[#00fffb] text-white text-sm px-3 py-1 rounded-lg
                     hover:bg-[#07ddda]"
              >
                Main
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

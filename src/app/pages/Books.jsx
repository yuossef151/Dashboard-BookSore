import { useEffect, useRef, useState } from "react";
import { useStore } from "../hooks/useStore";
import { BookModal } from "../components/BookModal";
import { Plus, Edit, Trash2, Search, BookOpen } from "lucide-react"; 
import { UploadBookImageAPI } from "../services/mockData";
import { useQueryClient } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router";
import { ImSpinner2 } from "react-icons/im";

export function Books() {
  const {
    book,
    page,
    setPage,
    meta,
    addBook,
    deleteBook,
    updateBook,
    Categorie,
    uploadBookImage,
    singlbook,
    setsinglbook,
    isBooksLoading: isLoading,
  } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [imageBookId, setImageBookId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const filteredBooks = book?.filter(
    (b) =>
      (b?.bookName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b?.author || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b?.category || "").toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAddBook = () => {
    setSelectedBook(null);
    setIsModalOpen(true);
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleSaveBook = (data) => {
    console.log("SAVE CLICKED", data);

    if (selectedBook) {
      console.log("UPDATING ID:", selectedBook.id);
      updateBook(selectedBook.id, data);
    } else {
      addBook(data);
    }

    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !imageBookId) return;

    try {
      await uploadBookImage(imageBookId, file);
      queryClient.invalidateQueries({ queryKey: ["book"] });
      setImageBookId(null);
    } catch (err) {
      console.log("UPLOAD ERROR:", err);
    }
  };

  useEffect(() => {
    console.log(singlbook);
  }, [singlbook]);

  const getActiveImage = (book) => {
    const savedId = localStorage.getItem(`mainImage-${book.id}`);

    return (
      book?.image?.find((img) => String(img.id) === String(savedId)) ||
      book?.image?.at(-1)
    );
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 ">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Books</h1>
          <p className="text-gray-600 mt-1">Manage your book inventory</p>
        </div>
        <button
          onClick={handleAddBook}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Book
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-20 flex flex-col items-center justify-center gap-3">
          <ImSpinner2 className="animate-spin text-[#D9176C]" size={32} />
          <p className="text-gray-500">Loading books...</p>
        </div>
      ) : filteredBooks?.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center flex flex-col items-center justify-center gap-4 mt-6">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">No books found</h3>
            <p className="text-sm text-gray-500 mt-1">
              {searchQuery ? "No results match your search query." : "Get started by adding your first book to the inventory."}
            </p>
          </div>
          {!searchQuery && (
            <button
              onClick={handleAddBook}
              className="mt-2 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add New Book
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 pt-10 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredBooks?.map((book, index) => {
            const activeImg = getActiveImage(book);
            return (
              <div
                onClick={() => {
                  setsinglbook(book);
                  navigate(`/books/${book.id}`);
                }}
                key={index}
                className="bg-white rounded-lg cursor-pointer shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-gray-100 overflow-hidden relative">
                  {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <ImSpinner2 className="animate-spin text-[#D9176C]" size={24} />
                    </div>
                  )}
                  <img
                    src={activeImg?.image}
                    alt={book.bookName}
                    className="w-full h-full object-cover"
                    onLoad={() => setIsLoaded(true)}
                  />
                  <button
                    className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1 text-white rounded-xl py-2 px-3 absolute bottom-0 right-0 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageBookId(book.id);

                      setTimeout(() => {
                        fileInputRef.current?.click();
                      }, 0);
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    Add Image
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {book.bookName}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{book.author}</p>
                  <p className="text-sm text-gray-600 mt-1">{book.description}</p>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="text-lg font-semibold text-gray-800">
                        ${book.price}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Stock</p>
                      <p
                        className={`text-lg font-semibold ${book.stock < 30 ? "text-red-600" : "text-gray-800"}`}
                      >
                        {book.stock}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                      {book.category}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditBook(book);
                      }}
                      className="flex-1 flex cursor-pointer items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteBook(book.id);
                      }}
                      className="flex-1 flex cursor-pointer items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleImageChange}
      />

      {filteredBooks?.length > 0 && (
        <div className="flex gap-10 mt-6 items-center justify-center">
          <button
            className="py-2 px-5 bg-[#ed6be0] rounded-xl cursor-pointer disabled:opacity-50"
            disabled={meta?.current_page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>

          <span>
            {meta?.current_page} / {meta?.last_page}
          </span>

          <button
            className="py-2 px-5 bg-[#ed6be0] rounded-xl cursor-pointer disabled:opacity-50"
            disabled={meta?.current_page === meta?.last_page}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}

      {isModalOpen && (
        <BookModal
          book={selectedBook}
          categories={Categorie}
          onSave={handleSaveBook}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedBook(null);
          }}
        />
      )}
    </div>
  );
}
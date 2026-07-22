import { useState, useEffect } from "react";
import { X } from "lucide-react";
import EditForm from "./form/EditForm";
import AddForm from "./form/AddForm";

export function BookModal({ book, categories, onSave, onClose }) {
  const emptyForm = {
    bookName: "",
    author: "",
    price: "",
    category: "",
    description: "",
    stock: "",
    asinCode: "",
    lang: "english",
    numberOfPages: "",
    publicationYear: "",
    bookFormat: "",
    image: null,
  };
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (book) {
      setFormData({
        bookName: book.bookName || "",
        author: book.author || "",
        price: book.price || "",
        category: book.category || "",
        description: book.description || "",
        stock: book.stock || "",
        asinCode: book.asinCode || "",
        lang: book.lang || "english",
        numberOfPages: book.pages || "",
        publicationYear: book.year || "",
        bookFormat: book.bookFormat || "Hard Cover",
        image: null,
      });
    } else {
      setFormData(emptyForm);
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    console.log("FORM DATA STATE:", formData);
    dataToSend.append("title", formData.bookName);
    dataToSend.append("author", formData.author);
    dataToSend.append("lang", formData.lang || "english");
    dataToSend.append("price", formData.price);
    dataToSend.append("number_of_pages", formData.numberOfPages);
    dataToSend.append("asin_code", formData.asinCode);
    dataToSend.append("publication_year", formData.publicationYear);
    dataToSend.append("description", formData.description);
    dataToSend.append("stock", formData.stock);
    dataToSend.append("book_format", formData.bookFormat || "Hard Cover");
    dataToSend.append("category_id", formData.category);
    dataToSend.append("status", 1);
    dataToSend.append("best_selling", 0);

    if (formData.image) {
      dataToSend.append("image[]", formData.image);
    }

    if (book) {
      onSave(dataToSend, book.id);
    } else {
      onSave(dataToSend);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log("INPUT:", name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
          <h2 className="text-xl font-semibold text-gray-800">
            {book ? "Edit Book" : "Add New Book"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        {book ? (
          <EditForm
            handleSubmit={handleSubmit}
            formData={formData}
            handleChange={handleChange}
            onClose={onClose}
            book={book}
            categories={categories}
          />
        ) : (
          <AddForm
            handleSubmit={handleSubmit}
            formData={formData}
            handleChange={handleChange}
            onClose={onClose}
            categories={categories}
            setFormData={setFormData}
            handleFileChange={handleFileChange}
          />
        )}
      </div>
    </div>
  );
}

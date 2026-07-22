import React from "react";

export default function AddForm({ handleSubmit  , handleFileChange ,setFormData , formData , handleChange ,onClose ,categories   }) {
  return (
<>
<form onSubmit={handleSubmit} className="p-6 space-y-4">

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Title *
      </label>
      <input
        type="text"
        name="bookName"
        value={formData?.bookName || ""}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Author *
      </label>
      <input
        type="text"
        name="author"
        value={formData?.author || ""}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Price *
      </label>
      <input
        type="number"
        name="price"
        value={formData?.price || ""}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Category *
      </label>
      <select
        name="category"
        value={formData?.category || ""}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select a category</option>
        {categories?.items?.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.categoryName}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Number of Pages *
      </label>
      <input
        type="number"
        name="numberOfPages"
        value={formData?.numberOfPages || ""}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Publication Year *
      </label>
      <input
        type="number"
        name="publicationYear"
        value={formData?.publicationYear || ""}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Stock *
      </label>
      <input
        type="number"
        name="stock"
        value={formData?.stock || ""}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        ASIN Code *
      </label>
      <input
        type="text"
        name="asinCode"
        value={formData?.asinCode || ""}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Language *
      </label>
      <input
        type="text"
        name="lang"
        value={formData?.lang || ""}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Book Format *
      </label>
      <select
        name="bookFormat"
        value={formData?.bookFormat || ""}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Hard Cover">Hard Cover</option>
        <option value="Paper Back">Paper Back</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Status *
      </label>
      <select
        name="status"
        value={formData?.status || 1}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value={1}>Active</option>
        <option value={0}>Inactive</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Best Selling *
      </label>
      <select
        name="bestSelling"
        value={formData?.bestSelling || 0}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value={0}>No</option>
        <option value={1}>Yes</option>
      </select>
    </div>

  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Description *
    </label>
    <textarea
      name="description"
      value={formData?.description || ""}
      onChange={handleChange}
      rows={3}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Image *
    </label>
    <input
      type="file"
      accept="image/*"
onChange={handleFileChange}
      className="w-full"
    />
  </div>

  <div className="flex gap-3 pt-4">
    <button
      type="submit"
      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
    >
      Add Book
    </button>

    <button
      type="button"
      onClick={onClose}
      className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
    >
      Cancel
    </button>
  </div>

</form>
</>
  );
}

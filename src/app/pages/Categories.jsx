import { useState } from "react";
import { useStore } from "../hooks/useStore";
import { CategoryModal } from "../components/CategoryModal";
import { Plus, Edit, Trash2, FolderOpen } from "lucide-react";

export function Categories() {
  const {
    addCategory,
    updateCategory,
    deleteCategory,
    Categorie,
    categpage,
    setcategPage,
    isCategoriesLoading: loading,
  } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleSaveCategory = (categoryData) => {
    if (selectedCategory) {
      updateCategory(selectedCategory.id, categoryData);
    } else {
      addCategory(categoryData);
    }
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const handleDeleteCategory = (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      deleteCategory(id);
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Categories</h1>
          <p className="text-gray-600 mt-1">Manage book categories</p>
        </div>
        <button
          onClick={handleAddCategory}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>
{loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {Categorie?.items?.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {category.categoryName}
                  </h3>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEditCategory(category)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      )}
      <div className="flex gap-10 mt-6 items-center justify-center">
        <button
          className="py-2 px-5 bg-[#ed6be0] rounded-xl"
          disabled={Categorie?.meta?.current_page === 1}
          onClick={() => setcategPage((p) => p - 1)}
        >
          Prev
        </button>

        <span>
          {Categorie?.meta?.current_page} / {Categorie?.meta?.last_page}
        </span>

        <button
          className="py-2 px-5 bg-[#ed6be0] rounded-xl"
          disabled={
            Categorie?.meta?.current_page === Categorie?.meta?.last_page
          }
          onClick={() => setcategPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
      {Categorie?.items?.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No categories found</p>
        </div>
      )}

      {isModalOpen && (
        <CategoryModal
          category={selectedCategory}
          onSave={handleSaveCategory}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCategory(null);
          }}
        />
      )}
    </div>
  );
}

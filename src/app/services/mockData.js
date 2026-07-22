// Mock data for the bookstore dashboard

import axios from "axios";

const api = axios.create({
  baseURL: "https://bookstore.eraasoft.pro/api/dashboard",
});

    const token = sessionStorage.getItem("token")
    console.log(token);
    



    export const normalizeBook = (b) => ({
  id: b.bookId,
  bookName: b.bookName,
  author: b.author,
  price: b.price,
  description: b.description,
  stock: b.stock,
  category: b.catId,
  image: b.bookImage || "",
  pages: b.numberOfPages,
  year: b.publicationYear,
  format: b.bookFormat,
  lang: b.lang,
  asinCode: b.asinCode,
});


export const createBookPayload = (b) => ({
  bookName: b.bookName,
  author: b.author,
  price: b.price,
  description: b.description,
  stock: b.stock,
  category_id: b.category,
  numberOfPages: b.pages,
  publicationYear: b.year,
  bookFormat: b.format,
  lang: b.lang,
  asin_code: b.asinCode,
  image: b.image ? [b.image] : [], // 👈 مهم
});

export const updateBookPayload = (b) => ({
  bookName: b.bookName,
  author: b.author,
  price: b.price,
  description: b.description,
  stock: b.stock,
  category_id: b.category,
  numberOfPages: b.pages,
  publicationYear: b.year,
  bookFormat: b.format,
  lang: b.lang,
  asin_code: b.asinCode,
});

export const loginAPI = (data) => {
  return api.post(`/admin-login`,data );
};
export const BooksAPI = (page = 1) => {
  return api.get(`/book?page=${page}` , {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const UpdeteBooksAPI = (id, formData) => {
  return api.post(`/book/update/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const UploadBookImageAPI = (id, file) => {
  const formData = new FormData();
  formData.append("image", file);

  return api.post(`/book/add-image/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};




export const AddBookAPI = (data) => {
  return api.post("/book/store", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteBookAPI = (id) => {
  return api.delete(`/book/destroy/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteimgAPI = (id) => {
  return api.delete(`/book/delete-book-image/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};




export const CategoriesAPI = (page = 1) => {
  return api.get(`/category?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const AddCategoryAPI = (data) => {
  return api.post("/category/store", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const UpdetecategoryAPI = (id, formData) => {
  return api.post(`/category/update/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const deletecategoryAPI = (id) => {
  return api.delete(`/category/destroy/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const OrdarAPI = (page = 1) => {
  return api.get(`/order?page=${page}` , {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateOrderStatusAPI = (id, status) => {
  return api.post(`/order/update-status/${id}`, { status }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const UsersAPI = (page = 1) => {
  return api.get(`/users?page=${page}` , {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const MessageAPI = (page = 1) => {
  return api.get(`/contact?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const mockUsers = []
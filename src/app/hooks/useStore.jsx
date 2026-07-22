import {
  AddBookAPI,
  AddCategoryAPI,
  BooksAPI,
  CategoriesAPI,
  deleteBookAPI,
  deletecategoryAPI,
  deleteimgAPI,
  MessageAPI,
  mockUsers,
  normalizeBook,
  OrdarAPI,
  updateBookPayload,
  updateOrderStatusAPI,
  UpdeteBooksAPI,
  UpdetecategoryAPI,
  UploadBookImageAPI,
  UsersAPI,
} from "../services/mockData";
import { createContext, useContext, useState, useEffect } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const [page, setPage] = useState(
    () => Number(localStorage.getItem("bookPage")) || 1,
  );
  const [singlbook, setsinglbook] = useState([]);
  const [OrderPage, setOrderPage] = useState(
    () => Number(localStorage.getItem("orderPage")) || 1,
  );
  const [UsersPage, setUsersPage] = useState(
    () => Number(localStorage.getItem("usersPage")) || 1,
  );
  const [categpage, setcategPage] = useState(
    () => Number(localStorage.getItem("categPage")) || 1,
  );
  const [Messagepage, setMessagePage] = useState(
    () => Number(localStorage.getItem("msgPage")) || 1,
  );

  // Books CRUD

  useEffect(() => {
    localStorage.setItem("bookPage", page);
  }, [page]);
  useEffect(() => {
    localStorage.setItem("orderPage", OrderPage);
  }, [OrderPage]);
  useEffect(() => {
    localStorage.setItem("usersPage", UsersPage);
  }, [UsersPage]);
  useEffect(() => {
    localStorage.setItem("categPage", categpage);
  }, [categpage]);
  useEffect(() => {
    localStorage.setItem("msgPage", Messagepage);
  }, [Messagepage]);

  const resetAllPagesExcept = (pageSetter) => {
    setPage(1);
    setOrderPage(1);
    setUsersPage(1);
    setcategPage(1);
    setMessagePage(1);
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["book", page],
    queryFn: async () => {
      const res = await BooksAPI(page);
      return {
        books: res.data.data.items.map(normalizeBook),
        meta: res.data.data.meta,
      };
    },
  });
  // if (error) console.log(error);
  const book = data?.books || [];
  const meta = data?.meta;

  const {
    data: Orderdata,
    isLoading: isOrdersLoading,
    error3,
  } = useQuery({
    queryKey: ["Orders", OrderPage],
    queryFn: async () => {
      const res = await OrdarAPI(OrderPage);
      return {
        orderdata: res.data.data.items,
        meta: res.data.data.meta,
      };
    },
    keepPreviousData: true,
  });
  const Order = Orderdata?.orderdata || [];
  const Ordermeta = Orderdata?.meta;

  const queryClient = useQueryClient();

  const updateBookMutation = useMutation({
    mutationFn: ({ id, data }) => UpdeteBooksAPI(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["book"],
      });
    },
    onError: (error) => {},
  });
  const updateBook = (id, data) => {
    const payload = updateBookPayload(data);
    updateBookMutation.mutate({ id, data });
  };

  const uploadBookImage = async (id, file) => {
    const formData = new FormData();
    formData.append("image", file);

    await UploadBookImageAPI(id, file);
  };

  const addBookMutation = useMutation({
    mutationFn: (data) => AddBookAPI(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["book"] });
    },

    onError: (error) => {},
  });

  const addBook = (data) => {
    addBookMutation.mutate(data);
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteBookAPI(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["book"], exact: false });
    },

    onError: (error) => {
      console.log("DELETE ERROR:", error?.response?.data);
    },
  });
  const deleteBook = (id) => {
    deleteMutation.mutate(id);
  };

  const deleteimgMutation = useMutation({
    mutationFn: (id) => deleteimgAPI(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["book"], exact: false });
    },

    onError: (error) => {
      console.log("DELETE ERROR:", error?.response?.data);
    },
  });
  const deleteimg = (id) => {
    deleteimgMutation.mutate(id);
  };

  // Categories CRUD

  const {
    data: Categorie,
    isLoading: loading,
    error: error2,
  } = useQuery({
    queryKey: ["Categories", categpage],
    queryFn: async () => {
      const res = await CategoriesAPI(categpage);
      return res.data.data;
    },
  });

  const addCategoryMutation = useMutation({
    mutationFn: (data) => AddCategoryAPI(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Categories"] });
    },

    onError: (error) => {},
  });

  const addCategory = (data) => {
    addCategoryMutation.mutate(data);
  };

  const updatecategoryMutation = useMutation({
    mutationFn: ({ id, data }) => UpdetecategoryAPI(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Categories"],
      });
    },
    onError: (error) => {},
  });
  const updateCategory = (id, data) => {
    // const payload = updatePayload(data);
    updatecategoryMutation.mutate({ id, data });
  };

  const deleteCategoriesMutation = useMutation({
    mutationFn: (id) => deletecategoryAPI(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Categories"], exact: false });
    },

    onError: (error) => {},
  });
  const deleteCategory = (id) => {
    deleteCategoriesMutation.mutate(id);
  };

  const updateOrderStatusMutation = useMutation({
    mutationFn: ({ id, status }) => updateOrderStatusAPI(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Orders"] });
    },

    onError: (error) => {},
  });
  const updateOrderStatus = (id, status) => {
    updateOrderStatusMutation.mutate({ id, status });
  };

  const {
    data: Usersdata,
    isLoading:isLoading4,
    error4,
  } = useQuery({
    queryKey: ["Users", UsersPage],
    queryFn: async () => {
      const res = await UsersAPI(UsersPage);
      return {
        usersdata: res.data.data.items,
        meta: res.data.data.meta,
      };
    },
  });

  const {
    data: Message,
    isLoading: isMessagesLoading,
    error: error6,
  } = useQuery({
    queryKey: ["Messagepage", Messagepage],
    queryFn: async () => {
      const res = await MessageAPI(Messagepage);
      return res.data.data;
    },
    keepPreviousData: true,
  });
  const users = Usersdata;

  const value = {
    book,
    meta,
    page,
    setPage,
    isBooksLoading: isLoading,

    Order,
    Ordermeta,
    OrderPage,
    setOrderPage,
    isOrdersLoading,

    users,
    UsersPage,
    setUsersPage,
    isLoading:isLoading4,

    Categorie,
    categpage,
    setcategPage,
    isCategoriesLoading: loading,

    Message,
    Messagepage,
    setMessagePage,
    isMessagesLoading,

    addBook,
    updateBook,
    deleteBook,
    addCategory,
    updateCategory,
    deleteCategory,
    updateOrderStatus,
    uploadBookImage,
    singlbook,
    setsinglbook,
    deleteimg,
    isOpen,
    setIsOpen,
    error6,
    resetAllPagesExcept,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}

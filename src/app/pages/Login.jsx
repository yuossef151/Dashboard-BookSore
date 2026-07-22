import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { loginAPI } from "../services/mockData";

export default function Login() {
  const [error, seterror] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const loginMutation = useMutation({
    mutationFn: (data) => loginAPI(data),

    onSuccess: (res) => {
      console.log("LOGIN SUCCESS:", res.data);

      sessionStorage.setItem("token", res.data.data.token);
      sessionStorage.setItem("email", res.data.data.email);

      // التوجيه الصحيح المتوافق مع مسار المشروع (سواء محلياً أو على GitHub Pages)
      const base = import.meta.env.BASE_URL;
      window.location.href = base; 
    },

    onError: (err) => {
      console.log("LOGIN ERROR:", err);
      seterror("Incorrect password or email address");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("LOGIN DATA:", formData);
    loginMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <p className="mb-6 text-[#ff0000]">{error}</p>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
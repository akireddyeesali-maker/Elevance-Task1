import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/user/login",
        formData
      );

      toast.success("Login successful");

      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-gray-900">
          User Login
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">

          <div>
            <label className="text-gray-700">
              Email
            </label>

            <div className="relative mt-2">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20}/>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full pl-10 p-2 border rounded text-black"
              />
            </div>
          </div>


          <div>
            <label className="text-gray-700">
              Password
            </label>

            <div className="relative mt-2">

              <Lock className="absolute left-3 top-3 text-gray-400" size={20}/>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full pl-10 p-2 border rounded text-black"
              />

            </div>
          </div>


          <div className="text-right">

            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>

          </div>


          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>


        </form>

      </div>

    </div>
  );
};

export default Login;
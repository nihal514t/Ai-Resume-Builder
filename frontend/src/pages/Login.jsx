import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(formData);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-slate-500 text-center mb-8">
          Sign in to your account
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <Input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <Button
            type="submit"
            className="w-full"
          >
            Login
          </Button>
        </form>

        <p className="text-center text-slate-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
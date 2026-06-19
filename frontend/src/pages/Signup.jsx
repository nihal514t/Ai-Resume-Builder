import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { register } = useAuth();

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
      await register(formData);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-slate-500 text-center mb-8">
          Start building your professional resume
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />

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
            Create Account
          </Button>
        </form>

        <p className="text-center text-slate-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
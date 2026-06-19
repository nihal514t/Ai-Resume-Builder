import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getResumes, createResume, deleteResume } from "../api/resumeApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../components/ui/Button";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [creating, setCreating] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const data = await getResumes(user.token);

        setResumes(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchResumes();
  }, []);

  const handleCreateResume = async () => {
    try {
      setCreating(true);

      const resume = await createResume(
        {
          title: "Untitled Resume",
          fullName: user.name,
          email: user.email,
        },
        user.token,
      );

      setResumes([...resumes, resume]);

      toast.success("Resume created");
    } catch (error) {
      console.log(error);

      toast.error("Failed to create resume");
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteResume = async (id) => {
    try {
      await deleteResume(id, user.token);

      setResumes(resumes.filter((resume) => resume._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <p className="text-slate-500">Welcome {user.name}</p>
          </div>

          <Button className="bg-red-500 hover:bg-red-600" onClick={logout}>
            Logout
          </Button>
        </div>

        <div className="h-6" />
        <Button
          className="mb-6 bg-green-600 hover:bg-green-700"
          onClick={handleCreateResume}
          disabled={creating}
        >
          {creating ? "Creating..." : "Create Resume"}
        </Button>

        <h2 className="text-2xl font-bold mb-4">My Resumes</h2>

        <div className="space-y-4">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="
      bg-white
      rounded-xl
      shadow
      p-5
      border
      "
            >
              <h3 className="text-xl font-semibold">{resume.title}</h3>

              <p className="text-slate-500 mt-1">{resume.fullName}</p>

              <div className="flex gap-3 mt-4">
                <Button onClick={() => navigate(`/resume/${resume._id}`)}>
                  Edit
                </Button>

                <Button
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => handleDeleteResume(resume._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

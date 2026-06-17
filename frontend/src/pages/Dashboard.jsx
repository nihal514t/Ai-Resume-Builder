import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import { getResumes, createResume, deleteResume } from "../api/resumeApi";

const Dashboard = () => {
  const { user, logout } = useAuth();

  const [resumes, setResumes] = useState([]);

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
      const resume = await createResume(
        {
          title: "Untitled Resume",
          fullName: user.name,
          email: user.email,
        },
        user.token,
      );

      setResumes([...resumes, resume]);
    } catch (error) {
      console.log(error);
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
    <div>
      <h1>Dashboard</h1>

      <h2>Welcome {user.name}</h2>

      <button onClick={logout}>Logout</button>

      <hr />
      <button onClick={handleCreateResume}>Create Resume</button>

      <h2>My Resumes</h2>

      {resumes.map((resume) => (
        <div key={resume._id}>
          <h3>{resume.title}</h3>

          <p>{resume.fullName}</p>
          <button onClick={() => handleDeleteResume(resume._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;

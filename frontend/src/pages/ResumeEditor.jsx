import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { getResumeById, updateResume } from "../api/resumeApi";
import { improveDescription, generateSummary } from "../api/aiApi";

import { generateResumePDF } from "../utils/pdfGenerator";

const ResumeEditor = () => {
  const { id } = useParams();

  const { user } = useAuth();

  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await getResumeById(id, user.token);

        setResume(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchResume();
  }, [id]);

  const handleChange = (e) => {
    setResume({
      ...resume,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const updated = await updateResume(id, resume, user.token);

      setResume(updated);

      alert("Resume Saved");
    } catch (error) {
      console.log(error);
    }
  };

  if (!resume) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Resume Editor</h1>

      <input
        type="text"
        name="title"
        value={resume.title || ""}
        onChange={handleChange}
        placeholder="Title"
      />

      <br />

      <input
        type="text"
        name="fullName"
        value={resume.fullName || ""}
        onChange={handleChange}
        placeholder="Full Name"
      />

      <br />

      <input
        type="email"
        name="email"
        value={resume.email || ""}
        onChange={handleChange}
        placeholder="Email"
      />

      <br />

      <input
        type="text"
        name="phone"
        value={resume.phone || ""}
        onChange={handleChange}
        placeholder="Phone"
      />

      <br />

      <input
        type="text"
        name="location"
        value={resume.location || ""}
        onChange={handleChange}
        placeholder="Location"
      />

      <br />

      <textarea
        name="summary"
        value={resume.summary || ""}
        onChange={handleChange}
        placeholder="Professional Summary"
      />

      <br />
      <button
        onClick={async () => {
          try {
            const result = await generateSummary(resume);

            const updatedResume = {
              ...resume,
              summary: result.summary,
            };

            setResume(updatedResume);

            await updateResume(id, updatedResume, user.token);

            alert("Summary generated and saved");
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Generate Summary With AI
      </button>

      <br />

      <h2>Skills</h2>

      {resume.skills?.map((skill, index) => (
        <div key={index}>
          <input
            type="text"
            value={skill}
            onChange={(e) => {
              const updatedSkills = [...resume.skills];

              updatedSkills[index] = e.target.value;

              setResume({
                ...resume,
                skills: updatedSkills,
              });
            }}
          />

          <button
            onClick={() => {
              const updatedSkills = resume.skills.filter((_, i) => i !== index);

              setResume({
                ...resume,
                skills: updatedSkills,
              });
            }}
          >
            Remove
          </button>
        </div>
      ))}

      <br />

      <button
        onClick={() =>
          setResume({
            ...resume,
            skills: [...(resume.skills || []), ""],
          })
        }
      >
        Add Skill
      </button>

      <br />

      <h2>Projects</h2>

      {resume.projects?.map((project, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Project Title"
            value={project.title}
            onChange={(e) => {
              const updatedProjects = [...resume.projects];

              updatedProjects[index].title = e.target.value;

              setResume({
                ...resume,
                projects: updatedProjects,
              });
            }}
          />

          <br />

          <textarea
            placeholder="Description"
            value={project.description}
            onChange={(e) => {
              const updatedProjects = [...resume.projects];

              updatedProjects[index].description = e.target.value;

              setResume({
                ...resume,
                projects: updatedProjects,
              });
            }}
          />

          <br />

          <button
            onClick={async () => {
              try {
                const result = await improveDescription(project.description);

                const updatedProjects = [...resume.projects];

                updatedProjects[index].description = result.improved;

                const updatedResume = {
                  ...resume,
                  projects: updatedProjects,
                };

                setResume(updatedResume);

                await updateResume(id, updatedResume, user.token);

                alert("AI improvement saved");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Improve With AI
          </button>

          <button
            onClick={() => {
              const updatedProjects = resume.projects.filter(
                (_, i) => i !== index,
              );

              setResume({
                ...resume,
                projects: updatedProjects,
              });
            }}
          >
            Remove Project
          </button>
        </div>
      ))}

      <button
        onClick={() =>
          setResume({
            ...resume,
            projects: [
              ...(resume.projects || []),
              {
                title: "",
                description: "",
                technologies: [],
              },
            ],
          })
        }
      >
        Add Project
      </button>

      <br />
      <h2>Experience</h2>

      {resume.experience?.map((exp, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Company"
            value={exp.company}
            onChange={(e) => {
              const updated = [...resume.experience];

              updated[index].company = e.target.value;

              setResume({
                ...resume,
                experience: updated,
              });
            }}
          />

          <br />

          <input
            type="text"
            placeholder="Role"
            value={exp.role}
            onChange={(e) => {
              const updated = [...resume.experience];

              updated[index].role = e.target.value;

              setResume({
                ...resume,
                experience: updated,
              });
            }}
          />

          <br />

          <textarea
            placeholder="Description"
            value={exp.description}
            onChange={(e) => {
              const updated = [...resume.experience];

              updated[index].description = e.target.value;

              setResume({
                ...resume,
                experience: updated,
              });
            }}
          />

          <br />

          <button
            onClick={() => {
              const updated = resume.experience.filter((_, i) => i !== index);

              setResume({
                ...resume,
                experience: updated,
              });
            }}
          >
            Remove Experience
          </button>
        </div>
      ))}

      <br />
      <button
        onClick={() =>
          setResume({
            ...resume,
            experience: [
              ...(resume.experience || []),
              {
                company: "",
                role: "",
                description: "",
              },
            ],
          })
        }
      >
        Add Experience
      </button>

      <br />

      <h2>Education</h2>

      {resume.education?.map((edu, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Institution"
            value={edu.institution}
            onChange={(e) => {
              const updated = [...resume.education];

              updated[index].institution = e.target.value;

              setResume({
                ...resume,
                education: updated,
              });
            }}
          />

          <br />

          <input
            type="text"
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) => {
              const updated = [...resume.education];

              updated[index].degree = e.target.value;

              setResume({
                ...resume,
                education: updated,
              });
            }}
          />

          <br />

          <input
            type="text"
            placeholder="Year"
            value={edu.year}
            onChange={(e) => {
              const updated = [...resume.education];

              updated[index].year = e.target.value;

              setResume({
                ...resume,
                education: updated,
              });
            }}
          />

          <br />

          <button
            onClick={() => {
              const updated = resume.education.filter((_, i) => i !== index);

              setResume({
                ...resume,
                education: updated,
              });
            }}
          >
            Remove Education
          </button>
        </div>
      ))}

      <button
        onClick={() =>
          setResume({
            ...resume,
            education: [
              ...(resume.education || []),
              {
                institution: "",
                degree: "",
                year: "",
              },
            ],
          })
        }
      >
        Add Education
      </button>
      <br />
      <button onClick={() => generateResumePDF(resume)}>Export PDF</button>

      <br />

      <button onClick={handleSave}>Save Resume</button>
    </div>
  );
};

export default ResumeEditor;

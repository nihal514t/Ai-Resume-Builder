import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

//components
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import TextArea from "../components/ui/TextArea";

import { useAuth } from "../context/AuthContext";

import { getResumeById, updateResume } from "../api/resumeApi";
import { improveDescription, generateSummary } from "../api/aiApi";

import ResumePreview from "../components/ResumePreview";
import { generateResumePDF } from "../utils/pdfGenerator";

const ResumeEditor = () => {
  const { id } = useParams();

  const { user } = useAuth();

  const [resume, setResume] = useState(null);
  const [saving, setSaving] = useState(false);
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [improving, setImproving] = useState(null);

  const navigate = useNavigate();

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
      setSaving(true);

      const updated = await updateResume(id, resume, user.token);

      setResume(updated);

      toast.success("Resume Saved");
    } catch (error) {
      console.log(error);

      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (!resume) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-white rounded-xl shadow p-6 max-h-[90vh] overflow-y-auto">
            <h1 className="text-3xl font-bold mb-6">Resume Editor</h1>

            <div className="mb-6">
              <button
                onClick={() => navigate("/")}
                className="
      text-blue-600
      hover:text-blue-800
      font-medium
    "
              >
                ← Back to Dashboard
              </button>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Template</label>

              <select
                value={resume.template || "modern"}
                onChange={async (e) => {
                  try {
                    const updatedResume = {
                      ...resume,
                      template: e.target.value,
                    };

                    setResume(updatedResume);

                    await updateResume(id, updatedResume, user.token);

                    toast.success("Template updated");
                  } catch (error) {
                    console.log(error);
                  }
                }}
                className="
      w-full
      border
      rounded-lg
      px-3
      py-2
      bg-white
    "
              >
                <option value="modern">Modern</option>

                <option value="professional">Professional</option>

                <option value="minimal">Minimal</option>
              </select>
            </div>

            <Input
              type="text"
              name="title"
              value={resume.title || ""}
              onChange={handleChange}
              placeholder="Title"
            />

            <Input
              type="text"
              name="fullName"
              value={resume.fullName || ""}
              onChange={handleChange}
              placeholder="Full Name"
            />

            <Input
              type="email"
              name="email"
              value={resume.email || ""}
              onChange={handleChange}
              placeholder="Email"
            />

            <Input
              type="text"
              name="phone"
              value={resume.phone || ""}
              onChange={handleChange}
              placeholder="Phone"
            />

            <Input
              type="text"
              name="location"
              value={resume.location || ""}
              onChange={handleChange}
              placeholder="Location"
            />

            <TextArea
              name="summary"
              value={resume.summary || ""}
              onChange={handleChange}
              placeholder="Professional Summary"
            />

            <Button
              className="bg-purple-600 hover:bg-purple-700"
              disabled={generatingSummary}
              onClick={async () => {
                try {
                  setGeneratingSummary(true);

                  const result = await generateSummary(resume);

                  const updatedResume = {
                    ...resume,
                    summary: result.summary,
                  };

                  setResume(updatedResume);

                  await updateResume(id, updatedResume, user.token);

                  toast.success("Summary generated");
                } catch (error) {
                  console.log(error);

                  toast.error("Failed to generate summary");
                } finally {
                  setGeneratingSummary(false);
                }
              }}
            >
              {generatingSummary ? "Generating..." : "Generate Summary With AI"}
            </Button>

            <h2 className="text-xl font-semibold mt-6 mb-3">Skills</h2>

            {resume.skills?.map((skill, index) => (
              <div key={index} className="mb-4">
                <Input
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

                <Button
                  className="bg-red-500 hover:bg-red-600 mt-2"
                  onClick={() => {
                    const updatedSkills = resume.skills.filter(
                      (_, i) => i !== index,
                    );

                    setResume({
                      ...resume,
                      skills: updatedSkills,
                    });
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}

            <div className="mt-4">
              <Button
                onClick={() =>
                  setResume({
                    ...resume,
                    skills: [...(resume.skills || []), ""],
                  })
                }
              >
                Add Skill
              </Button>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-3">Projects</h2>

            {resume.projects?.map((project, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 mb-6 bg-slate-50"
              >
                <Input
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

                <TextArea
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

                <div className="flex gap-3 mt-3">
                  <Button
                    className="bg-purple-600 hover:bg-purple-700"
                    disabled={improving}
                    onClick={async () => {
                      try {
                        setImproving(true);

                        const result = await improveDescription(
                          project.description,
                        );

                        const updatedProjects = [...resume.projects];

                        updatedProjects[index].description = result.improved;

                        const updatedResume = {
                          ...resume,
                          projects: updatedProjects,
                        };

                        setResume(updatedResume);

                        await updateResume(id, updatedResume, user.token);

                        toast.success("Project improved");
                      } catch (error) {
                        console.log(error);

                        toast.error("Failed to improve project");
                      } finally {
                        setImproving(false);
                      }
                    }}
                  >
                    {improving ? "Improving..." : "Improve With AI"}
                  </Button>

                  <Button
                    className="bg-red-500 hover:bg-red-600"
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
                  </Button>
                </div>
              </div>
            ))}

            <Button
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
            </Button>

            <h2 className="text-xl font-semibold mt-6 mb-3">Experience</h2>

            {resume.experience?.map((exp, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 mb-6 bg-slate-50"
              >
                <Input
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

                <Input
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

                <TextArea
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

                <Button
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => {
                    const updated = resume.experience.filter(
                      (_, i) => i !== index,
                    );

                    setResume({
                      ...resume,
                      experience: updated,
                    });
                  }}
                >
                  Remove Experience
                </Button>
              </div>
            ))}

            <Button
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
            </Button>

            <h2 className="text-xl font-semibold mt-6 mb-3">Education</h2>

            {resume.education?.map((edu, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 mb-6 bg-slate-50"
              >
                <Input
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

                <Input
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

                <Input
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

                <Button
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => {
                    const updated = resume.education.filter(
                      (_, i) => i !== index,
                    );

                    setResume({
                      ...resume,
                      education: updated,
                    });
                  }}
                >
                  Remove Education
                </Button>
              </div>
            ))}

            <Button
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
            </Button>
            <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t">
              <Button
                className="bg-slate-700 hover:bg-slate-800"
                onClick={() => generateResumePDF(resume)}
              >
                Export PDF
              </Button>

              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Resume"}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow p-6 sticky top-6">
              <ResumePreview resume={resume} template={resume.template} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;

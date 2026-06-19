const ResumePreview = ({ resume }) => {
  if (!resume) return null;

  return (
    <div className="bg-white rounded-xl shadow-xl p-10 sticky top-6">
      <div className="border-b pb-6 mb-6 text-center">
        <h1 className="text-4xl font-bold text-slate-900">{resume.fullName}</h1>

        <p className="text-lg text-slate-500 mt-2">{resume.title}</p>

        <div className="flex flex-wrap justify-center gap-4 text-slate-500 text-sm mt-3">
          {resume.email && <span>{resume.email}</span>}
          {resume.phone && <span>{resume.phone}</span>}
          {resume.location && <span>{resume.location}</span>}
        </div>
      </div>

      <section className="mb-6">
        <h2 className="text-xl font-bold border-b border-slate-300 mb-3 pb-1 text-slate-800">
          Professional Summary
        </h2>

        <p className="text-gray-700">{resume.summary}</p>
      </section>
      {resume.skills?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold border-b border-slate-300 mb-3 pb-1 text-slate-800">Skills</h2>

          <div className="flex flex-wrap gap-2">
            {resume.skills?.map((skill, index) => (
              <span
                key={index}
                className="
                bg-blue-100
                text-blue-700
                px-3
                py-1
                rounded-full
                text-sm
                "
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {resume.projects?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold border-b border-slate-300 mb-3 pb-1 text-slate-800">Projects</h2>

          {resume.projects?.map((project, index) => (
            <div key={index} className="mb-5 border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">{project.title}</h3>

              <p className="text-gray-700">{project.description}</p>
            </div>
          ))}
        </section>
      )}

      {resume.experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold border-b border-slate-300 mb-3 pb-1 text-slate-800">Experience</h2>

          {resume.experience.map((exp, index) => (
            <div key={index} className="mb-5 border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold">{exp.role}</h3>

              <p className="text-gray-600">{exp.company}</p>

              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {resume.education?.length > 0 && (
        <section>
          <h2 className="text-xl font-bold border-b border-slate-300 mb-3 pb-1 text-slate-800">Education</h2>

          {resume.education?.map((edu, index) => (
            <div key={index} className="mb-5 border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold">{edu.degree}</h3>

              <p>{edu.institution}</p>

              <p className="text-gray-500">{edu.year}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ResumePreview;

const ResumePreview = ({ resume }) => {
  if (!resume) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 sticky top-6">
      <div className="border-b pb-4 mb-6">
        <h1 className="text-4xl font-bold text-gray-800">{resume.fullName}</h1>

        <div className="mt-2 text-gray-600 text-sm">
          <div className="flex flex-wrap gap-4 text-slate-500 text-sm mt-2">
            <span>{resume.email}</span>
            <span>{resume.phone}</span>
            <span>{resume.location}</span>
          </div>
        </div>
      </div>

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b mb-2">
          Professional Summary
        </h2>

        <p className="text-gray-700">{resume.summary}</p>
      </section>
      {resume.skills?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b mb-2">Skills</h2>

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
          <h2 className="text-xl font-semibold border-b mb-2">Projects</h2>

          {resume.projects?.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold text-lg">{project.title}</h3>

              <p className="text-gray-700">{project.description}</p>
            </div>
          ))}
        </section>
      )}

      {resume.experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b mb-2">Experience</h2>

          {resume.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">{exp.role}</h3>

              <p className="text-gray-600">{exp.company}</p>

              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {resume.education?.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold border-b mb-2">Education</h2>

          {resume.education?.map((edu, index) => (
            <div key={index} className="mb-4">
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

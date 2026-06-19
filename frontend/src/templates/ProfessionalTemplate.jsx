const ProfessionalTemplate = ({ resume }) => {
  return (
    <div className="bg-white shadow-lg">
      <div className="bg-slate-800 text-white p-6">
        <h1 className="text-4xl font-bold">
          {resume.fullName}
        </h1>

        <p className="mt-2">
          Full Stack Developer
        </p>
      </div>

      <div className="p-8">
        <h2 className="font-bold text-xl mb-3">
          Summary
        </h2>

        <p>{resume.summary}</p>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
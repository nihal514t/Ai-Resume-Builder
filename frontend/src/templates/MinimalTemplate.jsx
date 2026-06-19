const MinimalTemplate = ({ resume }) => {
  return (
    <div className="bg-white p-8">
      <h1 className="text-3xl font-bold">
        {resume.fullName}
      </h1>

      <p className="text-sm text-gray-500 mt-2">
        {resume.email}
      </p>

      <p className="text-sm text-gray-500">
        {resume.phone}
      </p>

      <p className="text-sm text-gray-500">
        {resume.location}
      </p>

      <hr className="my-6" />

      <p>{resume.summary}</p>
    </div>
  );
};

export default MinimalTemplate;
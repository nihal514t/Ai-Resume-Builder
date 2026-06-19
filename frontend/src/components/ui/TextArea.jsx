const TextArea = (props) => {
  return (
    <textarea
      className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  );
};

export default TextArea;
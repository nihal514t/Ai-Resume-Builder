import axios from "axios";

const API_URL =
  "http://localhost:8000/api/resumes";

export const getResumes = async (
  token
) => {
  const response = await axios.get(
    API_URL,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const createResume =
  async (resumeData, token) => {
    const response =
      await axios.post(
        API_URL,
        resumeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const deleteResume =
  async (id, token) => {
    const response =
      await axios.delete(
        `${API_URL}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };
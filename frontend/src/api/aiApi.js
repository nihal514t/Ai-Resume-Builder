import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/ai`;

export const improveDescription =
  async (description) => {
    const response =
      await axios.post(
        `${API_URL}/improve-description`,
        { description }
      );

    return response.data;
  };

  export const generateSummary =
  async (resume) => {
    const response =
      await axios.post(
        `${API_URL}/generate-summary`,
        resume
      );

    return response.data;
  };
const OpenAI = require("openai");

console.log("OPENROUTER_API_KEY:", process.env.OPENROUTER_API_KEY);

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const improveProjectDescription = async (description) => {
  const completion = await client.chat.completions.create({
    model: "deepseek/deepseek-chat-v3-0324",

    messages: [
      {
        role: "system",
        content: `
You are an expert resume writer.

Convert short project descriptions into professional resume bullet points.

Rules:
- Return only the improved description.
- No introductions.
- No explanations.
- No markdown.
- Maximum 2 sentences.
`,
      },
      {
        role: "user",
        content: description,
      },
    ],
  });

  return completion.choices[0].message.content;
};

const generateSummary =
  async (resume) => {
    const completion =
      await client.chat.completions.create({
        model:
          "deepseek/deepseek-chat-v3-0324",

        messages: [
          {
            role: "system",
            content: `
You are an expert resume writer.

Generate a professional resume summary.

Return plain text only.
Do not use markdown.
Do not use headings.
Do not use bullet points.

Maximum 4 sentences.
`,
          },
          {
            role: "user",
            content: JSON.stringify(
              resume
            ),
          },
        ],
      });

    return completion.choices[0]
      .message.content;
  };

module.exports = {
  improveProjectDescription,
  generateSummary,
};

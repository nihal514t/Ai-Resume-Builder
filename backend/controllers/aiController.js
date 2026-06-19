const { improveProjectDescription,generateSummary } = require("../services/aiService");

const improveDescription = async (req, res) => {
  try {
    const { description } = req.body;

    const improved = await improveProjectDescription(description);

    res.json({
      improved,
    });
  } catch (error) {
    console.error("AI Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const generateSummaryAI =
  async (req, res) => {
    try {
      const summary =
        await generateSummary(
          req.body
        );

      res.json({
        summary,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  improveDescription,
  generateSummaryAI,
};

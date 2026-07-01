const axios = require("axios");

const getWikipediaSummary = async (topic) => {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
      topic,
    )}`;

    const response = await axios.get(url, {
      headers: {
        "User-Agent": "AIQuizBuilder/1.0 (student-project)",
        Accept: "application/json",
      },
    });

    return response.data.extract;
  } catch (error) {
    console.error(
      "Wikipedia Error:",
      error.response?.status,
      error.response?.data || error.message,
    );
    return "";
  }
};

module.exports = { getWikipediaSummary };

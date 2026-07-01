const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateQuiz = async (topic, context) => {
  try {
    const prompt = `
You are an expert educational quiz generator.

Topic:
${topic}

Context:
${context}

Generate EXACTLY 5 multiple-choice questions.

Rules:
- Each question must have exactly 4 options.
- Options should be labeled A, B, C, D.
- Only ONE option is correct.
- Include a short explanation for each answer.
- Return ONLY valid JSON.
- Do not write markdown.
- Do not write \`\`\`json.

Return this format:

{
  "questions":[
    {
      "question":"...",
      "options":{
        "A":"...",
        "B":"...",
        "C":"...",
        "D":"..."
      },
      "correctAnswer":"A",
      "explanation":"..."
    }
  ]
}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      response_format: {
        type: "json_object",
      },
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error("Groq Error:", error);
    throw error;
  }
};

module.exports = {
  generateQuiz,
};

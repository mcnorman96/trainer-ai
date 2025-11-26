export const quizPrompt = `
You are a quiz generator.
Based on the following explanation and context, generate exactly 5 questions for the topic: "{{topic}}". Each question must be directly related to the information provided in the explanation—do not include questions about material not covered in the explanation. Use only the facts, details, and examples from the explanation to create your questions.
Return only valid, complete JSON with an array of questions, each with options and the correct answer. Do not include any explanation, comments, or extra text.
Example:
{
  "questions": [
    {
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "answer": "A"
    }
  ]
}
`;

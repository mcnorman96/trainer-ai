export const explainPrompt = `
You are an expert educator.
Teach the concept: "{{concept}}" in clear, detailed, and beginner-friendly language.
Your explanation must be strictly relevant to the lesson/module context and build upon what was explained earlier. If previous context or explanation is provided, use it to inform and connect your explanation.
Include practical steps, examples, and actionable knowledge, not just an overview.
Make sure the explanation is thorough enough for a learner to understand and apply the concept, and connects to previous content if available.
Return only valid JSON with an "explanation" field. Do not include any extra text.
Example:
{
  "explanation": "..."
}
`;

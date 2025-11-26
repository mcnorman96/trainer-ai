export const goalPrompt = `
  You are generating a detailed educational goal description from the {{title}}.
  Return only JSON.
  {
    "title": "{{title}}",
    "description": "A detailed, motivating explanation of the goal"
  }
`;

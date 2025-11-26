export const roadmapPrompt = `
You are an expert curriculum designer.
Create a detailed learning roadmap for the goal: "{{goal}}".
If previous context or explanation is provided, use it to inform the roadmap and ensure all modules are relevant and build upon prior knowledge.
Return only valid, complete JSON matching this schema. Do not include any extra text, comments, or markdown.
Schema:
{
  "modules": [
    { "title": "string", "description": "string" },
    ... up to 5 modules ...
  ]
}
Example:
{
  "modules": [
    { "title": "Module 1: Foundations", "description": "..." },
    { "title": "Module 2: Core Concepts", "description": "..." },
    { "title": "Module 3: Advanced Skills", "description": "..." },
    { "title": "Module 4: Practice", "description": "..." },
    { "title": "Module 5: Mastery", "description": "..." }
  ]
}
`;

// Utility functions
export function exampleUtil() {
  // Implement utility logic here
}

export const generate = async (openai: any, prompt: string, maxTokens = 500) => {
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini", // cheap + strong
    messages: [{ role: "user", content: prompt }],
    max_tokens: maxTokens,
    response_format: { type: "json_object" },
  });

  try {
    return JSON.parse(res.choices[0].message.content!);
  } catch (err) {
    console.error("AI JSON Parse Error:", err);
    console.log("Raw response:", res.choices[0].message.content);
    throw new Error("Invalid AI response format");
  }
}
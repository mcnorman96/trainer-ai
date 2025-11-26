export const generate = async (openai: any, prompt: string, maxTokens = 500) => {
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
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
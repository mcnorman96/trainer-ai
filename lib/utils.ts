export const generate = async (openai: any, prompt: string, maxTokens = 2000) => {
  prompt += "\n\nReturn only valid, complete JSON. Do not include any extra text.";

  maxTokens = Math.min(maxTokens, 2000); // Increase token limit for longer responses

  const res = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: maxTokens,
    response_format: { type: "json_object" },
  });

  try {
    let raw = res.choices[0].message.content!;

    raw = raw.replace(/,\s*([}\]])/g, '$1'); // Remove trailing commas
    raw = raw.replace(/[“”]/g, '"'); // Replace smart quotes

    // Attempt to auto-close brackets if JSON is cut off
    const openBraces = (raw.match(/{/g) || []).length;
    const closeBraces = (raw.match(/}/g) || []).length;
    if (openBraces > closeBraces) {
      raw += '}'.repeat(openBraces - closeBraces);
    }

    const match = raw.match(/{[\s\S]*}/);
    if (match) {
      return JSON.parse(match[0]);
    }
  } catch (err) {
    console.error("AI JSON Parse Error:", err);
    console.log("Raw response:", res.choices[0].message.content);

    // Fallback: return a default explanation if parsing fails
    return { explanation: "Content too long or incomplete. Please try a shorter topic or reduce details." };
  }
}
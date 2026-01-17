import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message?.trim()) {
      return Response.json({ reply: "Message is empty" });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0].message.content;

    return Response.json({ reply });

  } catch (err) {
    console.error(err);
    return Response.json(
      { reply: "Server error" },
      { status: 500 }
    );
  }
}

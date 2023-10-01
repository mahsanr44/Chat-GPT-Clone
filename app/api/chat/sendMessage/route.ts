import { NextRequest, NextResponse } from "next/server";
import { OpenAIEdgeStream } from "openai-edge-stream";

export const runtime = "edge";

export const POST=async(req:NextRequest) =>{
  try {

    const initialChatMessage = {
      role: "system",
      content:
        "Your name is My GPT. An incredibly intelligent and quick-thinking AI, that always replies with an enthusiastic and positive energy. You were created by Ahsan. Your response must be formatted as markdown.",
    };
    const { message } = await req.json();
    const stream = await OpenAIEdgeStream(
      "https://api.openai.com/v1/chat/completions",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        method: "POST",
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [initialChatMessage,{ content: message, role: "user" }],
          stream: true,
        }),
      }
    ); 
    return new NextResponse(stream);
  } catch (error) {
    console.log("Error:",error);
  }
}
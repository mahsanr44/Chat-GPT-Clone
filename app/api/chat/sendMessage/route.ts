import { NextRequest, NextResponse } from "next/server";
import { OpenAIEdgeStream } from "openai-edge-stream";

export const runtime = "edge";

export const POST=async(req:NextRequest) =>{
  try {
    const { message } = await req.json();
    const stream = await OpenAIEdgeStream(
      "https://api.openai.com/v1/chat/completions",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
        method: "POST",
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ content: message, role: "user" }],
          stream: true,
        }),
      }
    ); 
    return new Response(stream);
  } catch (error) {
    console.log("Error:",error);
  }
}
import clientPromise from "@/utils/mongodb";
import { getSession } from "@auth0/nextjs-auth0";


export const POST= async(req:any, res:any) =>{
  try {
    const { user }:any = await getSession(req, res);
    const { message } = req.body;

    // validate message data
    if (!message || typeof message !== "string" || message.length > 200) {
      res.status(422).json({
        message: "message is required and must be less than 200 characters",
      });
      return;
    }

    const newUserMessage = {
      role: "user",
      content: message,
    };
    const client = await clientPromise;
    const db = client.db("MyGPT");
    const chat = await db.collection("chats").insertOne({
      userId: user.sub,
      messages: [newUserMessage],
      title: message,
    });
   return Response.json({
      _id: chat.insertedId.toString(),
      messages: [newUserMessage],
      title: message,
    });
  } catch (e) {
    console.log("ERROR OCCURRED IN CREATE NEW CHAT: ", e);
    return Response.json({ message: "An error occurred when creating a new chat" });
  }
}
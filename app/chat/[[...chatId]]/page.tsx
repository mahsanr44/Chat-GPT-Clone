"use client"
import ChatSidebar from '@/app/components/ChatSidebar'
import { streamReader } from 'openai-edge-stream';
import React, { useState } from 'react'

const Chat = () => {
    const [messageText, setMessageText] = useState("");
    const [incomingMessage, setIncomingMessage] = useState("");

    const handleSubmit =async (e: any) => {
        e.preventDefault();
        console.log(messageText);

        const LOCAL_URL = '/api/chat/sendMessage'
        const response= await fetch(LOCAL_URL,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: messageText
            })
        })
        console.log("Request URL:", LOCAL_URL);
console.log("Request Headers:", JSON.stringify(response.headers, null, 2));
console.log("Request Body:", JSON.stringify({ message: messageText }, null, 2));

        console.log("response",response)
        if (!response.ok) {
            console.error("Fetch error:", response.statusText);
            return;
          }
        const data= response.body;
        console.log("data",data)

        if(!data){
            return;
        }
        const reader= data.getReader();
        console.log("readerr",reader)
        await streamReader(reader, async (message:any)=>{
            console.log("msg",message.content)
            setIncomingMessage(s=>`${s}${message.content}`)
        })
    };
    return (
        <>
            <div className='grid h-screen grid-cols-[260px_1fr]'>
                <ChatSidebar />
                <div className='flex flex-col bg-gray-700'>
                    <div className='flex-1 text-white'>
                        {incomingMessage}
                    </div>
                    <footer className='bg-gray-800 p-10'>
                        <form
                            onSubmit={handleSubmit} action="">
                            <fieldset className='flex gap-2'>
                                <textarea
                                    value={messageText}
                                    onChange={e => setMessageText(e.target.value)} placeholder='Send a message...' className='w-full resize-none rounded-md bg-gray-700 p-2 text-white focus:border-emerald-500 focus:bg-gray-600 focus:outline focus:outline-emerald-500'></textarea>
                                <button className='btn' type='submit'>Send</button>
                            </fieldset>
                        </form>
                    </footer>
                </div>

            </div>
        </>
    )
}

export default Chat

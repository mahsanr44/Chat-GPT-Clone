"use client"
import ChatSidebar from '@/app/components/ChatSidebar'
import Message from '@/app/components/Message';
import { streamReader } from 'openai-edge-stream';
import React, { FormEvent, useState } from 'react'
import { v4 as uuid } from 'uuid'

const Chat = () => {
    const [messageText, setMessageText] = useState("");
    const [incomingMessage, setIncomingMessage] = useState("");
    const [newChatMessages, setNewChatMessages] = useState([]);
    const [generatingResponse, setGeneratingResponse] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setGeneratingResponse(true);
        setNewChatMessages((prev): any => {
            const newChatMessages = [...prev, {
                _id: uuid(),
                role: "user",
                content: messageText
            }];
            return newChatMessages;
        })
        setMessageText("")
        const LOCAL_URL = 'http://localhost:3000/api/chat/sendMessage'
        const response = await fetch(LOCAL_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: messageText
            })
        })
        if (!response.ok) {
            console.error("Fetch error:", response.statusText);
            return;
        }
        const data = response.body;

        if (!data) {
            return;
        }
        const reader = data.getReader();
        await streamReader(reader, async (message: any) => {
            setIncomingMessage(s => `${s}${message.content}`)
        })
        setGeneratingResponse(false)
    };
    return (
        <>
            <div className='grid h-screen grid-cols-[260px_1fr]'>
                <ChatSidebar />
                <div className='flex flex-col bg-gray-700 overflow-hidden'>
                    <div className='flex-1 text-white overflow-y-scroll'>
                        {newChatMessages.map((message: string | any | number) => (
                            <Message
                                key={message._id}
                                role={message.role}
                                content={message.content}
                            />
                        ))}
                        {!!incomingMessage && <Message
                            role="assistant"
                            content={incomingMessage}
                        />}
                    </div>
                    <footer className='bg-gray-800 p-7'>
                        <form
                            onSubmit={handleSubmit}>
                            <fieldset className='flex gap-2' disabled={generatingResponse}>
                                <textarea
                                    value={messageText}
                                    onChange={e => setMessageText(e.target.value)}
                                    placeholder={generatingResponse ? "" : 'Send a message...'}
                                    className='w-full resize-none rounded-md bg-gray-700 p-1.5 text-white focus:border-emerald-500 focus:bg-gray-600 focus:outline focus:outline-emerald-500'>
                                </textarea>
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

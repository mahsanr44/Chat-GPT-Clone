"use client"
import ChatSidebar from '@/app/components/ChatSidebar'
import React, { useState } from 'react'

const Chat = () => {
    const [messageText, setMessageText] =useState("");
    const handleSubmit=(e:any) => {
        e.preventDefault();
        console.log(messageText)
    };
    return (
        <>
            <div className='grid h-screen grid-cols-[260px_1fr]'>
                <ChatSidebar />
                <div className='flex flex-col bg-gray-700'>
                    <div className='flex-1'>chat window</div>
                    <footer className='bg-gray-800 p-10'>
                        <form
                        onSubmit={handleSubmit} action="">
                            <fieldset className='flex gap-2'>
                                <textarea
                                value={messageText}
                                onChange={e=>setMessageText(e.target.value)} placeholder='Send a message...' className='w-full resize-none rounded-md bg-gray-700 p-2 text-white focus:border-emerald-500 focus:bg-gray-600 focus:outline focus:outline-emerald-500'></textarea>
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

import Link from 'next/link'
import React from 'react'

const ChatSidebar = () => {
  return (
    <div>
          <Link className='bg-gray-900 text-white px-4 py-2 mx-1 hover:bg-red-800 rounded-md' href={'/api/auth/logout'}>Logout</Link>

   </div>
  )
}

export default ChatSidebar

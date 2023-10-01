import { useUser } from '@auth0/nextjs-auth0/client'
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { FC } from 'react'
import ReactMarkdown from 'react-markdown';

interface IProps {
  role: string,
  content: any,
}
const Message: FC<IProps> = ({ role, content }) => {
  const { user } = useUser();
  return (
    <div className={`grid grid-cols-[30px_1fr] gap-5 p-5 ${role === 'assistant' ? "bg-slate-600" : ""}`} >
      <div>{role === 'user' && !!user &&
        (<Image src={user.picture || ""} width={30} height={30}
          alt='User Avatar'
          className='rounded-sm shadow-md shadow-black/20'
        />)}
        {role === "assistant" && (
          <div className='flex items-center justify-center h-[30px] w-[30px] rounded-sm shadow-md shadow-black/20 bg-gray-800'>
            <FontAwesomeIcon icon={faRobot} className='text-emerald-200' />
          </div>
        )}
      </div>
      <div className='prose prose-invert'>
        <ReactMarkdown>
        {content}
        </ReactMarkdown>
        </div>
    </div>
  )
}

export default Message
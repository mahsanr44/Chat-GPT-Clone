'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client'
import { getSession } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/navigation';

const page = () => {

  const { isLoading, error, user } = useUser();
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  const router = useRouter();
  
  useEffect(() => {
    if (user) {
      router.push('/chat');
    }
  }, [user]); 

  return (
    <>
      <div className='flex flex-col justify-center items-center min-h-screen w-full bg-gray-800 text-white text-center'>

        {!!user &&
          <Link className='bg-red-700 px-4 py-2 mx-1 hover:bg-red-800 rounded-md' href={'/api/auth/logout'}>Logout</Link>
        }
        <div>
          <h1 className='text-4xl font-extrabold'>Welcome to Chat GPT</h1>
        </div>
        <div>
          <p className='text-lg py-4'>Login with your Account</p>
        </div>
        <div>

          {!user &&
            (<>
              <Link className='btn' href={'/api/auth/login'}>Log in</Link>
              <Link className='btn' href={'/api/auth/signup'}>Sign up</Link>
            </>
            )}
        </div>
      </div>
    </>
  )
}

export default page
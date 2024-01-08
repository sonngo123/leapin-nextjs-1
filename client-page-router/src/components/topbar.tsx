import Link from 'next/link';
import Image from 'next/image';

import { useSession, signIn, signOut } from 'next-auth/react';
export default function TopBar() {
  const { data: session } = useSession();
  return (
    <nav className='my-5 text-black'>
      <ul className='flex font-bold justify-between'>
        <li className='ml-10 w-1/3 flex justify-start '>
          {session && (
            <h1 className='inline-flex items-center'>
              <Image
                src={session!.user!.image as string}
                className='rounded-full mr-5 object-cover'
                alt='profile image'
                width={40}
                height={40}
              />
              {`Welcome, ${session.user?.name}`}
            </h1>
          )}
        </li>
        <li className='w-1/3 flex justify-center text-[2rem]'>
          <Link href='/'>FakeGPT</Link>
        </li>
        <li className='mr-10 w-1/3 flex justify-end'>
          {session ? (
            <button onClick={() => signOut()}>Sign out</button>
          ) : (
            <button onClick={() => signIn('all', { callbackUrl: '/chat' })}>
              Sign in
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

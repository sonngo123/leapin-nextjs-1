import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
export default function Home() {
  const { data: session } = useSession();
  return (
    <main className='text-black font-bold h-[90vh] flex justify-center items-center'>
      {session ? (
        <Link href='chat'>click to chat</Link>
      ) : (
        'Please sign in to continue.'
      )}
    </main>
  );
}

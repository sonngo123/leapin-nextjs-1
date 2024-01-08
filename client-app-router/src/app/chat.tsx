'use client';
import { useChat } from 'ai/react';
import React from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  });
  const messagesEndRef = React.useRef<HTMLLIElement | null>(null);

  React.useEffect(() => {
    if (messagesEndRef?.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className='text-black'>
      <ul
        className={
          'h-[90vh] w-4/6 mx-auto fixed inset-0 overflow-y-auto scrollbar-thin'
        }
      >
        {messages.map((m, index) => (
          <li key={index} className='my-5' ref={messagesEndRef}>
            <h1 className='font-bold'>
              {m.role === 'user' ? 'You: ' : 'ChatGPT: '}
            </h1>
            <h1> {m.content}</h1>
          </li>
        ))}
      </ul>

      <form
        onSubmit={handleSubmit}
        className='w-4/6 border-2 border-black  rounded-md fixed bottom-5  mx-auto inset-x-0  flex justify-center '
      >
        <input
          value={input}
          onChange={handleInputChange}
          className='w-5/6 p-3 rounded-md focus:outline-none'
        />
        <button type='submit' className='w-1/6 pl-10 font-bold text-black'>
          Send
        </button>
      </form>
    </div>
  );
}

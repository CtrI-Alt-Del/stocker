import { useState } from 'react'

const mockMessages = [
  { id: 1, role: 'user', content: 'oi' },
  { id: 2, role: 'bot', content: 'Tudo bem' },
]

export const Chat = () => {
  const [messages] = useState(mockMessages)
  const [input, setInput] = useState('')

  return (
    <div className='w-80 h-[28rem] flex flex-col border rounded-xl shadow-lg bg-white overflow-hidden'>
      <div className='flex items-center gap-2 px-4 py-3 border-b bg-zinc-50'>
        <div className='w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold text-lg'>
          💬
        </div>
        <span className='font-semibold text-zinc-800'>Chat Assistant</span>
      </div>
      <div className='flex-1 flex flex-col gap-2 p-4 overflow-y-auto bg-zinc-50'>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-[70%] text-sm whitespace-pre-line ${
                msg.role === 'user'
                  ? 'bg-zinc-900 text-white rounded-br-none'
                  : 'bg-zinc-800 text-white rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <form
        className='flex items-center gap-2 p-3 border-t bg-white'
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type='text'
          className='flex-1 px-3 py-2 rounded-lg border bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400 text-sm'
          placeholder='Type your message...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type='submit'
          className='p-2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 transition'
        >
          <svg
            width='20'
            height='20'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <title>Send</title>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M5 13l4 4L19 7'
            />
          </svg>
        </button>
      </form>
    </div>
  )
}

import { useChatbot } from './use-chatbot-hook'

export const Chat = () => {
  const { messages, isFetching, message, sendMessage, handleMessageChange, handleSubmit } = useChatbot()

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
            key={`${msg.content}-${msg.createdAt.getTime()}`}
            className={`flex ${msg.sender === msg.userId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-[70%] text-sm whitespace-pre-line ${
                msg.sender === msg.userId
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
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          className='flex-1 px-3 py-2 rounded-lg border bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400 text-sm'
          placeholder='Type your message...'
          value={message}
          onChange={(e) => handleMessageChange(e.target.value)}
        />
        <button
          type='submit'
          disabled={!message.trim() || isFetching}
          className='p-2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 transition disabled:opacity-50 disabled:cursor-not-allowed'
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

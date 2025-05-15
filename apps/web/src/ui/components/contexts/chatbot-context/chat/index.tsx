'use client'

import { useState } from 'react'

import { Button, Input, Spinner } from '@nextui-org/react'
import { useChatbot } from './use-chatbot-hook'
import { MessageCircleMore } from 'lucide-react'

export const ChatBot = () => {
  const { messages, isFetching, message, sendMessage, handleMessageChange, handleSubmit } = useChatbot()
  const [isLoading] = useState(false)

  return (
    <div className='max-w-96 h-[28rem] flex flex-col border rounded-xl shadow-lg bg-white overflow-hidden'>
      <div className='px-4 py-3 border-b bg-zinc-50'>
        <div className='flex items-center gap-2'>
          <div className='p-0.5 space-y-10 w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold text-lg'>
            <MessageCircleMore />
          </div>
          <span className='text-lg font-semibold text-zinc-800'>Chat Assistant</span>
        </div>
        <div>
          <span className='text-sm font-light text-zinc-700 pl-10'>Talk to AI to solve your questions</span>
        </div>
      </div>

      <div className='flex-1 flex flex-col gap-2 p-4 overflow-y-auto bg-zinc-50 scrollbar-hidden'>
        {messages.map((msg) => (
          <div key={`${msg.content}-${msg.createdAt.getTime()}`} className={`flex ${msg.sender === msg.userId ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`px-4 py-2 rounded-lg max-w-[70%] text-sm whitespace-pre-line break-words ${msg.sender === msg.userId
                ? 'bg-zinc-800 text-white rounded-br-none'
                : 'bg-orange-600 text-white rounded-bl-none'
                }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className='flex justify-start'>
            <div className='px-4 py-2 rounded-lg bg-orange-600 text-white text-sm'>
              <Spinner size='sm' />
            </div>
          </div>
        )}
      </div>

      <form
        className='flex items-center gap-2 p-3 border-t bg-zinc-50'
        onSubmit={handleSubmit}
      >
        <Input
          type='text'
          className='rounded-lg border bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-400 text-sm'
          placeholder='How can I help you?'
          value={message}
          onChange={(e) => handleMessageChange(e.target.value)}
        />
        <Button disabled={!message.trim() || isFetching} className='rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 transition'>
          Send
        </Button>
      </form>
    </div>
  )
}

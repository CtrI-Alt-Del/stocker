'use client'

import { useRef } from 'react'
import { Button, Input, Spinner } from '@nextui-org/react'
import Markdown from 'markdown-to-jsx'

import { Icon } from '@/ui/components/commons/icon'
import { useChatbot } from './use-chatbot'

export const ChatBot = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { chatMessages, lastUserMessage, isLoading, handleSubmit } = useChatbot(scrollRef)

  return (
    <div className='w-[36rem] h-[40rem] flex flex-col border rounded-xl shadow-lg bg-white overflow-hidden'>
      <div className='px-4 py-3 border-b bg-zinc-50'>
        <div className='flex items-center gap-2'>
          <div className='p-0.5 space-y-10 w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold text-lg'>
            <Icon name='chatbot' />
          </div>
          <span className='text-lg font-semibold text-zinc-800'>Chat Assistente</span>
        </div>
        <div>
          <span className='text-sm font-light text-zinc-700 pl-10'>
            Converse com a IA para resolver suas dúvidas
          </span>
        </div>
      </div>

      <div
        ref={scrollRef}
        className='flex-1 flex flex-col gap-2 p-4 overflow-y-auto bg-zinc-50'
      >
        {chatMessages.map((message) => (
          <div
            key={message.sentAt.getTime()}
            className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-[70%] text-sm whitespace-pre-line break-words ${
                message.sender === 'user'
                  ? 'bg-zinc-800 text-white rounded-br-none'
                  : 'bg-orange-600 text-white rounded-bl-none'
              }`}
            >
              <Markdown>{message.content}</Markdown>
            </div>
            <time
              dateTime={message.sentAt.toISOString()}
              className='text-xs text-zinc-500 mt-1'
            >
              {message.sentAt.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </time>
          </div>
        ))}
        {isLoading && (
          <div className='flex justify-start mt-3'>
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
          placeholder='Como posso ajudar você?'
          name='user-message'
        />
        <Button
          type='submit'
          disabled={isLoading}
          className='rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 transition'
        >
          Enviar
        </Button>
      </form>
    </div>
  )
}

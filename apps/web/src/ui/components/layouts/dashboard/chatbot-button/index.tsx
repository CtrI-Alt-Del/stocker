'use client'

import { useState, useEffect } from 'react'

import { Button } from '@nextui-org/react'
import { ChatBot } from '@/ui/components/contexts/chatbot-context/chat'
import { MessageCircleMore } from 'lucide-react'

export default function ChatBotButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  return (
    <>
      <Button
        isIconOnly
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-zinc-800 text-white shadow-xl hover:bg-zinc-700 transition rounded-full w-14 h-14"
      >
        <MessageCircleMore size={24} />
      </Button>

      {isVisible && (
        <div
          className={`fixed bottom-24 right-6 z-40 ${
            isOpen ? 'animate-fade-in' : 'animate-fade-out'
          }`}
          style={{ animationDuration: '0.3s' }}
        >
          <ChatBot />
        </div>
      )}
    </>
  )
}
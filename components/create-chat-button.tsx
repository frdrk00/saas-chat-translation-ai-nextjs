'use client'

import { useRouter } from 'next/navigation'
import { MessageSquarePlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const CreateChatButton = () => {
  const router = useRouter()

  const createNewChat = async () => {
    // all the logic here...

    router.push(`/chat/abc`)
  }

  return (
    <Button onClick={createNewChat} variant="ghost">
      <MessageSquarePlusIcon />
    </Button>
  )
}

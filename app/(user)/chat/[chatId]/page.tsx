import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

import { ChatInput } from '@/components/chat-input'

interface ChatPageProps {
  params: {
    chatId: string
  }
}

const ChatPage = async ({ params: { chatId } }: ChatPageProps) => {
  const session = await getServerSession(authOptions)

  return (
    <>
      {/* Admin Controls */}
      {/* ChatMembersBadge */}

      {/* ChatMessages */}

      <ChatInput chatId={chatId} />
    </>
  )
}

export default ChatPage

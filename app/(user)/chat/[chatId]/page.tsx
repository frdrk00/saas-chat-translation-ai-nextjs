import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { doc, getDocs } from 'firebase/firestore'

import { sortedMessagesRef } from '@/lib/converters/message'

import { ChatInput } from '@/components/chat-input'
import { ChatMessages } from '@/components/chat-messages'
import { ChatMembersBadges } from '@/components/chat-members-badges'

interface ChatPageProps {
  params: {
    chatId: string
  }
}

const ChatPage = async ({ params: { chatId } }: ChatPageProps) => {
  const session = await getServerSession(authOptions)

  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
    (doc) => doc.data()
  )

  return (
    <>
      {/* Admin Controls */}
      <ChatMembersBadges chatId={chatId} />

      <div className="flex-1">
        <ChatMessages
          chatId={chatId}
          session={session}
          initialMessages={initialMessages}
        />
      </div>

      <ChatInput chatId={chatId} />
    </>
  )
}

export default ChatPage

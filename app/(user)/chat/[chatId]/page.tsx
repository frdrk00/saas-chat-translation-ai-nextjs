import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { getDocs } from 'firebase/firestore'
import { redirect } from 'next/navigation'

import { sortedMessagesRef } from '@/lib/converters/message'
import { chatMembersRef } from '@/lib/converters/chat-members'

import { ChatInput } from '@/components/chat-input'
import { ChatMessages } from '@/components/chat-messages'
import { ChatMembersBadges } from '@/components/chat-members-badges'
import { AdminControls } from '@/components/chat-admin-controls'

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

  const hasAccess = (await getDocs(chatMembersRef(chatId))).docs
    .map((doc) => doc.id)
    .includes(session?.user.id!)

  if (!hasAccess) redirect('/chat?error=permission')

  return (
    <>
      <AdminControls chatId={chatId} />
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

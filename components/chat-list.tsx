import { getServerSession } from 'next-auth'
import { getDocs } from 'firebase/firestore'

import { authOptions } from '@/auth'
import { chatMembersCollectionGroupRef } from '@/lib/converters/chat-members'

import { ChatListRows } from '@/components/chat-list-rows'

export const ChatList = async () => {
  const session = await getServerSession(authOptions)

  const chatsSnapshot = await getDocs(
    chatMembersCollectionGroupRef(session?.user.id!)
  )

  const initialChats = chatsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    timestamp: null,
  }))
  return <ChatListRows initialChats={initialChats} />
}

import { ChatList } from '@/components/chat-list'

interface ChatPageProps {
  params: {}
  searchParams: {
    error: string
  }
}

const ChatsPage = ({ searchParams: { error } }: ChatPageProps) => {
  return (
    <div>
      <ChatList />
    </div>
  )
}

export default ChatsPage

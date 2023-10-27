import { ChatList } from '@/components/chat-list'
import { ChatPermissionError } from '@/components/chat-permission-error'

interface ChatPageProps {
  params: {}
  searchParams: {
    error: string
  }
}

const ChatsPage = ({ searchParams: { error } }: ChatPageProps) => {
  return (
    <div>
      {error && (
        <div className="m-2">
          <ChatPermissionError />
        </div>
      )}

      <ChatList />
    </div>
  )
}

export default ChatsPage

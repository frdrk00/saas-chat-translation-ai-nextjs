import { DeleteChatButton } from './delete-chat-button'
import { InviteUser } from './invite-user'

interface AdminControlsProps {
  chatId: string
}

export const AdminControls = ({ chatId }: AdminControlsProps) => {
  return (
    <div className="flex justify-end space-x-2 m-5 mb-0">
      <InviteUser chatId={chatId} />
      <DeleteChatButton chatId={chatId} />
    </div>
  )
}

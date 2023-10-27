'use client'

import { useCollectionData } from 'react-firebase-hooks/firestore'

import { ChatMembers, chatMembersRef } from '@/lib/converters/chat-members'
import { useAdminId } from '@/hooks/use-adminId'

import { LoadingSpinner } from '@/components/loading-spinner'
import { Badge } from '@/components/ui/badge'
import { UserAvatar } from './user-avatar'

interface ChatMembersBadgesProps {
  chatId: string
}

export const ChatMembersBadges = ({ chatId }: ChatMembersBadgesProps) => {
  const [members, loading, error] = useCollectionData<ChatMembers>(
    chatMembersRef(chatId)
  )

  const adminId = useAdminId({ chatId })

  if (loading && !members) return <LoadingSpinner />

  return (
    <>
      {!loading && (
        <div className="p-2 border rounded-xl m-5">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 p-2">
            {members?.map((member) => (
              <Badge
                variant="secondary"
                key={member.email}
                className="h-14 p-5 pl-2 pr-5 flex space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <UserAvatar name={member.email} image={member.image} />
                </div>

                <div>
                  <p>{member.email}</p>
                  {member.userId === adminId && (
                    <p className="text-indigo-400 animate-pulse">Admin</p>
                  )}
                </div>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

'use client'

import { chatMemberAdminRef } from '@/lib/converters/chat-members'
import { getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'

interface ChatMembersBadgesProps {
  chatId: string
}

export const useAdminId = ({ chatId }: ChatMembersBadgesProps) => {
  const [adminId, setAdminId] = useState<string>('')

  useEffect(() => {
    const fetchAdminStatus = async () => {
      const adminId = (await getDocs(chatMemberAdminRef(chatId))).docs.map(
        (doc) => doc.id
      )[0]

      setAdminId(adminId)
    }

    fetchAdminStatus()
  }, [chatId])
  return adminId
}

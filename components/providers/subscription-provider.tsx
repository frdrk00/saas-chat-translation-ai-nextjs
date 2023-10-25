'use client'

import { subscriptionRef } from '@/lib/converters/subscription'
import { onSnapshot } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export const SubscriptionProvider = () => {
  const { data: session } = useSession()

  useEffect(() => {
    if (!session?.user.id) return

    return onSnapshot(subscriptionRef(session?.user.id), (snapshot) => {
      if (snapshot.empty) {
        console.log('User has NO subscription')

        // set no subscription
        return
      } else {
        console.log('User has a subscription')

        // set subscription
      }
    })
  }, [session])

  return <div></div>
}

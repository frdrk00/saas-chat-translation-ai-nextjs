'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { onSnapshot } from 'firebase/firestore'

import { useSubscriptionStore } from '@/store/store'
import { subscriptionRef } from '@/lib/converters/subscription'

export const SubscriptionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { data: session } = useSession()
  const setSubscription = useSubscriptionStore((state) => state.setSubscription)

  useEffect(() => {
    if (!session?.user.id) return

    return onSnapshot(
      subscriptionRef(session?.user.id),
      (snapshot) => {
        if (snapshot.empty) {
          console.log('User has NO subscription')
          setSubscription(null)
          return
        } else {
          console.log('User has a subscription')
          setSubscription(snapshot.docs[0].data())
        }
      },
      (error) => {
        console.log('Error getting document:', error)
      }
    )
  }, [session, setSubscription])

  return <>{children}</>
}

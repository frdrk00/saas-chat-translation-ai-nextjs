'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'

import { db } from '@/firebase'
import { addDoc, collection, onSnapshot } from 'firebase/firestore'

import { useSubscriptionStore } from '@/store/store'

import { ManageAccountButton } from '@/components/manage-account-button'
import { LoadingSpinner } from '@/components/loading-spinner'

export const CheckoutButton = () => {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const subscription = useSubscriptionStore((state) => state.subscription)

  const isLoadingSubscription = subscription === undefined

  const isSubscription =
    subscription?.status === 'active' && subscription?.role === 'pro'

  const createCheckoutSession = async () => {
    if (!session?.user.id) return

    //push into firestore
    setLoading(true)

    const docRef = await addDoc(
      collection(db, 'customers', session.user.id, 'checkout_sessions'),
      {
        price: 'price_1O5D3zLybJkapqHX9lDy4cZd',
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    )

    //stripe ext login on firebase
    return onSnapshot(docRef, (snap) => {
      const data = snap.data()
      const url = data?.url
      const error = data?.error

      if (error) {
        // Show an  error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occured: ${error.message}`)
        setLoading(false)
      }

      if (url) {
        // We have a Stripe Checkout URL, let's redirect.
        window.location.assign(url)
        setLoading(false)
      }
    })

    //redirect to checkout page
  }
  return (
    <div className="flex flex-col space-y-2">
      {/* If subscribed show me the user is subscribed */}
      {isSubscription && (
        <>
          <hr className="mt-5" />
          <p className="pt-5 text-center text-xs text-indigo-600">
            You are subscribed to PRO
          </p>
        </>
      )}

      <div className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80 disabled:bg-indigo-600/50 disabled:text-white disabled:cursor-default">
        {isSubscription ? (
          <ManageAccountButton />
        ) : isLoadingSubscription || loading ? (
          <LoadingSpinner />
        ) : (
          <button onClick={() => createCheckoutSession()}>Sign Up</button>
        )}
      </div>
    </div>
  )
}

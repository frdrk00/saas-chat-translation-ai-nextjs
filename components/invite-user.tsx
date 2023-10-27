'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { getDocs, serverTimestamp, setDoc } from 'firebase/firestore'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircleIcon } from 'lucide-react'
import { useAdminId } from '@/hooks/use-adminId'

import { useSubscriptionStore } from '@/store/store'

import { getUserByEmailRef } from '@/lib/converters/user'
import { addChatRef, chatMembersRef } from '@/lib/converters/chat-members'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { Button } from '@/components/ui/button'
import { ShareLink } from '@/components/share-link'

interface InviteUserProps {
  chatId: string
}

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export const InviteUser = ({ chatId }: InviteUserProps) => {
  const { data: session } = useSession()
  const { toast } = useToast()
  const adminId = useAdminId({ chatId })
  const subscription = useSubscriptionStore((state) => state.subscription)
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [openInviteLink, setOpenInviteLink] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!session?.user.id) return

    toast({
      title: 'Sending invite',
      description: 'Please wat while we send the invite...',
    })

    // We need to get the users current to check if they're about to exceed the PRO plan
    const noOfUsersInChat = (await getDocs(chatMembersRef(chatId))).docs.map(
      (doc) => doc.data()
    ).length

    // check if the user is about to exceed the PRO plan which is 3 chats

    const isPro =
      subscription?.role === 'pro' && subscription.status === 'active'

    if (!isPro && noOfUsersInChat >= 2) {
      toast({
        title: 'Free plan limit exceeded',
        description:
          'You have exceeded the limit of users in a single chat for the plan. Please upgrade to PRO to continue adding users to chats!',
        variant: 'destructive',
        action: (
          <ToastAction
            altText="Upgrade"
            onClick={() => router.push('/register')}
          >
            Upgrade to PRO
          </ToastAction>
        ),
      })

      return
    }

    const querySnapshot = await getDocs(getUserByEmailRef(values.email))

    if (querySnapshot.empty) {
      toast({
        title: 'User not found',
        description:
          'Please enter an email address of a registered user OR resend the invitation once they gave signed up!',
        variant: 'destructive',
      })

      return
    } else {
      const user = querySnapshot.docs[0].data()

      await setDoc(addChatRef(chatId, user.id), {
        userId: user.id,
        email: user.email!,
        timestamp: serverTimestamp(),
        chatId: chatId,
        isAdmin: false,
        image: user.image || '',
      }).then(() => {
        setOpen(false)

        toast({
          title: 'Added to chat',
          description: 'The User has been added to the chat successfully!',
          className: 'bg-green-600 text-white',
          duration: 3000,
        })

        setOpenInviteLink(true)
      })
    }

    form.reset()
  }

  return (
    <>
      {adminId === session?.user.id && (
        <>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircleIcon className="mr-1" />
                Add User To Chat
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add User to Chat</DialogTitle>
                <DialogDescription>
                  Simply enter another users email address to invite them to
                  this chat!{' '}
                  <span className="text-indigo-600 font-bold">
                    (Note: they must be registered)
                  </span>
                </DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col space-y-2"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="john@doe.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button className="ml-auto sm:w-fit w-full" type="submit">
                    Add To Chat
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          <ShareLink
            isOpen={openInviteLink}
            setIsOpen={setOpenInviteLink}
            chatId={chatId}
          />
        </>
      )}
    </>
  )
}

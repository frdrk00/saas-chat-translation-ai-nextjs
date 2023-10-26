import { authOptions } from '@/auth'
import { getDocs } from 'firebase/firestore'
import { getServerSession } from 'next-auth'

export const ChatList = async () => {
  const session = await getServerSession(authOptions)

  //   const chatSnapshot = await getDocs(
  //     chatMembersCollectionGroupRef(session?.user.id!)
  //   )
  return <div></div>
}

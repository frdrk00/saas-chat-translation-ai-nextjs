import { generatePortalLink } from '@/actions/generate-portal-link'

export const ManageAccountButton = () => {
  return (
    <form action={generatePortalLink}>
      <button type="submit">Manage Billing</button>
    </form>
  )
}

import { prisma } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"


export default async function Dashboard() {
  const user = await currentUser()

  if (!user) {
    return new Error('User not found')
  }
  const applications = await prisma.job.findMany({
    where: {
      userId: user.id
    }
  })

  return (
    <main>
      <h1>Dashboard</h1>
      <pre>
        {JSON.stringify(applications, null, 2)}
      </pre>
    </main>
  )
}
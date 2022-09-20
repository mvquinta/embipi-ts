import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'

const Private: NextPage = () => {
    const router = useRouter()
    const { data: session, status } = useSession()

    const loading = status === 'loading'

    if (loading) {
        return null
    }

    if (!session) {
        router.push('/')
    }

    return (
        <>
            <div>Private</div>
            <div>
                <p>{session?.user?.email}</p>
                <p>{session?.user?.name}</p>
            </div>
        </>
    )
}

export default Private

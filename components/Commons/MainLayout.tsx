import Head from 'next/head'
import type { NextPage } from 'next'
import { useState } from 'react'
import { Session, User } from 'next-auth'
import { Sidebar, Navbar } from '@/components/index'

type Props = {
    children: React.ReactNode
    session: Session | null
    user: User
}

export const MainLayout: NextPage<Props> = ({ children, session, user }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const handleSidebar = async () => {
        setSidebarOpen(!sidebarOpen)
    }

    return (
        <>
            <Head>
                <title>embipi {user?.name}</title>
                <meta
                    name='embipi dashboard'
                    content='my baby path web app dasboard'
                />
            </Head>

            <div className='min-h-full'>
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    handleSidebar={handleSidebar}
                    session={session}
                />

                <div className='lg:pl-64 flex flex-col flex-1'>
                    <Navbar user={user} handleSidebar={handleSidebar} />
                </div>
            </div>
            <div className='lg:pl-64 flex flex-col flex-1'>{children}</div>
        </>
    )
}

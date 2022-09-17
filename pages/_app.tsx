import '@/styles/globals.css'
import { Session } from 'next-auth'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

function EmbipiApp({ Component, pageProps }: AppProps<{ session: Session }>) {
    return (
        <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
        </SessionProvider>
    )
}

export default EmbipiApp

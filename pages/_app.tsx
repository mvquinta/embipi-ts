import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

function EmbipiApp({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
        </SessionProvider>
    )
}

export default EmbipiApp

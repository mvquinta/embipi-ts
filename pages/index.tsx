import type { NextPage } from 'next'
import Head from 'next/head'
import EmbipiPage from './embipiPage'

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>embipi</title>
                <meta
                    name='embipi my baby path'
                    content='my baby path web app'
                />
                <link
                    rel='icon'
                    type='image/svg+xml'
                    href='/imgs/embipi_favicon.svg'
                />
                <link
                    rel='icon'
                    type='image/png'
                    href='/imgs/embipi_favicon.png'></link>
            </Head>
            <EmbipiPage />
        </>
    )
}

export default Home

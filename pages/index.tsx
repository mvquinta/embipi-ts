import type { NextPage } from 'next';
import Head from 'next/head';
import EmbipiHome from '@/pages/embipiHome';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>embipi</title>
                <meta name="embipi my baby path" content="my baby path web app" />
            </Head>
            <EmbipiHome />
        </>
    );
};

export default Home;

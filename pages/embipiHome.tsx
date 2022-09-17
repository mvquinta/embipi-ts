import type { NextPage } from 'next'
import { Hero, About, Features, Cta, Footer } from '@/components/index'

const EmbipiHome: NextPage = () => {
    return (
        <>
            <Hero />
            <Features />
            <About />
            <Cta />
            <Footer />
        </>
    )
}

export default EmbipiHome

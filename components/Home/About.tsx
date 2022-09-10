import React from 'react'
import Image from 'next/image'
import embipiC from '/public/imgs/EmbipiBaby_E.svg'
import embipiF from '/public/imgs/EmbipiBaby_F.svg'

interface Faqs {
    id: number
    question: string
    answer: string
}

const faqs: Faqs[] = [
    {
        id: 1,
        question: 'What is embipi?',
        answer: 'My Baby Path (mbp, embipi) is an app to help parents follow their baby’s growth and development. We count on a Pediatrician to deliver correct and useful information.',
    },
    {
        id: 2,
        question: 'Who is embipi for?',
        answer: "For every recent parent that wants to keep track of their child’s growth. From the baby's birth until he's 3 years old.",
    },
    {
        id: 3,
        question: 'What can I expect from it?',
        answer: 'A straightforward and simple app to use with easy interaction with our tools and features.',
    },
    {
        id: 4,
        question: 'Can I try it first?',
        answer: 'Of course, you can check out the demo version with some mock data and interact with our dashboard and tools. ',
    },
]

const devFaqs: Faqs[] = [
    {
        id: 1,
        question: 'Five Ws. Who, what, when, where, why?',
        answer: "My name is Miguel, I'm a self taught developer currently working as Frontend dev. The idea for this app first came to my wife when our son was born. It was shortly after when I started to learn how to code and so embipi became one of my pet projects. I used it to learn, to practise, to show and to connect. But I guess what keeps me motivated to follow with it is to know that I'm building something useful.",
    },
    {
        id: 2,
        question: 'What tecs are being used in embipi code?',
        answer: "I'm using Nextjs, Tailwind, Firebase and Jest + Testing Library for testing. Though I'm refactoring my code and will start using PostgreSQL and Prisma for the backend. ",
    },
    {
        id: 3,
        question: 'Current state of development?',
        answer: 'v0.0.1 is currently online with the most minimum features. It has serious UI/UX problems (and, to no surprise, some bugs) that need to be solved before continuing development. Finished homepage, next step Dashboard. On it!',
    },
    {
        id: 4,
        question: 'Want to follow and know more?',
        answer: "I'm developing embipi in my free time while building in public. I'm posting my small steps on Twitter. If you are curious stop by and follow me. You can also check my github repo if you want to look at the code I've been writing.",
    },
]

export const About: React.FC = () => {
    return (
        <>
            <div
                className='max-w-7xl mx-auto py-14 px-4 sm:px-6 lg:px-8'
                id='about'>
                <h2 className='w-full text-4xl font-extrabold leading-9 ml-0 md:ml-5 text-teal-700'>
                    So, what about embipi?
                </h2>
                <div className='w-full flex flex-col md:flex-row justify-center items-center'>
                    <div className='mt-10'>
                        <Image
                            className=''
                            src={embipiC}
                            alt='image kid with waving hand'
                        />
                    </div>
                    <dl className='w-full md:w-2/3 pl-0 md:pl-10'>
                        {faqs.map((faq) => (
                            <div className='relative' key={faq.id}>
                                <dt className='mb-4'>
                                    <h3 className='text-xl font-semibold'>
                                        {faq.question}
                                    </h3>
                                </dt>
                                <dd className='mb-8 pr-0 md:pr-28'>
                                    <p>{faq.answer}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' id='dev'>
                <h2 className='w-full text-4xl font-extrabold leading-9 pr-4 md:pr-28 text-teal-700 text-right mb-8'>
                    ...and what about development and coding?
                </h2>
                <div className='w-full flex flex-col md:flex-row justify-center items-center'>
                    <dl className='w-full md:w-2/3 pl-0 md:pl-10'>
                        {devFaqs.map((faq) => (
                            <div className='relative' key={faq.id}>
                                <dt className='mb-4'>
                                    <h3 className='text-xl font-semibold'>
                                        {faq.question}
                                    </h3>
                                </dt>
                                <dd className='mb-16'>
                                    <p>{faq.answer}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                    <div className='mt-0 md:mt-10'>
                        <Image
                            className=''
                            src={embipiF}
                            alt='image kid smiling with pile of books beside him'
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

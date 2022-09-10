import React from 'react'
import {
    BiLineChart,
    BiCalendarAlt,
    BiListUl,
    BiFoodMenu,
} from 'react-icons/bi'

interface Features {
    name: string
    description: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const features: Features[] = [
    {
        name: 'Percentile values',
        description:
            'Based in WHO data, check how your baby is growing compared to world data. Height, weight and head charts to visualise data.',
        icon: BiLineChart,
    },
    {
        name: 'Milestones',
        description:
            'Is important to follow and keep an updated register of your baby’s milestones. Mark them and celebrate them. Check the ones that your baby already achieved, and know what to expect next.',
        icon: BiCalendarAlt,
    },
    {
        name: 'Feeding',
        description:
            'Every day that passes is an opportunity for your child to taste something new. Discover together new food at the right time step by step.',
        icon: BiListUl,
    },
    {
        name: 'Agenda',
        description:
            "To help you remember important dates and let you register things not to be missed. Be it a doctor’s appointment, first day of pool. This way you won't miss a thing.",
        icon: BiFoodMenu,
    },
]

export const Features: React.FC = () => {
    return (
        <div className='py-12 bg-white' id='features'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='lg:text-center'>
                    <h2 className='text-base text-teal-600 font-semibold tracking-wide uppercase'>
                        From 0 t0 3 years old
                    </h2>
                    <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
                        Keep track of your baby path
                    </p>
                    <p className='mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto'>
                        Embipi offers usefull and easy to use features.
                    </p>
                    <p className='max-w-2xl text-xl text-gray-500 lg:mx-auto'>
                        Do not get overwhelmed and bloated with things you will
                        never use.
                    </p>
                </div>

                <div className='mt-10'>
                    <dl className='space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10'>
                        {features.map((feature) => (
                            <div key={feature.name} className='relative'>
                                <dt>
                                    <div className='absolute flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white'>
                                        <feature.icon
                                            className='h-6 w-6'
                                            aria-hidden='true'
                                        />
                                    </div>
                                    <p className='ml-16 text-lg leading-6 font-medium text-gray-900'>
                                        {feature.name}
                                    </p>
                                </dt>
                                <dd className='mt-2 ml-16 text-base text-gray-500'>
                                    {feature.description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}

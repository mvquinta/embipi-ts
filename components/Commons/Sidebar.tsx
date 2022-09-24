import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { Session } from 'next-auth'

import { Fragment } from 'react'
import {
    BiX,
    BiQuestionMark,
    BiHome,
    BiCog,
    BiLineChart,
    BiShield,
    BiListUl,
    BiFoodMenu,
    BiCalendar,
} from 'react-icons/bi'
import { Dialog, Transition } from '@headlessui/react'

type Props = {
    session: Session | null
    sidebarOpen: boolean
    handleSidebar: () => Promise<void>
}

export const Sidebar: NextPage<Props> = ({
    sidebarOpen,
    handleSidebar,
    session,
}) => {
    const router = useRouter()
    const activeRoute = router.route.split('/')[3]

    const navigation = [
        {
            name: 'Home',
            href: `/private/${session?.user?.name}`,
            icon: BiHome,
            current: activeRoute === undefined ? true : false,
        },
        {
            name: 'Percentiles',
            href: `/private/${session?.user?.name}/percentile`,
            icon: BiLineChart,
            current: activeRoute === 'percentile' ? true : false,
        },
        {
            name: 'Milestones',
            href: `/private/${session?.user?.name}/milestones`,
            icon: BiListUl,
            current: activeRoute === 'milestones' ? true : false,
        },
        {
            name: 'Food',
            href: '#',
            icon: BiFoodMenu,
            current: activeRoute === 'food' ? true : false,
        },
        {
            name: 'Agenda',
            href: '#',
            icon: BiCalendar,
            current: activeRoute === 'agenda' ? true : false,
        },
    ]
    const secondaryNavigation = [
        {
            name: 'Settings',
            href: `/private/${session?.user?.name}/settings`,
            icon: BiCog,
            current: activeRoute === 'settings' ? true : false,
        },
        { name: 'Help', href: '#', icon: BiQuestionMark, current: false },
        { name: 'Privacy', href: '#', icon: BiShield, current: false },
    ]

    function classNames(...classes: string[]): string {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <>
            {/* Sidebar for mobile */}
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog
                    as='div'
                    className='relative z-40 lg:hidden'
                    onClose={handleSidebar}>
                    <Transition.Child
                        as={Fragment}
                        enter='transition-opacity ease-linear duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition-opacity ease-linear duration-300'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'>
                        <div className='fixed inset-0 bg-gray-600 bg-opacity-75' />
                    </Transition.Child>

                    <div className='fixed inset-0 flex z-40'>
                        <Transition.Child
                            as={Fragment}
                            enter='transition ease-in-out duration-300 transform'
                            enterFrom='-translate-x-full'
                            enterTo='translate-x-0'
                            leave='transition ease-in-out duration-300 transform'
                            leaveFrom='translate-x-0'
                            leaveTo='-translate-x-full'>
                            <Dialog.Panel className='relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-teal-700'>
                                <Transition.Child
                                    as={Fragment}
                                    enter='ease-in-out duration-300'
                                    enterFrom='opacity-0'
                                    enterTo='opacity-100'
                                    leave='ease-in-out duration-300'
                                    leaveFrom='opacity-100'
                                    leaveTo='opacity-0'>
                                    <div className='absolute top-0 right-0 -mr-12 pt-2'>
                                        <button
                                            type='button'
                                            className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                                            onClick={handleSidebar}>
                                            <span className='sr-only'>
                                                Close sidebar
                                            </span>
                                            <BiX
                                                className='h-6 w-6 text-white'
                                                aria-hidden='true'
                                            />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className='flex-shrink-0 flex items-center px-4'>
                                    <Image
                                        className='h-8 w-auto sm:h-10'
                                        src='/imgs/03_Logo_embipi.svg'
                                        width='60px'
                                        height='60px'
                                        alt='embipi logo'
                                    />
                                </div>
                                <nav
                                    className='mt-5 flex-shrink-0 h-full divide-y divide-teal-800 overflow-y-auto'
                                    aria-label='Sidebar'>
                                    <div className='px-2 space-y-1'>
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}>
                                                <a
                                                    href='#'
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-teal-800 text-white'
                                                            : 'text-teal-100 hover:text-white hover:bg-teal-600',
                                                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                                    )}
                                                    aria-current={
                                                        item.current
                                                            ? 'page'
                                                            : undefined
                                                    }>
                                                    <item.icon
                                                        className='mr-4 flex-shrink-0 h-6 w-6 text-teal-200'
                                                        aria-hidden='true'
                                                    />
                                                    {item.name}
                                                </a>
                                            </Link>
                                        ))}
                                    </div>
                                    <div className='mt-6 pt-6'>
                                        <div className='px-2 space-y-1'>
                                            {secondaryNavigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}>
                                                    <a
                                                        key={item.name}
                                                        href='#'
                                                        className={classNames(
                                                            item.current
                                                                ? 'bg-teal-800 text-white'
                                                                : 'text-teal-100 hover:text-white hover:bg-teal-600',
                                                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                                        )}
                                                        aria-current={
                                                            item.current
                                                                ? 'page'
                                                                : undefined
                                                        }>
                                                        <item.icon
                                                            className='mr-4 h-6 w-6 text-teal-200'
                                                            aria-hidden='true'
                                                        />
                                                        {item.name}
                                                    </a>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </nav>
                            </Dialog.Panel>
                        </Transition.Child>
                        <div className='flex-shrink-0 w-14' aria-hidden='true'>
                            {/* Dummy element to force sidebar to shrink to fit close icon */}
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className='hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0'>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className='flex flex-col flex-grow bg-teal-700 pt-5 pb-4 overflow-y-auto'>
                    <div className='flex items-center flex-shrink-0 px-4'>
                        <Image
                            className='h-8 w-auto sm:h-10'
                            src='/imgs/03_Logo_embipi.svg'
                            width='60px'
                            height='60px'
                            alt='embipi logo'
                        />
                    </div>

                    <nav
                        className='mt-5 flex-1 flex flex-col divide-y divide-teal-800 overflow-y-auto'
                        aria-label='Sidebar'>
                        <div className='px-2 space-y-1'>
                            {navigation.map((item) => (
                                <Link key={item.name} href={item.href}>
                                    <a
                                        key={item.name}
                                        href='#'
                                        className={classNames(
                                            item.current
                                                ? 'bg-teal-800 text-white'
                                                : 'text-teal-100 hover:text-white hover:bg-teal-600',
                                            'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                                        )}
                                        aria-current={
                                            item.current ? 'page' : undefined
                                        }>
                                        <item.icon
                                            className='mr-4 flex-shrink-0 h-6 w-6 text-teal-200'
                                            aria-hidden='true'
                                        />
                                        {item.name}
                                    </a>
                                </Link>
                            ))}
                        </div>
                        <div className='mt-6 pt-6'>
                            <div className='px-2 space-y-1'>
                                {secondaryNavigation.map((item) => (
                                    <Link key={item.name} href={item.href}>
                                        <a
                                            key={item.name}
                                            href='#'
                                            className={classNames(
                                                item.current
                                                    ? 'bg-teal-800 text-white'
                                                    : 'text-teal-100 hover:text-white hover:bg-teal-600',
                                                'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                                            )}
                                            aria-current={
                                                item.current
                                                    ? 'page'
                                                    : undefined
                                            }>
                                            <item.icon
                                                className='mr-4 h-6 w-6 text-teal-200'
                                                aria-hidden='true'
                                            />
                                            {item.name}
                                        </a>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}

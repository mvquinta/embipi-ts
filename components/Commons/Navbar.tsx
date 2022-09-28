import { signOut } from 'next-auth/react'
import { Fragment } from 'react'
import { useRouter } from 'next/router'
import { BiMenu, BiBell, BiChevronDown } from 'react-icons/bi'
import { Menu, Transition } from '@headlessui/react'
import type { NextPage } from 'next'
import { UserProfile } from '../../types/types'

type Props = {
    user: UserProfile
    handleSidebar: () => Promise<void>
}

export const Navbar: NextPage<Props> = ({ user, handleSidebar }) => {
    const router = useRouter()
    const handleSignout = async () => {
        try {
            await signOut()
            router.push('/')
        } catch (error) {
            //type guard
            if (error instanceof Error) {
                const errorMessage = error.message
                console.error(errorMessage)
            } else {
                console.error('Unexpected error', error)
            }
        }
    }

    const handleRouterPushToSettings = (
        e: React.MouseEvent<HTMLAnchorElement>
    ) => {
        e.preventDefault()
        router.push(`/private/${user?.id}/settings`)
    }

    function classNames(...classes: string[]): string {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <>
            <div className='relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none'>
                <button
                    type='button'
                    className='px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 lg:hidden'
                    onClick={handleSidebar}>
                    <span className='sr-only'>Open sidebar</span>
                    <BiMenu className='h-6 w-6' aria-hidden='true' />
                </button>
                {/* Search bar */}
                <div className='flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8'>
                    <div className='flex-1 flex items-center text-xl'>
                        <h2>
                            <strong>embipi</strong> - your baby path
                        </h2>
                    </div>
                    <div className='ml-4 flex items-center md:ml-6'>
                        <button
                            type='button'
                            className='bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'>
                            <span className='sr-only'>View notifications</span>
                            <BiBell className='h-6 w-6' aria-hidden='true' />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as='div' className='ml-3 relative'>
                            <div>
                                <Menu.Button className='max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50'>
                                    <span className='inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500'>
                                        <span className='text-xl font-medium leading-none text-white'>
                                            {user?.name
                                                ?.charAt(0)
                                                .toUpperCase()}
                                            {user?.lastName
                                                ?.charAt(0)
                                                .toUpperCase()}
                                        </span>
                                    </span>
                                    <span className='hidden ml-3 text-gray-700 text-sm font-medium lg:block'>
                                        <span className='sr-only'>
                                            Open user menu for{' '}
                                        </span>
                                        {user?.name}
                                    </span>
                                    <BiChevronDown
                                        className='hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block'
                                        aria-hidden='true'
                                    />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter='transition ease-out duration-100'
                                enterFrom='transform opacity-0 scale-95'
                                enterTo='transform opacity-100 scale-100'
                                leave='transition ease-in duration-75'
                                leaveFrom='transform opacity-100 scale-100'
                                leaveTo='transform opacity-0 scale-95'>
                                <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href='#'
                                                className={classNames(
                                                    active ? 'bg-gray-100' : '',
                                                    'block px-4 py-2 text-sm text-gray-700'
                                                )}
                                                onClick={
                                                    handleRouterPushToSettings
                                                }>
                                                Settings
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href='#'
                                                className={classNames(
                                                    active ? 'bg-gray-100' : '',
                                                    'block px-4 py-2 text-sm text-gray-700'
                                                )}
                                                onClick={handleSignout}>
                                                Logout
                                            </a>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </div>
        </>
    )
}

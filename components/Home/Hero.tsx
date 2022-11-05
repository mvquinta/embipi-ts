import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { BiMenu, BiX } from 'react-icons/bi';
import embipiD from '/public/imgs/EmbipiBaby_D.svg';

interface Navigation {
    name: string;
    href: string;
}

const navigation: Navigation[] = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'About', href: '#about' },
    { name: 'Development', href: '#dev' },
];

export const Hero: NextPage = () => {
    return (
        <div className="relative bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                    <Popover>
                        <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                            <nav
                                className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                                aria-label="Global"
                            >
                                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                                    <div className="flex items-center justify-between w-full md:w-auto">
                                        <a href="#">
                                            <span className="sr-only">Workflow</span>
                                            <Image
                                                className="h-8 w-auto sm:h-10"
                                                src="/imgs/03_Logo_embipi.svg"
                                                width="60px"
                                                height="60px"
                                                alt="embipi logo"
                                            />
                                        </a>
                                        <div className="-mr-2 flex items-center md:hidden">
                                            <Popover.Button
                                                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
                                                data-cy="nav-mobile-btn-open"
                                            >
                                                <span className="sr-only">Open main menu</span>
                                                <BiMenu className="h-6 w-6" aria-hidden="true" />
                                            </Popover.Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="font-medium text-gray-500 hover:text-gray-900"
                                            data-cy={`nav-a-${item.name}`}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                    <Link href="/api/auth/signin">
                                        <a
                                            href="#"
                                            className="font-medium text-teal-600 hover:text-teal-500"
                                            data-cy="nav-a-login"
                                        >
                                            Log in
                                        </a>
                                    </Link>
                                </div>
                            </nav>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="duration-150 ease-out"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="duration-100 ease-in"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Popover.Panel
                                focus
                                className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                            >
                                <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                                    <div className="px-5 pt-4 flex items-center justify-between pb-12">
                                        <div>
                                            <Image
                                                className="h-8 w-auto"
                                                src="/imgs/03_Logo_embipi.svg"
                                                width="50px"
                                                height="50px"
                                                alt="embipi logo"
                                            />
                                        </div>
                                        <div className="-mr-2">
                                            <Popover.Button
                                                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
                                                data-cy="nav-mobile-btn-close"
                                            >
                                                <span className="sr-only">Close main menu</span>
                                                <BiX className="h-6 w-6" aria-hidden="true" />
                                            </Popover.Button>
                                        </div>
                                    </div>
                                    <div className="px-2 pt-2 pb-3 space-y-1">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                                data-cy={`nav-mobile-a-${item.name}`}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                    <Link href="/api/auth/signin">
                                        <a
                                            href="#"
                                            className="block w-full px-5 py-3 text-center font-medium text-white bg-gray-900 hover:bg-teal-800"
                                            data-cy="nav-mobile-a-login"
                                        >
                                            Log in
                                        </a>
                                    </Link>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>

                    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="sm:text-center lg:text-left" id="home">
                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                <span className="block xl:inline">embipi</span>{' '}
                                <span className="block text-teal-600 xl:inline">my baby path</span>
                            </h1>
                            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                Follow your baby growth with ease and love. With embipi you will
                                have all the important information and guidance to help you track
                                you child development
                            </p>
                            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                <div className="rounded-md shadow">
                                    <Link href="/api/auth/signin">
                                        <a
                                            href="#"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 md:py-4 md:text-lg md:px-10"
                                            data-cy="hero-a-register"
                                        >
                                            Register
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 p-8">
                <Image
                    className="h-56 w-full object-fit sm:h-72 md:h-96 lg:w-full lg:h-full"
                    src={embipiD}
                    layout="responsive"
                    width={700}
                    height={475}
                    alt="embipi hero image"
                />
            </div>
        </div>
    );
};

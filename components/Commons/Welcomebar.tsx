import { NextPage } from 'next';
import Link from 'next/link';
import { BiFace, BiCake } from 'react-icons/bi';
import { UserChildren, UserProfile } from '../../types/types';

type Props = {
    user: UserProfile;
    child: UserChildren;
};

export const Welcomebar: NextPage<Props> = ({ user, child }) => {
    return (
        <>
            <div className="bg-white shadow">
                <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
                    <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                        <div className="flex-1 min-w-0">
                            {/* Profile */}
                            <div className="flex items-center">
                                <span className="hidden sm:inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-500">
                                    <span className="text-xl font-medium leading-none text-white">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </span>
                                </span>
                                <div>
                                    <div className="flex items-center">
                                        <span className="h-16 w-16 inline-flex sm:hidden items-center justify-center rounded-full bg-gray-500">
                                            <span className="text-xl font-medium leading-none text-white">
                                                {user?.name?.charAt(0).toUpperCase()}
                                            </span>
                                        </span>

                                        <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                                            Hi{user?.name} {user?.lastName}
                                        </h1>
                                    </div>
                                    <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                                        <dt className="sr-only">Baby name</dt>
                                        <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                                            <BiFace
                                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                            {child?.[0].userBabyName}
                                        </dd>
                                        <dt className="sr-only">Baby birthday</dt>
                                        <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                                            <BiCake
                                                className="flex-shrink-0 mr-1.5 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                            {child?.[0].userBabyBirth}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                            <Link href={`/private/${user?.id}/settings`}>
                                <a className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                    Update child data
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

import { NextPage } from 'next';
import Link from 'next/link';

export const Cta: NextPage = () => {
    return (
        <div className="bg-gray-50" id="cta">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        <span className="block">Wanna go for it?</span>
                    </h2>
                    <h3 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        <span className="block text-teal-600">
                            Register and start following your baby growth
                        </span>
                        <span className="block text-2xl font-medium">
                            Or click in Demo version to check it out first
                        </span>
                    </h3>
                </div>
                <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                    <div className="inline-flex rounded-md shadow">
                        <Link href="/api/auth/signin">
                            <a
                                href="#cta"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
                                data-cy="cta-btn-get-started"
                            >
                                Get started
                            </a>
                        </Link>
                    </div>
                    <div className="ml-3 inline-flex rounded-md shadow group">
                        <Link href="#">
                            <a
                                href="#cta"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-teal-600 bg-white hover:bg-teal-50"
                                data-cy="cta-btn-demo"
                            >
                                Demo version
                                <span className="tooltip-text text-white bg-gray-900 p-3 -mt-20  rounded-md hidden group-hover:block absolute text-center py-2 px-6 z-50">
                                    In develpment
                                </span>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

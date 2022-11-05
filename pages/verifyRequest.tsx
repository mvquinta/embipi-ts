import Head from 'next/head';
import Image from 'next/image';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const VerifyRequest: NextPage = () => {
    const router = useRouter();

    const handleBackButton = () => {
        router.push('/');
    };
    return (
        <>
            <Head>
                <title>embipi</title>
                <meta name="embipi verify request" content="Page notificate user to check email" />
            </Head>

            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <div className="h-full w-auto flex justify-center">
                            <Image
                                className="h-8 w-auto sm:h-10"
                                src="/imgs/03_Logo_embipi.svg"
                                width="60px"
                                height="60px"
                                alt="embipi logo"
                            />
                        </div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Almost there!
                        </h2>
                    </div>
                    <div className="bg-gray-50 sm:rounded-lg text-center">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Check your email.
                            </h3>
                            <div className="mt-2 max-w-xl text-sm text-gray-500">
                                <p>A sign in link has been sent to your email address.</p>
                                <p>Sometimes it can take more than 1 minute to be sent...</p>
                            </div>
                            <div className="mt-2 max-w-xl text-xs text-red-900 font-bold">
                                <p>
                                    If it goes way beyond that time please take a look at your
                                    junk/spam folder.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="pt-2">
                        <button
                            className="group relative w-full flex justify-center mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            data-cy="back-btn"
                            onClick={handleBackButton}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VerifyRequest;

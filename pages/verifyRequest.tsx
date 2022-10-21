import Head from 'next/head';
import Image from 'next/image';
import type { NextPage } from 'next';

const VerifyRequest: NextPage = () => {
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VerifyRequest;

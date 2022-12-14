import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { prisma } from '@/lib/prisma';
import { FormValues } from 'types/types';
import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useUtils } from '@/lib/utils';
import { useSession, getSession } from 'next-auth/react';
import { Loader } from '@/components/index';
import { getUserProfile, getChild } from '@/lib/data';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session) {
        let user = null;
        let child = null;
        return {
            props: {
                user,
                child,
            },
        };
    }

    let user = await getUserProfile(session.user.id, prisma);
    user = JSON.parse(JSON.stringify(user));

    let child = await getChild(session.user.id, prisma);
    child = JSON.parse(JSON.stringify(child));

    return {
        props: {
            user,
            child,
        },
    };
};

const Onboarding: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
    child,
}) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const utils = useUtils();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({ mode: 'onBlur' });
    const loading = status === 'loading';

    if (loading) {
        return <Loader />;
    }

    if (!session || !session.user) {
        router.push('/');
        return null;
    }

    if (!loading && session && child.length > 0) {
        router.push({
            pathname: '/private/[id]/dashboard',
            query: { id: session.user.id },
        });
        return <Loader />;
    }

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        let babyMonths = utils.ageInMonths(data.userBabyBirth as Date);

        const submit = async () => {
            await axios.post('/api/onboarding', { data, babyMonths });
            router.push({
                pathname: '/private/[id]/dashboard',
                query: { id: session.user.id },
            });
        };
        submit();
    };

    return (
        <>
            <Head>
                <title>embipi</title>
                <meta name="embipi onboarding" content="Page with oboarding form" />
            </Head>
            <>
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
                                Welcome!
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-600">
                                We are so glad that you and your baby joined us.
                            </p>
                        </div>
                        <form
                            className="mt-8 space-y-6"
                            action="#"
                            method="POST"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="flex flex-col sm:flex-row justify-start gap-4 mb-6">
                                    <div>
                                        <label
                                            htmlFor="userName"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            First name
                                        </label>
                                        <input
                                            id="userName"
                                            type="text"
                                            autoComplete="userName"
                                            className="mt-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                            placeholder="First name"
                                            {...register('userName', {
                                                required: 'You must insert your userNamename',
                                                minLength: {
                                                    value: 2,
                                                    message: 'Name is to short.',
                                                },
                                                maxLength: {
                                                    value: 16,
                                                    message: 'Name must be under 16 characters',
                                                },
                                                pattern: {
                                                    value: /^[A-Za-z ]+$/i,
                                                    message:
                                                        'Name can only have alphabet characters',
                                                },
                                            })}
                                        />
                                        {errors.userName && (
                                            <span className="text-red-500">
                                                {errors.userName.message}
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="lastName"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Last name
                                        </label>
                                        <input
                                            id="lastName"
                                            type="text"
                                            autoComplete="lastName"
                                            className="mt-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                            placeholder="Last name"
                                            {...register('lastName', {
                                                required: 'You must insert your last name',
                                                minLength: {
                                                    value: 2,
                                                    message: 'Name is to short.',
                                                },
                                                maxLength: {
                                                    value: 16,
                                                    message: 'Name must be under 16 characters',
                                                },
                                                pattern: {
                                                    value: /^[A-Za-z ]+$/i,
                                                    message:
                                                        'Name can only have alphabet characters',
                                                },
                                            })}
                                        />
                                        {errors.lastName && (
                                            <span className="text-red-500">
                                                {errors.lastName.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="userBabyName"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Baby Name
                                    </label>
                                    <input
                                        id="userBabyName"
                                        type="text"
                                        autoComplete="userBabyName"
                                        className="mt-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                        placeholder="Baby name"
                                        {...register('userBabyName', {
                                            required: 'You must insert your baby name',
                                            minLength: {
                                                value: 2,
                                                message: 'Name is to short.',
                                            },
                                            maxLength: {
                                                value: 16,
                                                message: 'Name must be under 16 characters',
                                            },
                                            pattern: {
                                                value: /^[A-Za-z ]+$/i,
                                                message: 'Name can only have alphabtet characters',
                                            },
                                        })}
                                    />
                                    {errors.userBabyName && (
                                        <span className="text-red-500">
                                            {errors.userBabyName.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Baby Gender
                                </label>
                                <div className="flex gap-5">
                                    <div>
                                        <input
                                            id="babyGenderMale"
                                            className="peer hidden"
                                            type="radio"
                                            value="male"
                                            autoComplete="userBabyGender"
                                            {...register('userBabyGender', {
                                                required: 'You must inser baby gender',
                                            })}
                                        />
                                        <label
                                            className="w-8 h-8 px-8 cursor-pointer focus:outline-none ring-2 ring-offset-2 ring-gray-200  rounded-sm flex justify-center items-center gap-2 peer-checked:bg-teal-500 peer-checked:ring-teal-500"
                                            htmlFor="babyGenderMale"
                                        >
                                            Male
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            id="babyGenderFemale"
                                            className="peer hidden"
                                            type="radio"
                                            autoComplete="userBabyGender"
                                            value="female"
                                            {...register('userBabyGender', {
                                                required: 'You must inser baby gender',
                                            })}
                                            name="userBabyGender"
                                        />
                                        <label
                                            className="w-8 h-8 px-8 cursor-pointer focus:outline-none ring-2 ring-offset-2 ring-gray-200  rounded-sm flex justify-center items-center gap-2 peer-checked:bg-teal-500 peer-checked:ring-teal-500"
                                            htmlFor="babyGenderFemale"
                                        >
                                            Female
                                        </label>
                                    </div>
                                </div>
                                {errors.userBabyGender && (
                                    <span className="text-red-500">
                                        {errors.userBabyGender.message}
                                    </span>
                                )}
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-sm font-medium text-gray-900">
                                            Baby birthday
                                        </h2>
                                    </div>
                                    <div>
                                        <input
                                            id="userBabyBirth"
                                            type="date"
                                            autoComplete="userBabyBirth"
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm mt-2"
                                            {...register('userBabyBirth', {
                                                required: 'You must insert your baby age',
                                            })}
                                        />
                                        {errors.userBabyBirth && (
                                            <span className="text-red-500">
                                                {errors.userBabyBirth.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 justify-center">
                                <div>
                                    <label
                                        htmlFor="userBabyHeight"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Baby Height
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <input
                                            type="number"
                                            id="userBabyHeight"
                                            className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="0.0"
                                            step="0.1"
                                            aria-describedby="user-Baby-Height"
                                            {...register('userBabyHeight', {
                                                required: 'Baby Height is required',
                                                maxLength: {
                                                    value: 5,
                                                    message: 'Max 5 chars',
                                                },
                                                minLength: {
                                                    value: 2,
                                                    message: 'Min 2 numbers',
                                                },
                                            })}
                                        />
                                        {errors.userBabyHeight && (
                                            <span className="text-red-500">
                                                {errors.userBabyHeight.message}
                                            </span>
                                        )}
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <span
                                                className="text-gray-500 sm:text-sm"
                                                id="userBabyHeight"
                                            >
                                                cm
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="userBabyWeight"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Baby Weight
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <input
                                            type="number"
                                            id="userBabyWeight"
                                            className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="0.0"
                                            step="0.1"
                                            aria-describedby="user-Baby-Weight"
                                            {...register('userBabyWeight', {
                                                required: 'Baby Weight is required',
                                                maxLength: {
                                                    value: 4,
                                                    message: 'Max 3 numbers',
                                                },
                                                minLength: {
                                                    value: 1,
                                                    message: 'Min 1 number',
                                                },
                                            })}
                                        />
                                        {errors.userBabyWeight && (
                                            <span className="text-red-500">
                                                {errors.userBabyWeight.message}
                                            </span>
                                        )}
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <span
                                                className="text-gray-500 sm:text-sm"
                                                id="userBabyWeight"
                                            >
                                                kg
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="userBabyHead"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Baby Head
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <input
                                            type="number"
                                            id="userBabyHead"
                                            className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="0.0"
                                            step="0.1"
                                            aria-describedby="user-Baby-Head"
                                            {...register('userBabyHead', {
                                                required: 'Baby Head is required',
                                                maxLength: {
                                                    value: 5,
                                                    message: 'Max 5 chars',
                                                },
                                                minLength: {
                                                    value: 2,
                                                    message: 'Min 2 numbers',
                                                },
                                            })}
                                        />
                                        {errors.userBabyHead && (
                                            <span className="text-red-500">
                                                {errors.userBabyHead.message}
                                            </span>
                                        )}
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <span
                                                className="text-gray-500 sm:text-sm"
                                                id="userBabyHead"
                                            >
                                                cm
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                >
                                    Go to your dashboard
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        </>
    );
};

export default Onboarding;

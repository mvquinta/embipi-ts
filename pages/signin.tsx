import Head from 'next/head'
import Image from 'next/image'
import type {
    NextPage,
    GetServerSideProps,
    GetServerSidePropsContext,
} from 'next'
import { Session } from 'next-auth'
import { getSession, getProviders, signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Loader } from '@/components/index'
import { MdLock } from 'react-icons/md'

type FormValues = {
    email: string
}

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { req } = context
    const session: Session | null = await getSession({ req })
    if (session && !session?.user?.name) {
        return {
            redirect: {
                destination: '/onboarding',
                permanent: false,
            },
        }
    }
    if (session && session?.user?.id) {
        return {
            redirect: {
                destination: `/private/${session.user.id}`,
                permanent: false,
            },
        }
    }

    return { props: { providers: await getProviders() } }
}

const Signin: NextPage = () => {
    const { data: session, status } = useSession()
    const router = useRouter()
    const loading = status === 'loading'
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({ mode: 'onBlur' })

    if (loading) {
        return <Loader />
    }

    if (session) {
        router.push(`/private/${session.user.id}`)
    }

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        let abortController = new AbortController()
        const submit = async () => {
            try {
                signIn('email', { email: data.email })
            } catch (error) {
                //type guard
                if (error instanceof Error) {
                    error.name === `AbortError`
                        ? console.log('error', error.name)
                        : console.log(error.message)
                } else {
                    console.log('Unexpected error', error)
                }
            }
        }
        submit()
        return () => {
            abortController.abort()
        }
    }

    const handleBackButton = () => {
        router.push('/')
    }

    return (
        <>
            <Head>
                <title>embipi</title>
                <meta
                    name='embipi signin user'
                    content='Page with form to signin users'
                />
                <link
                    rel='icon'
                    type='image/svg+xml'
                    href='/imgs/embipi_favicon.svg'
                />
                <link
                    rel='icon'
                    type='image/png'
                    href='/imgs/embipi_favicon.png'></link>
            </Head>

            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
                        <div className='max-w-md w-full space-y-8'>
                            <div>
                                <div className='h-full w-auto flex justify-center'>
                                    <Image
                                        className='h-8 w-auto sm:h-10'
                                        src='/imgs/03_Logo_embipi.svg'
                                        width='60px'
                                        height='60px'
                                        alt='embipi logo'
                                    />
                                </div>
                                <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                                    Welcome to embipi!
                                </h2>
                                <p className='mt-2 text-center text-sm text-gray-600'>
                                    Sign in to build your baby path.
                                </p>
                            </div>
                            <form
                                className='mt-8 space-y-6'
                                action='#'
                                method='POST'
                                onSubmit={handleSubmit(onSubmit)}>
                                <input
                                    type='hidden'
                                    name='remember'
                                    defaultValue='true'
                                />
                                <div className='rounded-md shadow-sm -space-y-px'>
                                    <div>
                                        <label
                                            htmlFor='email-address'
                                            className='sr-only'>
                                            Email address
                                        </label>
                                        <input
                                            id='email-address'
                                            //name='email'
                                            type='email'
                                            autoComplete='email'
                                            required
                                            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm'
                                            placeholder='Email address'
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                    message:
                                                        'Invalid email address.',
                                                },
                                            })}
                                        />
                                        {errors.email && (
                                            <span className='text-red-500'>
                                                {errors.email.message}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type='submit'
                                        className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'>
                                        <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                                            <MdLock
                                                className='h-5 w-5 text-white'
                                                aria-hidden='true'
                                            />
                                        </span>
                                        Sign in
                                    </button>
                                    <button
                                        className='group relative w-full flex justify-center mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'
                                        data-cy='back-btn'
                                        onClick={handleBackButton}>
                                        Back
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Signin

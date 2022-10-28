import type { NextPage } from 'next';
import axios from 'axios';
import { UserProfile, UserChildren, FormValues, CheckedGender } from 'types/types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useUtils } from '@/lib/utils';
import { useRouter } from 'next/router';

type Props = {
    user: UserProfile;
    child: UserChildren;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FormSettings: NextPage<Props> = ({ user, child, loading, setLoading }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>();
    const utils = useUtils();
    const router = useRouter();

    const [checked, setChecked] = useState<CheckedGender | null>(
        child
            ? {
                  male: child[0]?.userBabyGender === 'male',
                  female: child[0]?.userBabyGender === 'female',
              }
            : null,
    );
    const changeRadio: (e: any) => void = (e) => {
        setChecked(() => {
            return {
                male: false,
                female: false,
                [e.target.value]: true,
            };
        });
    };

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        setLoading(!loading);
        if (data.userName === '') {
            data.userName = user?.name as string;
        }
        if (data.lastName === '') {
            data.lastName = user?.lastName as string;
        }
        if (data.email === '') {
            data.email = user?.email as string;
        }
        if (data.userBabyName === '') {
            data.userBabyName = child[0].userBabyName;
        }
        if (data.userBabyBirth === '') {
            data.userBabyBirth = child[0].userBabyBirth;
        }
        if (data.userBabyGender === '') {
            data.userBabyGender = child[0].userBabyGender;
        }
        if (data.userBabyHeight === 0) {
            data.userBabyHeight = child[0].userBabyHeight;
        }
        if (data.userBabyWeight === 0) {
            data.userBabyWeight = child[0].userBabyWeight;
        }
        if (data.userBabyHead === 0) {
            data.userBabyHead = child[0].userBabyHead;
        }

        submitForm(data);
    };

    const submitForm: SubmitHandler<FormValues> = async (values) => {
        let babyMonths = utils.ageInMonths(values.userBabyBirth as Date);

        async function updateSettings() {
            try {
                const res = await axios.put('/api/settings/', {
                    values,
                    babyMonths,
                });

                if (res.status < 300) {
                    refreshData();
                    console.log('Success, settings updated');
                }
            } catch (error) {
                console.error(error);
            }
        }

        updateSettings();
    };

    const refreshData = () => {
        router.replace(router.asPath);
        setLoading(!loading);
    };

    const handleCancel = () => {
        reset({
            userName: user ? (user.name as string) : '',
            lastName: user ? (user.lastName as string) : '',
            email: user ? (user.email as string) : '',
            userBabyName: child ? child[0].userBabyName : '',
            userBabyBirth: child ? child[0].userBabyBirth : '',
            userBabyHeight: child ? child[0].userBabyHeight : 0,
            userBabyWeight: child ? child[0].userBabyWeight : 0,
            userBabyHead: child ? child[0].userBabyHead : 0,
        });
        setChecked(
            child
                ? {
                      male: child[0]?.userBabyGender === 'male',
                      female: child[0]?.userBabyGender === 'female',
                  }
                : null,
        );
    };

    return (
        <form className="mt-8 space-y-6" action="#" method="PUT" onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Personal Information
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Use a permanent address where you can receive mail.
                        </p>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="userName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    First name *
                                </label>
                                <input
                                    id="userName"
                                    type="text"
                                    className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    defaultValue={user?.name ?? ''}
                                    {...register('userName', {
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
                                            message: 'Name can only have alphabet characters',
                                        },
                                    })}
                                />
                                {errors.userName && (
                                    <span className="text-red-500">{errors.userName.message}</span>
                                )}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="lastName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Last name
                                </label>
                                <input
                                    id="lastName"
                                    type="text"
                                    className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    defaultValue={user?.lastName ?? ''}
                                    {...register('lastName', {
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
                                            message: 'Name can only have alphabet characters',
                                        },
                                    })}
                                />
                                {errors.lastName && (
                                    <span className="text-red-500">{errors.lastName.message}</span>
                                )}
                            </div>

                            <div className="col-span-6 sm:col-span-4">
                                <label
                                    htmlFor="email-address"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email address *
                                </label>
                                <input
                                    id="email-address"
                                    type="email"
                                    className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    defaultValue={user?.email ?? ''}
                                    {...register('email', {
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: 'Invalid email address.',
                                        },
                                    })}
                                />
                                {errors.email && (
                                    <span className="text-red-500">{errors.email.message}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Children Information
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Remember to update from time to time your children percentile
                            information for a correct data display.
                        </p>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="userBabyName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Baby name *
                                </label>
                                <input
                                    id="userBabyName"
                                    type="text"
                                    className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    defaultValue={child ? child[0]?.userBabyName : ''}
                                    {...register('userBabyName', {
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
                                            message: 'Name can only have alphabet characters',
                                        },
                                    })}
                                />
                                {errors.userBabyName && (
                                    <span className="text-red-500">
                                        {errors.userBabyName.message}
                                    </span>
                                )}
                            </div>

                            <div className="col-span-6 sm:col-span-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Baby Gender
                                    </label>
                                    <div className="flex gap-5">
                                        <div>
                                            <input
                                                id="babyGenderMale"
                                                className="peer hidden"
                                                checked={child ? checked?.male : false}
                                                type="radio"
                                                value="male"
                                                {...register('userBabyGender', {
                                                    onChange: (e) => changeRadio(e),
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
                                                checked={child ? checked?.female : false}
                                                type="radio"
                                                value="female"
                                                {...register('userBabyGender', {
                                                    onChange: (e) => changeRadio(e),
                                                })}
                                            />
                                            <label
                                                className="w-8 h-8 px-8 cursor-pointer focus:outline-none ring-2 ring-offset-2 ring-gray-200  rounded-sm flex justify-center items-center gap-2 peer-checked:bg-teal-500 peer-checked:ring-teal-500"
                                                htmlFor="babyGenderFemale"
                                            >
                                                Female
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-6 sm:col-span-4">
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
                                                type="text"
                                                defaultValue={child ? child[0]?.userBabyBirth : ''}
                                                onFocus={(e) => {
                                                    e.currentTarget.type = 'date';
                                                    e.currentTarget.focus();
                                                }}
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm mt-2"
                                                {...register('userBabyBirth')}
                                            />
                                            {errors.userBabyBirth && (
                                                <span className="text-red-500">
                                                    {errors.userBabyBirth.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-6 sm:col-span-4">
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
                                                defaultValue={
                                                    child ? child[0].userBabyHeight.toString() : ''
                                                }
                                                step="0.1"
                                                aria-describedby="user-Baby-Height"
                                                {...register('userBabyHeight', {
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
                                                defaultValue={
                                                    child ? child[0]?.userBabyWeight.toString() : ''
                                                }
                                                step="0.1"
                                                aria-describedby="user-Baby-Weight"
                                                {...register('userBabyWeight', {
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
                                                defaultValue={
                                                    child ? child[0]?.userBabyHead.toString() : ''
                                                }
                                                step="0.1"
                                                aria-describedby="user-Baby-Head"
                                                {...register('userBabyHead', {
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                    Save
                </button>
            </div>
        </form>
    );
};

import type { NextPage } from 'next'
import { Fragment, useEffect, useState } from 'react'
import { Transition, Listbox } from '@headlessui/react'
import { BiChevronDown, BiCheck } from 'react-icons/bi'

type Props = {
    handleMonthDropDown: (month: string) => void
    activeMonthToShow: string
}

type Months = {
    id: number
    month: string
    objKeyName: string
}

const months: Months[] = [
    { id: 1, month: '2 Months', objKeyName: 'monthtwo' },
    { id: 2, month: '4 Months', objKeyName: 'monthfour' },
    { id: 3, month: '6 Months', objKeyName: 'monthsix' },
    { id: 4, month: '9 Months', objKeyName: 'monthnine' },
    { id: 5, month: '12 Months', objKeyName: 'monthtwelve' },
    { id: 6, month: '18 Months', objKeyName: 'montheighteen' },
    { id: 7, month: '24 Months', objKeyName: 'monthtwentyfour' },
]

function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ')
}
const MilestonesDropdown: NextPage<Props> = ({
    handleMonthDropDown,
    activeMonthToShow,
}) => {
    const [selected, setSelected] = useState<Months | null>(null)

    useEffect(() => {
        months.map((item) => {
            if (item.objKeyName === activeMonthToShow) {
                setSelected(item)
            }
        })
    }, [activeMonthToShow])

    return (
        <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <>
                    <Listbox.Label className='block text-sm font-medium text-gray-700'>
                        Months
                    </Listbox.Label>
                    <div className='mt-1 relative'>
                        <Listbox.Button className='relative w-min bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm'>
                            {selected ? (
                                <span className='block truncate'>
                                    {selected.month}
                                </span>
                            ) : null}

                            <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                                <BiChevronDown
                                    className='h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave='transition ease-in duration-100'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'>
                            <Listbox.Options className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                                {months.map((mth) => (
                                    <Listbox.Option
                                        key={mth.id}
                                        className={({ active }) =>
                                            classNames(
                                                active
                                                    ? 'text-white bg-teal-600'
                                                    : 'text-gray-900',
                                                'cursor-default select-none relative py-2 pl-8 pr-4'
                                            )
                                        }
                                        value={mth}
                                        onClick={() =>
                                            handleMonthDropDown(mth.objKeyName)
                                        }>
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={classNames(
                                                        selected
                                                            ? 'font-semibold'
                                                            : 'font-normal',
                                                        'block truncate'
                                                    )}>
                                                    {mth.month}
                                                </span>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active
                                                                ? 'text-white'
                                                                : 'text-teal-600',
                                                            'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                        )}>
                                                        <BiCheck
                                                            className='h-5 w-5'
                                                            aria-hidden='true'
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}

export default MilestonesDropdown

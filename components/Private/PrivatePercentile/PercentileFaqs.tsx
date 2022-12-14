import type { NextPage } from 'next';
import { Disclosure } from '@headlessui/react';
import { BiChevronDown } from 'react-icons/bi';

const faqs = [
    {
        question: "What's percentile? What are all these values?",
        answer: "These charts shows how your baby's size compares with other kids of the same age. The Y axis are the values and the X axis your baby age in months. As an example, if your baby positions under curve 50th, it means he weights less than the majority",
    },
    {
        question: 'Should I be worried if my child percentile values are too low? Or to high?',
        answer: 'Do not worry if your baby is not right in the middle. The normal range is very wide and these measurements do not reflect exactly how your baby will be as an adult.',
    },
    {
        question: 'And the data for the charts?',
        answer: 'These charts are built with data provided by WHO - World Health Organization for children under age 3',
    },
    {
        question: "What's is WHO - World Health Organization?",
        answer: 'Founded in 1948, WHO is the United Nations agency that connects nations, partners and people to promote health, keep the world safe and serve the vulnerable so everyone, everywhere can attain the highest level of health. WHO leads global efforts to expand universal health coverage. We direct and coordinate the world’s response to health emergencies. And we promote healthier lives from pregnancy care through old age. (text from WHO official site)',
    },
];

function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ');
}

export const PercentileFaqs: NextPage = () => {
    return (
        <div className="bg-gray-50 mt-10 shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:py-8 sm:px-6 lg:px-8 ">
                <div className="w-full ">
                    <h2 className="text-xl font-extrabold text-gray-900">
                        Frequently asked questions
                    </h2>
                    <p className="ml-2 mt-1 text-sm text-gray-500">
                        Important and remember! Information and data shown in embipi is only a rough
                        guide. Everything that concerns you and your family should be consulted with
                        a professional and/or specialist.
                    </p>
                    <dl className="mt-6 space-y-6 divide-y divide-gray-200">
                        {faqs.map((faq) => (
                            <Disclosure as="div" key={faq.question} className="pt-6">
                                {({ open }) => (
                                    <>
                                        <dt className="text-lg">
                                            <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                                                <span className="font-medium text-gray-900">
                                                    {faq.question}
                                                </span>
                                                <span className="ml-6 h-7 flex items-center">
                                                    <BiChevronDown
                                                        className={classNames(
                                                            open ? '-rotate-180' : 'rotate-0',
                                                            'h-6 w-6 transform',
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            </Disclosure.Button>
                                        </dt>
                                        <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                            <p className="text-base text-gray-500">{faq.answer}</p>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
};

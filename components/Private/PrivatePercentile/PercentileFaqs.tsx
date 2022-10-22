import type { NextPage } from 'next';
import { Disclosure } from '@headlessui/react';
import { BiChevronDown } from 'react-icons/bi';

const faqs = [
    {
        question: "What's percentile? What are all these values?",
        answer: "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
        question: "What's is WHO - World Health Organization?",
        answer: 'Founded in 1948, WHO is the United Nations agency that connects nations, partners and people to promote health, keep the world safe and serve the vulnerable so everyone, everywhere can attain the highest level of health. WHO leads global efforts to expand universal health coverage. We direct and coordinate the world’s response to health emergencies. And we promote healthier lives from pregnancy care through old age. (text from WHO official site)',
    },
    {
        question: 'Should I be worried if my child percentile values are too low? Or to high?',
        answer: "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
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

import { Disclosure } from '@headlessui/react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Live', href: '/live', current: false },
    { name: 'Leagues', href: '/leagues', current: false },
    { name: 'Result', href: '#', current: false },
    { name: 'About Us', href: '/about', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Menu({ open }) { // Add open as a prop
    const router = useRouter();

    const navigationWithCurrent = navigation.map((item) => {
        return {
            ...item,
            current: router.pathname === item.href,
        };
    });

    return (
        <Disclosure as="nav" className="bg-gray-700 bg-opacity-90 sticky top-0 z-50 w-full overflow-hidden">
            <div className="max-w-5xl 2xl:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <Disclosure.Button
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            {open ? (
                                <AiOutlineClose className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <AiOutlineMenu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </Disclosure.Button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-end">
                        <div className="flex-1 flex items-center justify-center sm:justify-start">
                            <Link href="/" passHref>
                                <div className="mr-6 font-medium text-white">
                                    <div className="flex-shrink-0 flex items-center">
                                        <img className="block lg:hidden h-8 w-auto" src="./logo.png" alt="Workflow" />
                                        <img className="hidden lg:block h-8 w-auto" src="./logo.png" alt="Workflow" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                {navigationWithCurrent.map((item) => (
                                    <Link href={item.href} key={item.name} passHref>
                                        <div
                                            className={classNames(
                                                item.current
                                                    ? 'bg-gray-900 text-white'
                                                    : 'text-white hover:bg-gray-600 hover:text-white',
                                                'px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out transform hover:scale-105'
                                            )}
                                        >
                                            {item.name}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigationWithCurrent.map((item) => (
                        <Link href={item.href} key={item.name} passHref>
                            <div
                                className={classNames(
                                    item.current
                                        ? 'bg-gray-900 text-white'
                                        : 'text-white hover:bg-gray-600 hover:text-white',
                                    'block px-3 py-2 rounded-md text-base font-medium'
                                )}
                            >
                                {item.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </Disclosure.Panel>
        </Disclosure>
    );
}
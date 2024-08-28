
import Link from "next/link";
import LinkNav from "./LinkNav";
import { labels } from "@/data/labels";

const menuList = [
    { name: "Home", path: "/" },
    { name: "Electronics", path: "electronics" },
    { name: "Men's clothing", path: "mens-clothing" },
    { name: "Jewelry", path: "jewelry" },
    { name: "Women's clothing", path: "womens-clothing" }
];

function Navbar() {


    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Link href={'/'} className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        {labels.siteNameLabel}
                    </Link>
                </div>
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {menuList.map((item, index) => (
                            <li className="text-white" key={index}>
                                <LinkNav
                                    href={item.path}
                                    name={item.name}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export { Navbar };
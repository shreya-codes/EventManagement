import Link from "next/link";
import React from "react";

interface IProps {
  heading: string;
  actionItems?: IActionItem[];
}
interface IActionItem {
  title: string;
  directTo: string;
}
const Header: React.FC<IProps> = ({ heading, actionItems }) => {
  return (
    <nav className="border-b h-16 bg-white w-full md:static">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <h1 className="text-2xl font-bold">{heading}</h1>
        </div>
        <div className="hidden md:inline-block ml-auto">
          {actionItems?.map((item, index) => (
            <div key={index} className="inline-block px-4 py-2font-medium ">
              <Link
                href={item.directTo}
                className="text-blue-500 hover:text-blue-700"
              >
                {item.title}
              </Link>
            </div>
          ))}
        </div>{" "}
      </div>
    </nav>
  );
};

export default Header;

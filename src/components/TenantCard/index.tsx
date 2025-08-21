import React from "react";
import Link from "next/link";
import { PiArrowRightBold } from "react-icons/pi";

interface StatusCardProps {
  title: string;
  stats: [number, number, number, number];
  link: string;
}

const colors = ["bg-green-600", "bg-yellow-500", "bg-red-600", "bg-gray-400"];

export default function TenantCard(props: StatusCardProps) {
  return (
    <div className="flex flex-col items-center justify-between w-full p-4 space-y-4 text-white transition-shadow duration-300 rounded-lg shadow-xl bg-[#302F2F] hover:shadow-2xl">
      <h3 className="text-2xl font-semibold">{props.title}</h3>

      <div className="flex items-center justify-center w-full space-x-2 md:space-x-4">
        {props.stats.map((count, index) => (
          <div
            key={index}
            className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 text-sm font-bold text-white rounded-full ${colors[index]} text-xl`}
          >
            {count}
          </div>
        ))}
      </div>

      <Link
        href={props.link}
        className="flex items-center justify-center p-2 mt-4 space-x-2 text-base transition-colors rounded-md bg-[#383636] w-full hover:brightness-125"
      >
        <span>Ver estações</span>
        <PiArrowRightBold size={20} />
      </Link>
    </div>
  );
};


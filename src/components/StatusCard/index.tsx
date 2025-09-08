// components/StatusCard.tsx

import React from "react";
import Link from "next/link";

interface StatusCardProps {
  title: string;
  stats: [number, number, number, number];
  link: string;
}

const colors = ["bg-green-600", "bg-yellow-500", "bg-red-600", "bg-gray-400"];

const StatusCard: React.FC<StatusCardProps> = ({ title, stats, link }) => {
  return (
    <div className="flex flex-col items-center justify-between w-full p-4 space-y-4 text-white transition-shadow duration-300 rounded-lg shadow-xl md:p-6 bg-neutral-800 hover:shadow-2xl">
      <h3 className="text-xl font-semibold">{title}</h3>

      <div className="flex items-center justify-center w-full space-x-2 md:space-x-4">
        {stats.map((count, index) => (
          <div
            key={index}
            className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 text-sm font-bold text-white rounded-full ${colors[index]}`}
          >
            {count}
          </div>
        ))}
      </div>

      <Link
        href={link}
        className="flex items-center justify-center p-2 mt-4 space-x-2 text-sm text-gray-400 transition-colors duration-200 rounded-md hover:text-gray-200"
      >
        <span>Ver estações</span>
        <span className="text-lg">→</span>
      </Link>
    </div>
  );
};

export default StatusCard;

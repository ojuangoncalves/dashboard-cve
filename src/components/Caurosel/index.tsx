//

import TenantCard from "../TenantCard";

export default function Caurosel() {
  const cardData = [
    {
      title: "Balneário",
      stats: [3, 2, 1, 0] as [number, number, number, number],
      link: "/balneario-stations",
    },
    {
      title: "Continente",
      stats: [4, 2, 0, 0] as [number, number, number, number],
      link: "/continente-stations",
    },
    {
      title: "Neumarkt",
      stats: [6, 0, 0, 0] as [number, number, number, number],
      link: "/neumarkt-stations",
    },
    {
      title: "Balneário",
      stats: [3, 2, 1, 0] as [number, number, number, number],
      link: "/balneario-stations",
    },
    {
      title: "Continente",
      stats: [4, 2, 0, 0] as [number, number, number, number],
      link: "/continente-stations",
    },
    {
      title: "Neumarkt",
      stats: [6, 0, 0, 0] as [number, number, number, number],
      link: "/neumarkt-stations",
    },
  ];

  return (
      <div className="flex w-full flex-row justify-between gap-6 border border-red-600 overflow-hidden">
        {cardData.map((data, index) => (
          <TenantCard
            key={index}
            title={data.title}
            stats={data.stats}
            link={data.link}
          />
        ))}
      </div>
  );
};

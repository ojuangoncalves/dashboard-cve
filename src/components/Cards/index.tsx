// pages/index.tsx

import StatusCard from "../StatusCard";

const HomeCard = () => {
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
  ];

  return (
    <div className="flex items-center justify-center min-h-screen p-8 bg-neutral-900">
      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
        {cardData.map((data, index) => (
          <StatusCard
            key={index}
            title={data.title}
            stats={data.stats}
            link={data.link}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeCard;

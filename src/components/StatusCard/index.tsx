
interface StatusCardProps {
  title: string;
  value: number;
  color: string;
}

export default function StatusCard(props: StatusCardProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 ${props.color} w-32 h-24 md:w-44 xl:w-64 md:h-32 xl:h-40 rounded-lg px-6 py-4 shadow-md`}
    >
      <span className="text-white text-xl md:text-2xl xl:text-3xl">{props.title}</span>
      <span className="text-white text-4xl md:text-5xl xl:text-6xl font-bold">{props.value}</span>
    </div>
  );
}

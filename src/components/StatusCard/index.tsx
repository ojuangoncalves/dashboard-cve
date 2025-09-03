interface StatusCardProps {
  title: string;
  value: number;
  color: string;
}

export default function StatusCard(props: StatusCardProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 ${props.color} w-64 h-40 rounded-lg px-6 py-4 shadow-md`}
    >
      <span className="text-white text-3xl">{props.title}</span>
      <span className="text-white text-6xl font-bold">{props.value}</span>
    </div>
  );
}

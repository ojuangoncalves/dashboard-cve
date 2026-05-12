
interface StatusCardProps {
  title: string;
  value: number;
  color: string;
}

export default function StatusCard(props: StatusCardProps) {
  return (
    <div
      className={`flex flex-col items-center justify-start gap-32 ${props.color} w-2xl h-[500px] rounded-lg px-6 py-4 shadow-md`}
    >
      <span className="text-white text-5xl font-bold">{props.title}</span>
      <span className="text-white text-9xl font-bold">{props.value}</span>
    </div>
  );
}

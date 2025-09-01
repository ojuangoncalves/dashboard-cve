interface StatusCardProps {
  title: string;
  value: number | string;
  color?: string;
}

function StatusDashboard(props: StatusCardProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${props.color} w-60 h-40 rounded-lg px-6 py-4 shadow-md`}
    >
      <span className="text-white text-3xl font-medium">{props.title}</span>
      <span className="text-white text-5xl font-bold">{props.value}</span>
    </div>
  );
}

export default StatusDashboard;

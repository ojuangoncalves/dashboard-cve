interface TitleProps {
  title: string;
}

export default function Header(props: TitleProps) {
  return (
    <header className="w-full h-12 flex justify-center items-center">
      <h1 className="text-center text-7xl font-bold">{props.title}</h1>
    </header>
  );
}

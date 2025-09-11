interface TitleProps {
  title: string;
}

export default function Header(props: TitleProps) {
  return (
    <header className="w-full h-12 flex justify-center items-center">
      <h1 className="text-center text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold">
        {props.title}
      </h1>
    </header>
  );
}

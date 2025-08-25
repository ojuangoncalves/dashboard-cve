interface TitleProps {
    title: string
}

export default function Title(props: TitleProps) {
    return(
        <header className='w-full h-12 flex justify-center items-center'>
			<h1 className='text-center text-3xl md:text-5xl font-bold'>{ props.title }</h1>
		</header>
    )
}
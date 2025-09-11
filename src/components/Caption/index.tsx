// Compenente de legendas dos status das estações

export default function Caption() {
    return (
        <div className='text-sm md:text-lg lg:text-xl xl:text-3xl w-full xl:flex xl:flex-row justify-center xl:gap-20 grid md:grid-cols-2 place-items-center place-content-center gap-5 lg:gap-10'>
            <span className="flex justify-center items-center"><img className='w-4 md:w-5 lg:w-6 mr-2 md:mr-6' src={'/quadradverde6x6.png'} alt="" />Disponível</span>
            <span className="flex justify-center items-center"><img className='w-4 md:w-5 lg:w-6 mr-2 md:mr-6' src={'/quadradamarelo6x6.png'} alt="" />Ocupada</span>
            <span className="flex justify-center items-center"><img className='w-4 md:w-5 lg:w-6 mr-2 md:mr-6' src={'/quadradvermelho6x6.png'} alt="" />Offline</span>
            <span className="flex justify-center items-center"><img className='w-4 md:w-5 lg:w-6 mr-2 md:mr-6' src={'/quadradcinza.png'} alt="" />Manutenção</span>
        </div>
    )
}

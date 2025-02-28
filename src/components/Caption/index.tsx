// Compenente de legendas dos status das estações

export default function Caption() {
    return (
        <div className='text-sm md:text-base lg:text-xl w-full flex flex-row justify-center gap-20'>
            <span className="flex justify-center items-center"><img className='w-5 md:w-6 mr-2 md:mr-6' src={'/quadradverde6x6.png'} alt="" />Disponível</span>
            <span className="flex justify-center items-center"><img className='w-5 md:w-6 mr-2 md:mr-6' src={'/quadradamarelo6x6.png'} alt="" />Ocupada</span>
            <span className="flex justify-center items-center"><img className='w-5 md:w-6 mr-2 md:mr-6' src={'/quadradvermelho6x6.png'} alt="" />Offline</span>
            <span className="flex justify-center items-center"><img className='w-5 md:w-6 mr-2 md:mr-6' src={'/quadradcinza.png'} alt="" />Manutenção</span>
        </div>
    )
}

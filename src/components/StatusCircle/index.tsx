interface StatusCircleProps {
    bgColor: string
    numChargepoints: number
}

export default function StatusCircle(props: StatusCircleProps) {
    return (
        <div
            className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 text-sm font-bold text-white rounded-full bg-[${props.bgColor}]`}
          >
            {props.numChargepoints}
        </div>
    )
}
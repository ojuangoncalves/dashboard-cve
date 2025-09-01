interface StatusCircleProps {
    bgColor: string
    numChargepoints: number
}

export default function StatusCircle(props: StatusCircleProps) {
    return (
        <div
            className={`flex items-center justify-center w-10 h-10 text-lg font-bold text-white rounded-full bg-[${props.bgColor}]`}
          >
            {props.numChargepoints}
        </div>
    )
}
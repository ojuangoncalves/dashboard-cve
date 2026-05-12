
// import axios from 'axios'
import { useRef} from 'react'
import { fetcherVerifyDesconnetions, getNotificationsData } from '@/utils/util'
import { PiArrowRightBold, PiWarningFill } from 'react-icons/pi'
import useSWR from 'swr'
import LoadingIndicator from '../LoadingIndicator'

interface NotificationsProps {
    headers?: CustomRequestHeaders
    chargePoints?: ChargePoint[]
}

export default function Notifications(props: NotificationsProps) {

    const chargePointsId = props.chargePoints?.map(chargepoint => chargepoint.chargeBoxId)
    const ids = useRef(chargePointsId).current

    const { data: notifications, error: errorGetNotifications, isLoading: isLoadingGetNotifications } = useSWR([ids], ([ids]) => getNotificationsData(ids), {
        refreshInterval: 60000,
        revalidateOnFocus: true
    })

    const { data: latestDisconnections, error: errorLatestDisconnections, isLoading: isLoadingLatestDisconnections } = useSWR(notifications?.length ? ['validar', notifications, props.chargePoints] : null, fetcherVerifyDesconnetions)
    
    if(isLoadingGetNotifications) return <LoadingIndicator />
    if(errorGetNotifications) return <p>Erro ao carregar</p>

    return (
        <div>
            <h2 className='text-start text-3xl font-bold'>Últimas desconexões:</h2>
            <div
                className='h-[600px] w-5xl mt-5 custom-scrollbar rounded-xl shadow-xl px-5
                            bg-linear-180 from-card-bg-1 from-0% to-card-bg-2 to-100% bg-card-bg-3 border border-solid border-card-border'
            >
                { isLoadingLatestDisconnections ? (
                    <p>Verificando status...</p>
                ) : (
                    <ul className='h-full flex flex-col items-center justify-around'>
                        { latestDisconnections?.map((notification : ChargeBoxNotification) => (
                            <li
                                key={notification.notificationPk}
                                className='w-full flex flex-row justify-between items-center gap-4 h-20 rounded-lg text-2xl px-8
                                            bg-linear-80 from-card-bg1 from-0% to-card-bg-2 to-100% bg-card-bg-3 border border-solid border-card-border brightness-150'
                            >
                                <span><PiWarningFill size={40}color='red' /></span>
                                <span>{ notification.chargeBoxName }</span>
                                <span><PiArrowRightBold size={50} /></span>
                                <span className='text-red-500' >{ notification.notificationTimestampDT }</span>
                            </li>
                        ))
                        }

                        { latestDisconnections?.length === 0 && (
                            <p className='mt-4 text-gray-500 text-5xl font-bold'>Nenhuma desconexão ativa no momento.</p>
                        ) }
                    </ul>
                ) }
            </div>
        </div>
    )
}

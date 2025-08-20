// import axios from 'axios'
import { useEffect, useRef, useState} from 'react'
import { getNotificationsData } from '@/utils/util'
import { PiWifiHighFill, PiWifiSlashDuotone, PiArrowRightBold } from 'react-icons/pi'

interface NotificationsProps {
    headers: customRequestHeaders
    chargePoints: ChargePoint[]
}

// async function handleNotifications(notifications: chargeBoxNotification[]) {
//     await axios.post('/api/notifications', { notifications })
//     .then(response => {
//         console.log(response)
//     })
//     .catch(error => {
//         console.error(error)
//     })
// }


export default function Notifications(props: NotificationsProps) {
    const [notifications, setNotifications] = useState<chargeBoxNotification[]>([])

    // useEffect(() => {
    //     handleNotifications(notifications)
    // }, [notifications])

    const chargePointsId = props.chargePoints.map(chargepoint => chargepoint.chargeBoxId)
    const idsRef = useRef(chargePointsId)

    useEffect(() => { idsRef.current = chargePointsId }, [chargePointsId])
    
    useEffect(() => {
        const tick = () => {
            const ids = idsRef.current
            if(!ids?.length) return
            getNotificationsData(props.headers, setNotifications, ids)
        }

        tick()
        
        const interval = setInterval(tick, 60000)

        return () => clearInterval(interval)

    }, [])
    

    return (
        <div className='h-[500px] overflow-y-scroll lg:mt-12 xl:mt-4 custom-scrollbar rounded-xl bg-neutral-700 shadow-xl p-5'>
            <h2 className='text-3xl font-bold'>Notificações</h2>
            <ul>
                { notifications.map((notification: chargeBoxNotification) => {
                    switch(notification.type) {
                        case "Connected":
                            return (
                                <li
                                    key={notification.notificationPk}
                                    className='bg-neutral-500 flex flex-row justify-center items-center gap-4 my-8 h-32 rounded-lg text-sm px-8'
                                >
                                    <PiWifiHighFill size={30} />
                                    { notification.notificationTimestampDT }
                                    <PiArrowRightBold size={40} />
                                    { notification.chargeBoxName }: Conectada
                                </li>
                            )
                        case "Disconnected":
                            return (
                                <li
                                    key={notification.notificationPk}
                                    className='bg-neutral-500 flex flex-row justify-center items-center gap-4 my-8 h-32 rounded-lg text-sm px-8'
                                >
                                    <PiWifiSlashDuotone size={30} fill='#ed1c00' />
                                    { notification.notificationTimestampDT }
                                    <PiArrowRightBold size={40} />
                                    { notification.chargeBoxName }: Desconectada
                                </li>
                            )
                        // default:
                        //     return(
                        //         <li
                        //             key={notification.notificationPk}
                        //             className='bg-neutral-500 flex flex-row justify-center items-center gap-4 my-8 h-32 rounded-lg text-sm px-8'
                        //         >
                        //             { notification.notificationTimestampDT }
                        //             <PiArrowRightBold size={40} />
                        //             { notification.chargeBoxName }: { notification.type }
                        //         </li>
                        //     )
                    }
                    }) }
            </ul>
        </div>
    )
}

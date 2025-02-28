import { useEffect, useState} from 'react'
import { getNotificationsData } from '@/utils/util'
import { PiWifiHighFill, PiWifiSlashDuotone, PiArrowRightBold } from 'react-icons/pi'

interface NotificationsProps {
    headers: customRequestHeaders
}

export default function Notifications(props: NotificationsProps) {
    const [notifications, setNotifications] = useState<chargeBoxNotification[]>([])

    useEffect(() => {
        getNotificationsData(props.headers, setNotifications)

        const interval = setInterval(() => {
            getNotificationsData(props.headers, setNotifications)
        }, 60000)

        return () => {
            clearInterval(interval)
        }

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
                    }
                    }) }
            </ul>
        </div>
    )
}

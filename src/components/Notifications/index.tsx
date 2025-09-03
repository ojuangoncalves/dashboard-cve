// import axios from 'axios'
import { useRef } from "react";
import { getNotificationsData } from "@/utils/util";
import {
  PiWifiHighFill,
  PiWifiSlashDuotone,
  PiArrowRightBold,
} from "react-icons/pi";
import useSWR from "swr";
import LoadingIndicator from "../LoadingIndicator";

interface NotificationsProps {
  headers: CustomRequestHeaders;
  chargePoints?: ChargePoint[];
}

export default function Notifications(props: NotificationsProps) {
  const chargePointsId = props.chargePoints?.map(
    (chargepoint) => chargepoint.chargeBoxId
  );
  const ids = useRef(chargePointsId).current;

  const {
    data: notifications,
    error,
    isLoading,
  } = useSWR([ids], ([ids]) => getNotificationsData(ids), {
    refreshInterval: 60000,
    revalidateOnFocus: true,
  });

  if (isLoading) return <LoadingIndicator />;
  if (error) return <p>Erro ao carregar</p>;

  return (
    <div className="h-[700px] overflow-y-scroll lg:mt-12 xl:mt-4 custom-scrollbar rounded-xl bg-neutral-700 shadow-xl p-5">
      <h2 className="text-3xl lg:text-4xl font-bold">Notificações</h2>
      <ul>
        {notifications?.map((notification: ChargeBoxNotification) => {
          switch (notification.type) {
            case "Connected":
              return (
                <li
                  key={notification.notificationPk}
                  className="bg-neutral-500 flex flex-row justify-center items-center gap-4 my-8 h-32 rounded-lg text-sm lg:text-lg px-8"
                >
                  <PiWifiHighFill size={50} />
                  {notification.notificationTimestampDT}
                  <PiArrowRightBold size={50} />
                  {notification.chargeBoxName}: Conectada
                </li>
              );
            case "Disconnected":
              return (
                <li
                  key={notification.notificationPk}
                  className="bg-neutral-500 flex flex-row justify-center items-center gap-4 my-8 h-32 rounded-lg text-sm lg:text-lg px-8"
                >
                  <PiWifiSlashDuotone size={50} fill="#ed1c00" />
                  {notification.notificationTimestampDT}
                  <PiArrowRightBold size={50} />
                  {notification.chargeBoxName}: Desconectada
                </li>
              );
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
        })}
      </ul>
    </div>
  );
}

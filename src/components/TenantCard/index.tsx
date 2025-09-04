import React from "react";
import Link from "next/link";
import { PiArrowRightBold } from "react-icons/pi";
import StatusCircle from "../StatusCircle";

interface StatusCardProps {
  title: string;
  link: string;
  chargepoints: ChargePoint[];
}

export default function TenantCard(props: StatusCardProps) {
  let availableChargepoints: number = 0;
  let inuseChargepoints: number = 0;
  let offlineChargepoints: number = 0;
  let maintenanceChargepoints: number = 0;

  props.chargepoints.forEach((chargepoint) => {
    chargepoint.connectors.forEach((connector) => {
      switch (connector.lastStatus.status) {
        case "Available":
        case "SuspendedEV":
          availableChargepoints += 1;
          break;
        case "Unavailable":
        case "Faulted":
          offlineChargepoints += 1;
          break;
        case "Charging":
        case "Finishing":
        case "Preparing":
        case "SuspendedEVSE":
          inuseChargepoints += 1;
          break;
        case "Maintenance":
          maintenanceChargepoints += 1;
      }
    });
  });

  return (
    <div className={`flex flex-col items-center justify-between w-96 h-58 p-4 space-y-4 text-white transition-all duration-500 rounded-lg -z-1 hover:scale-105 hover:shadow-4xl hover:shadow-card-shadow relative
          ${offlineChargepoints > 0? "before:w-6 before:h-6 before:bg-dashred before:absolute before:-right-2 before:-top-2 before:rounded-full" : ""}
          bg-linear-180 from-card-bg-1 from-0% to-card-bg-2 to-100% bg-card-bg-3 border border-solid border-card-border shadow-card-shadow shadow-2xl`}>
      <h3 className="text-4xl font-semibold">{props.title}</h3>

      <div className="flex items-center justify-center w-full space-x-4">
        <StatusCircle
          bgColor="dashgreen"
          numChargepoints={availableChargepoints}
        />
        <StatusCircle bgColor="dashred" numChargepoints={offlineChargepoints} />
        <StatusCircle
          bgColor="dashyellow"
          numChargepoints={inuseChargepoints}
        />
        <StatusCircle
          bgColor="dashgray"
          numChargepoints={maintenanceChargepoints}
        />
      </div>

      <Link
        href={props.link}
        className="flex items-center justify-center p-2 mt-4 space-x-2 text-xl transition-colors rounded-md w-full brightness-125 hover:brightness-150
                    bg-linear-180 from-card-bg-1 from-0% to-card-bg-2 to-100% bg-card-bg-3 border border-solid border-card-border"
      >
        <span>Ver estações</span>
        <PiArrowRightBold size={20} />
      </Link>
    </div>
  );
}

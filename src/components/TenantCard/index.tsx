import React from "react";
import Link from "next/link";
import { PiArrowRightBold } from "react-icons/pi";
import StatusCircle from "../StatusCircle";

interface StatusCardProps {
  title: string;
  link: string;
  chargepoints: ChargePoint[]
}

export default function TenantCard(props: StatusCardProps) {

  let availableChargepoints: number = 0
  let inuseChargepoints: number = 0
  let offlineChargepoints: number = 0
  let maintenanceChargepoints: number = 0

  props.chargepoints.forEach(chargepoint => {
    chargepoint.connectors.forEach(connector => {
      switch(connector.lastStatus.status) {
      case "Available":
			case "SuspendedEV":
				availableChargepoints += 1
        break
			case "Unavailable":
			case "Faulted":
				offlineChargepoints += 1
        break
			case "Charging":
			case "Finishing":
			case "Preparing":
			case "SuspendedEVSE":
				inuseChargepoints += 1
        break
			case "Maintenance":
				maintenanceChargepoints += 1
    }
    })
  })


  return (
    <div className="flex flex-col items-center justify-between w-full p-4 space-y-4 text-white transition-shadow duration-300 rounded-lg shadow-xl bg-[#302F2F] hover:shadow-2xl">
      <h3 className="text-2xl font-semibold">{props.title}</h3>

      <div className="flex items-center justify-center w-full space-x-2 md:space-x-4">
          <StatusCircle bgColor="#2e8024" numChargepoints={availableChargepoints} />
          <StatusCircle bgColor="#ed1c00" numChargepoints={offlineChargepoints} />
          <StatusCircle bgColor="#e4c306" numChargepoints={inuseChargepoints} />
          <StatusCircle bgColor="#525252" numChargepoints={maintenanceChargepoints} />
      </div>

      <Link
        href={props.link}
        className="flex items-center justify-center p-2 mt-4 space-x-2 text-base transition-colors rounded-md bg-[#383636] w-full hover:brightness-125"
      >
        <span>Ver estações</span>
        <PiArrowRightBold size={20} />
      </Link>
    </div>
  );
};


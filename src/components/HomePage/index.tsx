"use client";
import useSWR from "swr";

import { createTenants, baseUrl } from "@/utils/util";
import LoadingIndicator from "../LoadingIndicator";
import Header from "../Header";
import StatusCard from "../StatusCard";
import Caurosel from "../Caurosel";

interface HomePageProps {
  headers: CustomRequestHeaders;
}

export default function HomePage(props: HomePageProps) {
  const {
    data: allTenants,
    error,
    isLoading,
  } = useSWR(`${baseUrl}/api/v1/chargepoints`, createTenants, {
    refreshInterval: 60000,
    revalidateOnFocus: true,
  });

  let allAvailableChargepoints: number = 0
  let allInuseChargepoints: number = 0
  let allOfflineChargepoints: number = 0
  let allMaintenanceChargepoints: number = 0

  allTenants?.forEach(tenant => {
    tenant.chargepoints.forEach(chargepoint => {
        chargepoint.connectors.forEach(connector => {
            switch(connector.lastStatus.status) {
            case "Available":
			case "SuspendedEV":
				allAvailableChargepoints += 1
                break
			case "Unavailable":
			case "Faulted":
				allOfflineChargepoints += 1
                break
			case "Charging":
			case "Finishing":
			case "Preparing":
			case "SuspendedEVSE":
				allInuseChargepoints += 1
                break
			case "Maintenance":
				allMaintenanceChargepoints += 1
            }
        })
    })
  })

  if (isLoading) return <LoadingIndicator />;
  if (error) return <p>Erro ao carregar</p>;

  return (
    <main className="flex flex-col justify-center gap-20">
      <header className="">
        <Header title="Monitoramento CVE" />
      </header>
      <div className="flex items-center justify-center gap-20 w-full my-20 text-white rounded-lg">
        <StatusCard title="Disponível" value={allAvailableChargepoints} color="bg-dashgreen" />
        <StatusCard title="Offline" value={allOfflineChargepoints} color="bg-dashred" />
        <StatusCard title="Ocupado" value={allInuseChargepoints} color="bg-dashyellow" />
        <StatusCard title="Manutenção" value={allMaintenanceChargepoints} color="bg-dashgray" />
      </div>
      <Caurosel allTenants={allTenants}/>
    </main>
  );
}
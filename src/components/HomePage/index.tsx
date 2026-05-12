"use client";
import useSWR from "swr";

import { createTenants, baseUrl } from "@/utils/util";
import LoadingIndicator from "../LoadingIndicator";
import Header from "../Header";
import StatusCard from "../StatusCard";
import Notifications from "../Notifications";

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

  let allOfflineChargepoints: number = 0
  let allChargepoints: ChargePoint[] = []

  allTenants?.forEach(tenant => {
    tenant.chargepoints.forEach(chargepoint => {
        allChargepoints.push(chargepoint)
        chargepoint.connectors.forEach(connector => {
            if(connector.lastStatus.status == "Unavailable" || connector.lastStatus.status == "Faulted") {
              allOfflineChargepoints += 1
            }
        })
    })
  })

  if (isLoading) return <LoadingIndicator />;
  if (error) return <p>Erro ao carregar</p>;

  return (
    <main className="flex flex-col justify-center gap-8 pt-20 px-10">

      <Header title="Monitoramento CVE" />

      <div className="flex flex-row justify-around items-center w-full my-10 text-white rounded-lg">
        <StatusCard title="Conectores offline" value={allOfflineChargepoints} color={allOfflineChargepoints > 0 ? "bg-dashred" : "bg-dashgreen"} />
        <Notifications chargePoints={allChargepoints}  />
      </div>
    </main>
  );
}
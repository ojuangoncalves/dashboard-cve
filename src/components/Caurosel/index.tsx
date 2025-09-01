// import { useState, useEffect } from "react";
"use client";
import useSWR from "swr";

import TenantCard from "../TenantCard";
import { createTenants, baseUrl } from "@/utils/util";
import LoadingIndicator from "../LoadingIndicator";

interface CauroselProps {
  headers: CustomRequestHeaders;
}

export default function Caurosel(props: CauroselProps) {
  const {
    data: allTenants,
    error,
    isLoading,
  } = useSWR(`${baseUrl}/api/v1/chargepoints`, createTenants, {
    refreshInterval: 60000,
    revalidateOnFocus: true,
  });

  if (isLoading) return <LoadingIndicator />;
  if (error) return <p>Erro ao carregar</p>;

  return (
    <div className="flex w-full flex-row justify-between gap-6 overflow-hidden">
      {allTenants?.map((tenant) => (
        <TenantCard
          key={tenant.tenantPk}
          title={tenant.name}
          link={`/${tenant.tenantPk}`}
          chargepoints={tenant.chargepoints}
        />
      ))}
    </div>
  );
}

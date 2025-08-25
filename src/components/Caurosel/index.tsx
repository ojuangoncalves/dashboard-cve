'use client'

import { useState, useEffect } from "react";

import TenantCard from "../TenantCard";
import { createTenants } from "@/utils/util"; 

interface CauroselProps {
	headers: CustomRequestHeaders
}

export default function Caurosel(props: CauroselProps) {
  const [allTenants, setAllTenants] = useState<Tenant[]>([])

  useEffect(() => {
    createTenants(props.headers, setAllTenants)
  }, [])

  return (
      <div className="flex w-full flex-row justify-between gap-6 overflow-hidden">
        {allTenants.map(tenant => (
          <TenantCard
            key={tenant.tenantPk}
            title={tenant.name}
            link={`/${tenant.tenantPk}`}
            chargepoints={tenant.chargepoints}
          />
        ))}
      </div>
  );
};

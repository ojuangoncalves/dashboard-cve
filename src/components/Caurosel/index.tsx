"use client";

import TenantCard from "../TenantCard";

interface CauroselProps {
  allTenants: Tenant[] | undefined
}

export default function Caurosel(props: CauroselProps) {

  return (
    <div className="flex w-full flex-row justify-between gap-6 overflow-hidden">
      {props.allTenants?.map((tenant) => (
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

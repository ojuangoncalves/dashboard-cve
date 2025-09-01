"use client";

import TenantCard from "../TenantCard";

interface CauroselProps {
  allTenants: Tenant[] | undefined
}

export default function Caurosel(props: CauroselProps) {

  return (
    <div className="flex flex-row gap-6">
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

"use client";

import Autoplay from "embla-carousel-autoplay";
import TenantCard from "../TenantCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CauroselProps {
  allTenants: Tenant[] | undefined;
}

export default function CauroselSection(props: CauroselProps) {
  return (
    <Carousel
      opts={{ loop: true, dragFree: true }}
      plugins={[Autoplay({ delay: 5000 })]}
    >
      <CarouselContent className="">
        {props.allTenants?.map((tenant) => (
          <CarouselItem key={tenant.tenantPk} className="-basis-1/4">
            <TenantCard
              key={tenant.tenantPk}
              title={tenant.name}
              link={`/${tenant.tenantPk}`}
              chargepoints={tenant.chargepoints}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="text-black bg-dashgray border-dashgray" />
      <CarouselNext className="text-black bg-dashgray border-dashgray" />
    </Carousel>
  );
}

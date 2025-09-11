"use client";

import AutoScroll from 'embla-carousel-auto-scroll'
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
      plugins={[AutoScroll({ startDelay: 3000, speed: 1.5, stopOnMouseEnter: true, stopOnInteraction: false })]}
      className="w-[97%] self-center"
    >
      <CarouselContent className="h-64 flex items-center" >
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
      <CarouselPrevious
        className="text-white h-32 mr-2 rounded-lg w-6 scale-200
                    bg-linear-180 from-card-bg-1 from-0% to-card-bg-2 to-100% bg-card-bg-3 border border-solid border-card-border
                    brightness-125"
      />
      <CarouselNext
        className="text-white h-32 ml-2 rounded-lg w-6 scale-200
                    bg-linear-180 from-card-bg-1 from-0% to-card-bg-2 to-100% bg-card-bg-3 border border-solid border-card-border
                    brightness-125"
        />
    </Carousel>
  );
}

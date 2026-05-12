"use client";


import useSWR from 'swr'
import { PiHouseFill, PiArrowLeftBold } from 'react-icons/pi'

import { getChargePointsData } from '@/utils/util'
import Caption from '@/components/Caption'
import Notifications from '@/components/Notifications'
import LoadingIndicator from '../LoadingIndicator'
import Header from '../Header'
import Link from 'next/link'

interface DashboardProps {
  headers: CustomRequestHeaders;
  tenantPk: string;
}

export default function Dashboard(props: DashboardProps) {
  
	const { data: chargePoints, error, isLoading } = useSWR([props.tenantPk], ([tenantPk]) => getChargePointsData(tenantPk), {
		refreshInterval: 60000,
		revalidateOnFocus: true
	})

	if (isLoading) return <LoadingIndicator />
	if (error) return <p>Erro ao carregar</p>

    return (
		<main className='flex flex-col justify-between gap-14 pt-20 px-10'>

			<Link
				href="/"
				className='absolute left-8 top-8 lg:left-14 lg:top-16 flex flex-row items-center gap-2 px-4 py-2 rounded-md transition duration-300
							hover:bg-linear-180 hover:from-card-bg-1 hover:from-0% hover:to-card-bg-2 hover:to-100% hover:bg-card-bg-3
							hover:border hover:border-solid hover:border-card-border hover:brightness-150'
			>
				<PiArrowLeftBold size={25} />
				<PiHouseFill size={30} className="" />
				<span className='hidden xl:inline' >Página Inicial</span>
			</Link>

			<Header title='Monitoramento CVE'/>

      	<section className="flex items-center justify-center  mt-8">
        {/* <Notifications headers={props.headers} chargePoints={chargePoints} /> */}
        <div className="flex flex-col justify-between gap-14 xl:col-span-2">
          <Caption />

					<div className='grid-cols-2 md:grid-cols-3 lg:grid-cols-2 grid xl:grid-cols-4 w-full m-auto place-items-center place-content-center content-center gap-y-10 gap-x-5'>
						{  
							chargePoints?.map(chargepoint => chargepoint.connectors.map(connector => {
									switch (connector.lastStatus.status) {
										case "Available":
										case "SuspendedEV":
											return (
												<div key={chargepoint.chargeBoxPk} className='bg-dashgreen py-4 w-28 h-36 md:w-40 md:h-48 lg:w-52 lg:h-60 flex flex-col justify-center items-center text-center rounded-xl'>
												<img src={`/cveverde.png`} alt="" />
												<p className="text-sm md:text-base lg:text-lg font-bold">{ chargepoint.description}</p>
											</div>
											)
										case "Unavailable":
										case "Faulted":
											return (
												<div key={chargepoint.chargeBoxPk} className='bg-dashred py-4 w-28 h-36 md:w-40 md:h-48 lg:w-52 lg:h-60 flex flex-col justify-center items-center text-center rounded-xl animate-pulse-alert'>
													<img src={`/cvevermelho.png`} alt="" />
													<p className="text-sm md:text-base lg:text-lg font-bold">{ chargepoint.description}</p>
												</div>
											)
										case "Charging":
										case "Finishing":
										case "Preparing":
										case "SuspendedEVSE":
											return (
												<div key={chargepoint.chargeBoxPk} className='bg-dashyellow py-4 w-28 h-36 md:w-40 md:h-48 lg:w-52 lg:h-60 flex flex-col justify-center items-center text-center rounded-xl'>
													<img src={`/cveamarelo.png`} alt="" />
													<p className="text-sm md:text-base lg:text-lg font-bold">{ chargepoint.description}</p>
												</div>
											)
										case "Maintenance":
											return (
												<div key={chargepoint.chargeBoxPk} className='bg-dashgray py-4 w-28 h-36 md:w-40 md:h-48 lg:w-52 lg:h-60 flex flex-col justify-center items-center text-center rounded-xl'>
													<img src={`/cvecinza.png`} alt="" />
													<p className="text-sm md:text-base lg:text-lg font-bold">{ chargepoint.description}</p>
												</div>
											)
										}
							}))
						}
					</div>
				</div>
			</section>
		</main>
    )
}

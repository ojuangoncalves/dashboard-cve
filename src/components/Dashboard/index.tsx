'use client'

import { useState, useEffect } from 'react'

import { getChargePointsData } from '@/utils/util'
import Caption from '@/components/Caption'
import Notifications from '@/components/Notifications'

interface DashboardProps {
	headers: CustomRequestHeaders
	tenantPk: string
}


export default function Dashboard(props: DashboardProps) {

	const [chargePoints, setChargePoints] = useState<ChargePoint[]>([])
	// ciclo de requisições na API
	useEffect(() => {
		getChargePointsData(props.headers, setChargePoints, props.tenantPk)

		const interval = setInterval(() => {
			getChargePointsData(props.headers, setChargePoints, props.tenantPk)
		}, 60000)

		return () => {
			clearInterval(interval)
		}
	}, [])

    return (
        <main className='flex flex-col justify-between gap-14'>
		<header className='w-full h-12 flex justify-center items-center'>
			<h1 className='text-center text-3xl md:text-5xl font-bold'>Monitoramento CVE</h1>
		</header>

		<section className='flex flex-col-reverse items-center gap-10 lg:grid xl:grid-cols-3 lg:grid-cols-2 lg:items-start'>
			
			<Notifications headers={props.headers} chargePoints={chargePoints} />

			<div className='flex flex-col justify-between gap-14 xl:col-span-2'>
				<Caption />


				<div className='grid-cols-2 md:grid-cols-3 lg:grid-cols-2 grid xl:grid-cols-3 w-full m-auto place-items-center gap-y-10 gap-x-5'>
					{  
						chargePoints.map(chargepoint => chargepoint.connectors.map(connector => {
								switch (connector.lastStatus.status) {
									case "Available":
									case "SuspendedEV":
										return (
											<div key={chargepoint.chargeBoxPk} className='bg-[#2e8024] w-28 h-28 md:w-40 md:h-40 flex flex-col justify-center items-center text-center rounded-xl'>
											<img src={`/cveverde.png`} alt="" />
											<p className="text-sm md:text-base">{ chargepoint.description}</p>
										</div>
										)
									case "Unavailable":
									case "Faulted":
										return (
											<div key={chargepoint.chargeBoxPk} className='bg-[#ed1c00] w-28 h-28 md:w-40 md:h-40 flex flex-col justify-center items-center text-center rounded-xl animate-pulse-alert'>
												<img src={`/cvevermelho.png`} alt="" />
												<p className="text-sm md:text-base">{ chargepoint.description}</p>
											</div>
										)
									case "Charging":
									case "Finishing":
									case "Preparing":
									case "SuspendedEVSE":
										return (
											<div key={chargepoint.chargeBoxPk} className='bg-[#e4c306] w-28 h-28 md:w-40 md:h-40 flex flex-col justify-center items-center text-center rounded-xl'>
												<img src={`/cveamarelo.png`} alt="" />
												<p className="">{ chargepoint.description}</p>
											</div>
										)
									case "Maintenance":
										return (
											<div key={chargepoint.chargeBoxPk} className='bg-[#525252] w-28 h-28 md:w-40 md:h-40 flex flex-col justify-center items-center text-center rounded-xl'>
												<img src={`/cvecinza.png`} alt="" />
												<p className="">{ chargepoint.description}</p>
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

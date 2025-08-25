import Caurosel from "@/components/Caurosel"
import Title from "@/components/Title"
import { getHeaders } from "@/utils/util"

export default async function Home() {

	const headers = await getHeaders()

	return(
		<main className='flex flex-col justify-between gap-14'>
			<Title title="Monitoramento CVE" />
			<Caurosel headers={headers}/>
		</main>
	)
}

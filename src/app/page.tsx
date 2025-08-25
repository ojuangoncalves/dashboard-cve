import Caurosel from "@/components/Caurosel"
import { getHeaders } from "@/utils/util"

export default async function Home() {

	const headers = await getHeaders()

	return(
		<Caurosel headers={headers}/>
	)
}

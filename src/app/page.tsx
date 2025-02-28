import Dashboard from "@/components/Dashboard"

import { getHeaders } from "@/utils/util"

export default async function Home() {

	const headers = await getHeaders()

	return(
		<Dashboard headers={headers} />
	)
}

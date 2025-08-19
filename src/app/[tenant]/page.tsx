import { notFound } from "next/navigation"

import Dashboard from "@/components/Dashboard"
import { getHeaders } from "@/utils/util"


// const validTenants = ["351", "352"]

export default async function Tenant(
    { params } :{
        params: {
            tenant: string
        }
    }
) {
    const { tenant } = await params
    const headers = await getHeaders()

    // if (!validTenants.includes(tenant)) {
    //     notFound()
    // }

    return(
        <Dashboard headers={headers} tenantPk={tenant} />
    )
}
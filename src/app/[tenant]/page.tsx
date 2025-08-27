import { notFound } from "next/navigation"

import Dashboard from "@/components/Dashboard"
import { getHeaders } from "@/utils/util"


const validTenants = ["351", "92", "111", "261", "301", "305"]

// @ts-ignore
export default async function Tenant(
    { params } :{
        params: Promise<{ tenant: string }>
    }
) {
    const { tenant } = await params
    const headers = await getHeaders()

    if (!validTenants.includes(tenant)) {
        notFound()
    }

    return(
        <Dashboard headers={headers} tenantPk={tenant} />
    )
}
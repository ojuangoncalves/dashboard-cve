import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

import { getAuthToken } from "./services/get-token";

const protectedRoutes = ['/']

// Responsável por identificar se o usuário está autenticado
export default async function middleware(req: NextRequest) {

    const userToken = await getAuthToken()
    const currentPath = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(currentPath)

    if (isProtectedRoute && !userToken) {
        return NextResponse.redirect(new URL ('/login', req.url))
    }

    return NextResponse.next()

}

export const config = {
    macther: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)"
    ]
}
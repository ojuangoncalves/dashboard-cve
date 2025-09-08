'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { loginUserService } from "../services/auth-service"

const config = {
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
}
export async function loginUserAction(prevState: any, formData: FormData) {
    const fields = {
        email: formData.get('email')?.toString(),
        password: formData.get('password')?.toString()
    }

    const responseData = await loginUserService(fields)

    const cookieStore = await cookies()
    cookieStore.set("token", responseData.token, config)

    redirect('/')

}
'use client'

import { useActionState } from "react"
import { loginUserAction } from "@/actions/auth"

export default function LoginForm() {

    const [state, action] = useActionState(loginUserAction, undefined)

    return(
        <main className="flex flex-col items-center gap-20 w-full h-screen justify-center">
            <h1 className="text-5xl font-bold text-center">Login</h1>

            <form className="bg-neutral-700 w-96 h-80 rounded-xl shadow-xl flex flex-col justify-between py-10 items-center" action={action}>
                <label className="w-4/5 flex flex-col justify-center gap-1" htmlFor="email">
                    <p className="text-left text-lg">Email</p>
                    <input className="text-black rounded-xl h-10 w-full px-4" type="text" id="email" name="email"/>
                </label>

                <label className="w-4/5 flex flex-col justify-center gap-1" htmlFor="password">
                    <p className="text-left text-lg">Senha</p>
                    <input className="text-black rounded-xl h-10 w-full px-4" type="password" id="password" name="password" />
                </label>

                <div>
                    <button className="w-52 bg-[#2e8024] h-10 rounded-xl shadow-lg hover:brightness-125">Fazer Login</button>
                </div>
            </form>
        </main>

    )
}
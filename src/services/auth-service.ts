import axios, { AxiosHeaders } from 'axios'
import { baseUrl, apiKey } from '@/utils/util'

interface LoginUserProps {
    email: string | undefined
    password: string | undefined
}

// Realiza a requisição de login do usuário
export async function loginUserService(userData: LoginUserProps) {
    const url = `${baseUrl}/api/v1/login`

    console.log(url)

    const loginHeaders = new AxiosHeaders(`
        Platform: API
        Api-Key: ${apiKey}
        Accept: */*
        Content-Type: application/json`)

    try {

        console.log("antes da requisição 2")
        const response = await axios.post(url, {
            email: userData.email,
            password: userData.password,
            recaptchaResponse: "string"
        }, { headers: loginHeaders })
        .then(resp => resp.data)

        console.log("depois da requisição 2")
        
        return response
    } catch (error) {

        console.log("deu error")
        if (axios.isAxiosError(error)) {
            console.log("erro do axios")
            const message = error.response?.data?.message || "Usuário ou senha incorretos"
            throw new Error(message)
        }
        console.log("não foi erro do axios")
        throw new Error("Erro inesperado, tente novamente")
    }
}
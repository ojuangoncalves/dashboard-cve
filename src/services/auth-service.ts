import axios, { AxiosHeaders } from 'axios'
import { baseUrl, apiKey } from '@/utils/util'

interface LoginUserProps {
    email: string | undefined
    password: string | undefined
}

export async function loginUserService(userData: LoginUserProps) {
    const url = `${baseUrl}/api/v1/login`

    const loginHeaders = new AxiosHeaders(`
        Platform: API
        Api-Key: ${apiKey}
        Accept: */*
        Content-Type: application/json`)

    try {
        const response = await axios.post(url, {
            email: userData.email,
            password: userData.password,
            recaptchaResponse: "string"
        }, { headers: loginHeaders })
        .then(resp => resp.data)
        
        return response
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || "Usuário ou senha incorretos"
            throw new Error(message)
        }
        
        throw new Error("Erro inesperado, tente novamente")
    }
}
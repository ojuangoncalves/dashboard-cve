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
        const response = await axios.post(url, {
            email: userData.email,
            password: userData.password,
            recaptchaResponse: "string"
        }, { headers: loginHeaders })
        .then(resp => resp.data)
        
        return response
    } catch (error) {
        console.error("Login service error: ", error)
        throw error
    }
}
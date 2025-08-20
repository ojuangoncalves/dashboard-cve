import axios from 'axios'

import { getAuthToken } from '@/services/get-token'
import { SetStateAction } from 'react'
// import { PrismaClient } from "../../prisma/generated/prisma";

// const globalForPrisma = global as unknown as { prisma: PrismaClient }
// export const prisma = globalForPrisma.prisma || new PrismaClient()

// if (process.env.NODE_ENV != 'production') {
//   globalForPrisma.prisma = prisma;
// }

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const apiKey = process.env.NEXT_PUBLIC_API_KEY

// export const smtpUser = process.env.SMTP_USER
// export const smtpPass = process.env.SMTP_PASSWORD
// export const smtpHost = process.env.SMTP_HOST
// export const smtpPort = process.env.SMTP_PORT

const getUserToken = async() => {
    let userToken: string | undefined

    await getAuthToken()
        .then((resolvedToken) => {
            userToken = resolvedToken
        })
        .catch(() => {
            userToken = ''
        })

    // console.log(baseUrl)
    // console.log(apiKey)

    return userToken
}

export const getHeaders = async ()=> {
    
    const token = await getUserToken()

    const header = {
        Platform: 'API',
        Authorization: token,
        Accept: '*/*'
    }
    
    return header
}

export const bsChargeBoxs: Record<string, string> = {
    bs01: 'JDBM1900047JI',
    bs02: 'JDBM1400041QQ',
    bs03: 'JDBM1400051N7',
    bs04: 'JDBM1900034XZ',
    bs05: 'JCBM1400043WL',
    bs06: 'JDBM1400068Q8'
}

export const testeChargeBoxs: Record<string, string> = {
    st01: 'MOVE_LAB_INTELBRAS01',
    st02: 'MOVE_LAB_INTELBRAS03'
}

// Responsável por ajustar a data da notificão para o horário correto
const adjustNotificationTime = (dateTimeString: string): string => {
    const [datePart, timePart] = dateTimeString.split(' ')
    const [year, month, day] = datePart.split('-').map(Number)
    const [hours, minutes, seconds] = timePart.split(':').map(Number)
    
    // Cria a data sem ajuste automático para UTC
    const date = new Date(year, month - 1, day, hours, minutes, seconds)
    date.setHours(date.getHours() - 3) // Subtrai 3 horas

    // Formatação manual para "YYYY-MM-DD HH:MM:SS"
    const adjustedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ` +
                         `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`
    
    return adjustedDate
}

// Pega a notificação das estações selecionadas
export async function getNotificationsData(headers: customRequestHeaders,
        setNotifications: React.Dispatch<SetStateAction<chargeBoxNotification[]>>,
        chargeBoxIds: string[]
) {
    try {
        await axios(`${baseUrl}/api/v1/notification/chargeBox`, {
            method: 'get',
            headers: {
                Platform: headers.Platform,
                Authorization: headers.Authorization,
                Accept: headers.Accept
            },
            params: {
                chargeBoxIds: chargeBoxIds,
                limit: 20
            }
        })
        .then(resp => resp.data)
        .then(resp => {
            // Ajusta o horário para cada notificação
            const adjustedNotifications = resp.notificationList.map((notification: chargeBoxNotification) => ({
                ...notification,
                notificationTimestampDT: adjustNotificationTime(notification.notificationTimestampDT)
            }))
            setNotifications(adjustedNotifications)
            // console.log(adjustedNotifications)
        })
    } catch(error) {
        console.error("Erro ao buscar dados: ", error)
        return
    }
}


// Pega os dados de todas as estações do Balneário Shopping
export async function getChargePointsData(headers: customRequestHeaders,
        setChargePoints: React.Dispatch<React.SetStateAction<ChargePoint[]>>,
        tenantPk: string
    ) {

    let allChargePoints: ChargePoint[] = []

    try {
        await axios(`${baseUrl}/api/v1/chargepoints`, {
            method: "get",
            headers: {
                Platform: headers.Platform,
                Authorization: headers.Authorization,
                Accept: headers.Accept
            },
            params: {
                tenantPk: tenantPk
            }
        })
        .then(resp => resp.data)
        .then(resp => {
            allChargePoints = resp.chargePointList
            // setChargePoints(resp.chargePointList)
        })
    } catch (error) {
        console.error("Erro ao buscar dados: ", error)
        return
    }

    // let chargePointsBS = allChargePoints.filter(chargePoint => chargePoint.tenantPk == 351)
    allChargePoints.sort((a, b) => a.description.localeCompare(b.description))


    setChargePoints(allChargePoints)
}

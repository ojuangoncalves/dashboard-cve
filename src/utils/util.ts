import axios from 'axios'

import { getAuthToken } from '@/services/get-token'
import { SetStateAction } from 'react'

export const baseUrl = 'https://cs.intelbras-cve-pro.com.br'

export const apiKey = '7c634059-245d-42e1-be90-7f1f56f863ff'

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

export async function getNotificationsData(headers: customRequestHeaders,
        setNotifications: React.Dispatch<SetStateAction<chargeBoxNotification[]>>
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
                chargeBoxIds: Object.values(bsChargeBoxs),
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
        })
    } catch(error) {
        console.error("Erro ao buscar dados: ", error)
        return
    }
}


// pega os dados na API
export async function getChargePointsData(headers: customRequestHeaders,
        setChargePoints: React.Dispatch<React.SetStateAction<ChargePoint[]>>
    ) {

    try {
        await axios(`${baseUrl}/api/v1/chargepoints`, {
            method: "get",
            headers: {
                Platform: headers.Platform,
                Authorization: headers.Authorization,
                Accept: headers.Accept
            }
        })
        .then(resp => resp.data)
        .then(resp => {
            setChargePoints(resp.chargePointList)
            // ChargePointsList = resp.chargePointList
        })
    } catch (error) {
        console.error("Erro ao buscar dados: ", error)
        return
    }
}

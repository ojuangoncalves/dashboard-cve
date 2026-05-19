"use client"

import axios from "axios";
import { useEffect, useRef } from "react"

const FIVE_MINUTS_MS = 5 * 60 * 1000

function isDownsForMoeThanFiveMinutes(timestampDT: string): boolean {
    const downAt = new Date(timestampDT.replace(" ", "T"))
    const now = new Date()
    return now.getTime() - downAt.getTime() > FIVE_MINUTS_MS
}

async function postToNotifyRoute(notifications: ChargeBoxNotification[]) {
    await axios("/api/notify", {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({notifications})
    })
}

export function useNotify({ notifications }: {notifications: ChargeBoxNotification[] | undefined}) {
    const initialized = useRef(false)

    useEffect(() => {
        if (!notifications) return

        const eligibleNotifications = notifications.filter(n => isDownsForMoeThanFiveMinutes(n.notificationTimestampDT))

        if (eligibleNotifications.length === 0) return

        if (!initialized.current) {
            initialized.current = true
            return
        }

        postToNotifyRoute(eligibleNotifications)
    }, [notifications])
}
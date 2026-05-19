import { createTransport } from "nodemailer";
 
if (
  !process.env.SMTP_HOST ||
  !process.env.SMTP_PORT ||
  !process.env.SMTP_USER ||
  !process.env.SMTP_PASS ||
  !process.env.SMTP_FROM ||
  !process.env.SMTP_TO
) {
  throw new Error("SMTP environment variables are not fully configured");
}

const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

export interface DownAsset {
    chargeBoxName: string,
    notificationPk: string,
    downAt: string
}

function buildEmailHtml(assets: DownAsset[]): string {
  const rows = assets
    .map(
      (a) => `
      <tr>
        <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb;">${a.chargeBoxName}</td>
        <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; font-family: monospace;">${a.notificationPk}</td>
        <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb;">${a.downAt}</td>
      </tr>`
    )
    .join("");
 
  return `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; color: #111827;">
      <div style="background-color: #dc2626; padding: 24px 32px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; color: #fff; font-size: 20px;">
          ⚠️ Alerta de Estações Offline
        </h1>
        <p style="margin: 8px 0 0; color: #fecaca; font-size: 14px;">
          ${assets.length} ativo${assets.length > 1 ? "s" : ""} com queda detectada
        </p>
      </div>
 
      <div style="border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; overflow: hidden;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <thead>
            <tr style="background-color: #f9fafb;">
              <th style="padding: 12px 16px; text-align: left; font-weight: 600; color: #374151; border-bottom: 2px solid #e5e7eb;">
                Nome do Estação
              </th>
              <th style="padding: 12px 16px; text-align: left; font-weight: 600; color: #374151; border-bottom: 2px solid #e5e7eb;">
                Notification PK
              </th>
              <th style="padding: 12px 16px; text-align: left; font-weight: 600; color: #374151; border-bottom: 2px solid #e5e7eb;">
                Horário da Queda
              </th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
 
      <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">
        Este é um email automático gerado pelo sistema de monitoramento. Não responda a este email.
      </p>
    </div>
  `;
}

export async function sendDownAlert(assets: DownAsset[]): Promise<void> {
    const subject = 
        assets.length === 1
        ? `[Monitoramento] Estação offline: ${assets[0].chargeBoxName}`
        : `[Monitoramento] ${assets.length} estações offline detectadas`

    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.SMTP_TO,
        subject,
        html: buildEmailHtml(assets)
    })
}
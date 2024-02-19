import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes"

export interface Donation {
    id: number,
    amount: number
    payerName?: string
    payerCardId?: string
    payerCardType?: string
    message: string,
    created_at: number,
    json?: PaymentResponse
  }
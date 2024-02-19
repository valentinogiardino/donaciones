export interface Donation {
    id: number,
    amount: number
    payerFirstName?: string
    payerLastName?: string
    message: string,
    created_at: number,
    json?: PaymentResponse
  }
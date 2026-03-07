export interface Order {
  id: string
  customer: string
  amount: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  date: string
  createdAt?: string
  updatedAt?: string
}

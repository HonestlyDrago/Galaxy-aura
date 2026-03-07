export interface Product {
  id: string
  name: string
  description: string
  sku: string
  price: number
  cost: number
  stock: number
  category: string
  published: boolean
  createdAt?: string
  updatedAt?: string
}
